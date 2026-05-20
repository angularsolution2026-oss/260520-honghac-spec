#!/usr/bin/env python3
"""
Minimal AI task executor for the repository governance workflow.

Scope for GAP-7:
- read a task plan + lane plan
- enforce approval checkpoints before execute
- emit TASK_PACKET and file lock artifacts
- run Tier 1 gates with captured evidence when execution is approved

This is intentionally conservative. It coordinates and verifies; it does not
invent implementation steps or bypass human checkpoints.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_TASK = "P0-000"
DEFAULT_CHECKPOINTS = REPO_ROOT / ".ai" / "state" / "checkpoints.json"
DEFAULT_EVIDENCE_ROOT = REPO_ROOT / ".ai" / "evidence" / "executor"


@dataclass(frozen=True)
class Lane:
    lane_id: str
    title: str
    agents: str
    depends_on: str
    blocks: str
    allowed_files: list[str]
    forbidden_files: list[str]


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def timestamp() -> str:
    return dt.datetime.now().strftime("%Y%m%d-%H%M%S")


def load_checkpoints(path: Path) -> dict:
    if not path.exists():
        return {}
    return json.loads(read_text(path))


def approval_status(checkpoints: dict, task_id: str, cp_id: str) -> str:
    task = checkpoints.get("tasks", {}).get(task_id, {})
    cp = task.get("checkpoints", {}).get(cp_id, {})
    return str(cp.get("status", "missing")).lower()


def required_execute_checkpoints(checkpoints: dict, task_id: str) -> list[str]:
    task = checkpoints.get("tasks", {}).get(task_id, {})
    required = task.get("required_for_execute")
    if isinstance(required, list):
        return [str(x) for x in required]
    return ["CP-0"]


def ensure_execute_approved(checkpoints: dict, task_id: str) -> None:
    missing: list[str] = []
    for cp_id in required_execute_checkpoints(checkpoints, task_id):
        status = approval_status(checkpoints, task_id, cp_id)
        if status != "approved":
            missing.append(f"{cp_id}={status}")
    if missing:
        raise SystemExit(
            "EXECUTE_BLOCKED: required checkpoint(s) are not approved: "
            + ", ".join(missing)
            + f"\nUpdate {DEFAULT_CHECKPOINTS.relative_to(REPO_ROOT)} after human approval, then rerun."
        )


def markdown_table_rows(section: str) -> list[list[str]]:
    rows: list[list[str]] = []
    for line in section.splitlines():
        line = line.strip()
        if not line.startswith("|") or "---" in line:
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if cells:
            rows.append(cells)
    return rows


def field_value(section: str, field: str) -> str:
    for row in markdown_table_rows(section):
        if len(row) >= 2 and row[0].strip("* ") == field:
            return row[1]
    return ""


def extract_list_under_heading(section: str, heading: str) -> list[str]:
    marker = f"### {heading}"
    start = section.find(marker)
    if start < 0:
        return []
    sub = section[start + len(marker) :]
    next_heading = re.search(r"\n### ", sub)
    if next_heading:
        sub = sub[: next_heading.start()]
    paths: list[str] = []
    for row in markdown_table_rows(sub):
        if len(row) >= 1:
            value = row[0].strip("` ")
            if value and value.lower() not in {"path", "field"}:
                paths.append(value)
    return paths


def parse_lanes(lane_doc: str) -> list[Lane]:
    lanes: list[Lane] = []
    matches = list(re.finditer(r"^## Lane ([A-Z]) .*$", lane_doc, flags=re.MULTILINE))
    for i, match in enumerate(matches):
        start = match.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(lane_doc)
        section = lane_doc[start:end]
        lane_id = match.group(1)
        title = match.group(0).lstrip("# ").strip()
        lanes.append(
            Lane(
                lane_id=lane_id,
                title=title,
                agents=field_value(section, "Assigned agents"),
                depends_on=field_value(section, "Depends on"),
                blocks=field_value(section, "Blocks"),
                allowed_files=extract_list_under_heading(section, "Allowed files"),
                forbidden_files=extract_list_under_heading(section, "Forbidden files"),
            )
        )
    return lanes


def yaml_list(items: list[str], indent: int = 2) -> str:
    pad = " " * indent
    if not items:
        return f"{pad}- none\n"
    return "".join(f"{pad}- {item}\n" for item in items)


def write_task_packet(task_id: str, lane: Lane, out_dir: Path) -> Path:
    role = lane.agents or "Unassigned"
    packet = (
        f"task_id: {task_id}\n"
        f"lane_id: {lane.lane_id}\n"
        f"agent_role: {role}\n"
        "budget: medium\n"
        "objective: |\n"
        f"  Execute {lane.title} according to the approved task plan and handoff protocol.\n"
        "spec_refs:\n"
        "  - .ai/core/orchestration.md\n"
        "  - .ai/governance/AGENT_HANDOFF_PROTOCOL.md\n"
        "  - .ai/core/quality-gates.md\n"
        "allowed_files:\n"
        f"{yaml_list(lane.allowed_files)}"
        "forbidden_files:\n"
        f"{yaml_list(lane.forbidden_files)}"
        "forbidden_actions:\n"
        "  - edit files outside allowed_files\n"
        "  - edit .env.local\n"
        "  - edit docs/spec/* without a decision log entry\n"
        "dependencies:\n"
        f"  wait_for: {lane.depends_on or 'none'}\n"
        f"  blocks: {lane.blocks or 'none'}\n"
        "acceptance:\n"
        "  - return a complete HANDOFF_PACKET\n"
        "  - zero files outside allowed_files\n"
        "core_product_check:\n"
        "  - State impact on /sa-ban and map-centric flows.\n"
    )
    path = out_dir / f"{task_id}.lane-{lane.lane_id}.TASK_PACKET.yaml"
    path.write_text(packet, encoding="utf-8", newline="\n")
    return path


def write_file_locks(task_id: str, lanes: list[Lane], out_dir: Path) -> Path:
    lines = [
        f"# {task_id} File Lock List",
        "",
        "| File / glob | Locked by | Until |",
        "|---|---|---|",
    ]
    for lane in lanes:
        for path in lane.allowed_files:
            lines.append(f"| `{path}` | Lane {lane.lane_id} | merge wave for {task_id} |")
    lines.append("")
    path = out_dir / f"{task_id}.file-locks.md"
    path.write_text("\n".join(lines), encoding="utf-8", newline="\n")
    return path


def file_lock_conflicts(lanes: list[Lane]) -> list[dict]:
    owners: dict[str, list[str]] = {}
    for lane in lanes:
        for item in lane.allowed_files:
            owners.setdefault(item, []).append(lane.lane_id)
    return [
        {"file": item, "lanes": lane_ids}
        for item, lane_ids in sorted(owners.items())
        if len(lane_ids) > 1
    ]


def run_command(command: list[str], cwd: Path, log_path: Path) -> int:
    started = dt.datetime.now().isoformat(timespec="seconds")
    with log_path.open("w", encoding="utf-8", newline="\n") as f:
        f.write(f"$ {' '.join(command)}\n")
        f.write(f"cwd: {cwd}\nstarted: {started}\n\n")
        proc = subprocess.run(
            command,
            cwd=str(cwd),
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            shell=False,
        )
        f.write(proc.stdout or "")
        f.write(f"\nexit_code: {proc.returncode}\n")
    return int(proc.returncode)


def tier1_commands() -> list[tuple[str, list[str]]]:
    npm = "npm.cmd" if os.name == "nt" else "npm"
    return [
        ("typecheck", [npm, "run", "typecheck"]),
        ("lint", [npm, "run", "lint"]),
        ("build", [npm, "run", "build"]),
    ]


def run_tier1(evidence_dir: Path) -> list[dict]:
    if not (REPO_ROOT / "package.json").exists():
        return [
            {
                "gate": "tier1",
                "status": "skipped",
                "reason": "package.json does not exist yet; app scaffold has not been created.",
            }
        ]
    results: list[dict] = []
    for gate, command in tier1_commands():
        log_path = evidence_dir / f"tier1-{gate}.log"
        code = run_command(command, REPO_ROOT, log_path)
        results.append(
            {
                "gate": gate,
                "command": " ".join(command),
                "exit_code": code,
                "status": "pass" if code == 0 else "fail",
                "log": str(log_path.relative_to(REPO_ROOT)),
            }
        )
        if code != 0:
            break
    return results


def build_manifest(task_id: str, mode: str, checkpoints: dict, packet_paths: list[Path], lock_path: Path) -> dict:
    cps = {
        cp_id: approval_status(checkpoints, task_id, cp_id)
        for cp_id in required_execute_checkpoints(checkpoints, task_id)
    }
    return {
        "task_id": task_id,
        "mode": mode,
        "created_at": dt.datetime.now().isoformat(timespec="seconds"),
        "checkpoints": cps,
        "task_packets": [str(p.relative_to(REPO_ROOT)) for p in packet_paths],
        "file_locks": str(lock_path.relative_to(REPO_ROOT)),
    }


def main(argv: Optional[list[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Run the minimal AI governance executor.")
    parser.add_argument("--task", default=DEFAULT_TASK, help="Task ID, e.g. P0-000.")
    parser.add_argument("--mode", choices=["dry-run", "execute"], default="dry-run")
    parser.add_argument("--plan", default=None, help="Task plan path. Defaults to .ai/tasks/{task}.plan.md")
    parser.add_argument("--lanes", default=None, help="Lane plan path. Defaults to .ai/tasks/{task}.parallel-lanes.md")
    parser.add_argument("--checkpoints", default=str(DEFAULT_CHECKPOINTS), help="Checkpoint approval JSON path.")
    args = parser.parse_args(argv)

    task_id = args.task
    plan_path = Path(args.plan) if args.plan else REPO_ROOT / ".ai" / "tasks" / f"{task_id}.plan.md"
    lanes_path = Path(args.lanes) if args.lanes else REPO_ROOT / ".ai" / "tasks" / f"{task_id}.parallel-lanes.md"
    checkpoints_path = Path(args.checkpoints)

    if not plan_path.exists():
        raise SystemExit(f"Missing plan file: {plan_path}")
    if not lanes_path.exists():
        raise SystemExit(f"Missing lane file: {lanes_path}")

    checkpoints = load_checkpoints(checkpoints_path)
    if args.mode == "execute":
        ensure_execute_approved(checkpoints, task_id)

    run_dir = DEFAULT_EVIDENCE_ROOT / task_id / timestamp()
    packets_dir = run_dir / "task_packets"
    packets_dir.mkdir(parents=True, exist_ok=True)

    lanes = parse_lanes(read_text(lanes_path))
    packet_paths = [write_task_packet(task_id, lane, packets_dir) for lane in lanes]
    lock_path = write_file_locks(task_id, lanes, run_dir)

    manifest = build_manifest(task_id, args.mode, checkpoints, packet_paths, lock_path)
    manifest["plan"] = str(plan_path.relative_to(REPO_ROOT))
    manifest["lanes"] = str(lanes_path.relative_to(REPO_ROOT))
    manifest["lane_count"] = len(lanes)
    manifest["file_lock_conflicts"] = file_lock_conflicts(lanes)

    if args.mode == "execute":
        if manifest["file_lock_conflicts"]:
            conflict_text = ", ".join(
                f"{c['file']} -> {','.join(c['lanes'])}" for c in manifest["file_lock_conflicts"]
            )
            raise SystemExit(f"EXECUTE_BLOCKED: file lock conflict(s): {conflict_text}")
        manifest["tier1_results"] = run_tier1(run_dir)
        if any(r.get("status") == "fail" for r in manifest["tier1_results"]):
            manifest["overall"] = "fail"
        else:
            manifest["overall"] = "pass_or_skipped"
    else:
        manifest["overall"] = "dry_run_conflicts" if manifest["file_lock_conflicts"] else "dry_run_complete"

    manifest_path = run_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8", newline="\n")

    print(f"MODE={args.mode}")
    print(f"TASK={task_id}")
    print(f"EVIDENCE={run_dir.relative_to(REPO_ROOT)}")
    print(f"MANIFEST={manifest_path.relative_to(REPO_ROOT)}")
    print(f"OVERALL={manifest['overall']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
