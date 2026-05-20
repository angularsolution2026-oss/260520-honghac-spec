#!/usr/bin/env python3
"""
Human-friendly switchboard for the AI coding workflow.

This wraps tools/cau_dao.py and the .ai task registry so the project owner can:
- list tasks/phases
- check or flip a task switch
- generate a task-specific master prompt
- resume after an interrupted coding session
- create a runtime packet template
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


REPO_ROOT = Path(__file__).resolve().parents[1]
TASK_GRAPH = REPO_ROOT / ".ai" / "planning" / "TASK_GRAPH.md"
TASK_STATE = REPO_ROOT / ".ai" / "state" / "task-state.md"
CHECKPOINTS = REPO_ROOT / ".ai" / "state" / "checkpoints.json"
MASTER_PROMPT = REPO_ROOT / ".ai" / "prompts" / "MASTER_AI_CODING_PROMPT.md"
CAU_DAO = REPO_ROOT / "tools" / "cau_dao.py"
RUNTIME_ROOT = REPO_ROOT / ".ai" / "evidence" / "runtime"
EXECUTOR_ROOT = REPO_ROOT / ".ai" / "evidence" / "executor"


@dataclass(frozen=True)
class TaskRow:
    task_id: str
    title: str
    status: str
    depends: str
    agents: str
    section: str


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace") if path.exists() else ""


def read_json(path: Path) -> dict:
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8", errors="replace"))


def run_command(args: list[str]) -> int:
    proc = subprocess.run(args, cwd=str(REPO_ROOT), text=True)
    return int(proc.returncode)


def parse_task_graph() -> list[TaskRow]:
    rows: list[TaskRow] = []
    section = ""
    for raw in read_text(TASK_GRAPH).splitlines():
        line = raw.strip()
        if line.startswith("## "):
            section = line.lstrip("#").strip()
            continue
        if not line.startswith("|"):
            continue
        if "|---" in line or "| ID " in line:
            continue
        cells = [c.strip().strip("`") for c in line.strip("|").split("|")]
        if len(cells) < 4:
            continue
        task_id = cells[0]
        if not task_id.startswith(("P", "GOV-")):
            continue
        if task_id.startswith("GOV-"):
            if len(cells) >= 5:
                rows.append(TaskRow(task_id, cells[1], cells[3], cells[4], "", section))
            continue
        if len(cells) >= 5:
            rows.append(TaskRow(task_id, cells[1], cells[2], cells[3], cells[4], section))
    return rows


def task_paths(task_id: str) -> tuple[Path, Path]:
    return (
        REPO_ROOT / ".ai" / "tasks" / f"{task_id}.plan.md",
        REPO_ROOT / ".ai" / "tasks" / f"{task_id}.parallel-lanes.md",
    )


def default_checkpoint(task_id: str) -> str:
    data = read_json(CHECKPOINTS)
    task = data.get("tasks", {}).get(task_id, {})
    required = task.get("required_for_execute")
    if isinstance(required, list) and required:
        return str(required[0])
    return "CP-0" if task_id == "P0-000" else "CP-START"


def latest_manifest(task_id: str) -> Path | None:
    root = EXECUTOR_ROOT / task_id
    if not root.exists():
        return None
    manifests = sorted(root.glob("*/manifest.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    return manifests[0] if manifests else None


def latest_runtime_report(task_id: str) -> Path | None:
    root = RUNTIME_ROOT / task_id
    if not root.exists():
        return None
    reports = sorted(root.glob("**/RUNTIME_REPORT.yaml"), key=lambda p: p.stat().st_mtime, reverse=True)
    return reports[0] if reports else None


def format_exists(path: Path) -> str:
    return "OK" if path.exists() else "MISSING"


def command_list(args: argparse.Namespace) -> int:
    rows = parse_task_graph()
    if args.phase:
        needle = f"Phase {args.phase}"
        rows = [r for r in rows if needle in r.section]
    print("TASK_ID | STATUS | SECTION | TITLE | DEPENDS")
    for row in rows:
        print(f"{row.task_id} | {row.status} | {row.section} | {row.title} | {row.depends}")
    return 0


def command_overview(_: argparse.Namespace) -> int:
    print("AI_SWITCHBOARD_OVERVIEW")
    print(f"TASK_STATE={rel(TASK_STATE)}")
    print(f"TASK_GRAPH={rel(TASK_GRAPH)}")
    print(f"MASTER_PROMPT={rel(MASTER_PROMPT)}")
    print(f"CHECKPOINTS={rel(CHECKPOINTS)}")
    print("")
    sys.stdout.flush()
    return run_command([sys.executable, str(CAU_DAO), "status", "--task", "P0-000"])


def command_cau_dao_passthrough(args: argparse.Namespace, action: str) -> int:
    cmd = [sys.executable, str(CAU_DAO), action, "--task", args.task]
    return run_command(cmd)


def command_approve(args: argparse.Namespace) -> int:
    checkpoint = args.checkpoint or default_checkpoint(args.task)
    reason = args.reason or f"Approve {args.task} execution"
    cmd = [
        sys.executable,
        str(CAU_DAO),
        "close",
        "--task",
        args.task,
        "--checkpoint",
        checkpoint,
        "--actor",
        args.actor,
        "--reason",
        reason,
    ]
    if args.run:
        cmd.append("--run")
    return run_command(cmd)


def command_pause(args: argparse.Namespace) -> int:
    checkpoint = args.checkpoint or default_checkpoint(args.task)
    reason = args.reason or f"Pause {args.task} execution"
    return run_command(
        [
            sys.executable,
            str(CAU_DAO),
            "open",
            "--task",
            args.task,
            "--checkpoint",
            checkpoint,
            "--actor",
            args.actor,
            "--reason",
            reason,
        ]
    )


def task_prompt(task_id: str) -> str:
    text = read_text(MASTER_PROMPT)
    text = text.replace("<PASTE_TASK_ID_HERE>", task_id)
    text = text.replace("{TASK_ID}", task_id)
    return text


def command_prompt(args: argparse.Namespace) -> int:
    text = task_prompt(args.task)
    if args.out:
        out = Path(args.out)
        if not out.is_absolute():
            out = (REPO_ROOT / out).resolve()
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(text, encoding="utf-8", newline="\n")
        print(f"WROTE={rel(out)}")
    else:
        print(text)
    return 0


def command_resume(args: argparse.Namespace) -> int:
    plan, lanes = task_paths(args.task)
    manifest = latest_manifest(args.task)
    runtime = latest_runtime_report(args.task)
    print(f"RESUME_TASK={args.task}")
    print(f"TASK_STATE={rel(TASK_STATE)} ({format_exists(TASK_STATE)})")
    print(f"PLAN={rel(plan)} ({format_exists(plan)})")
    print(f"LANES={rel(lanes)} ({format_exists(lanes)})")
    print(f"CHECKPOINTS={rel(CHECKPOINTS)} ({format_exists(CHECKPOINTS)})")
    print(f"LATEST_EXECUTOR_MANIFEST={rel(manifest) if manifest else 'NONE'}")
    print(f"LATEST_RUNTIME_REPORT={rel(runtime) if runtime else 'NONE'}")
    print("")
    print("NEXT_COMMANDS")
    print(f"python tools\\ai_switchboard.py status --task {args.task}")
    print(f"python tools\\ai_switchboard.py prompt --task {args.task}")
    print(f"python tools\\ai_switchboard.py dry-run --task {args.task}")
    print("")
    print("RESUME_RULE")
    print("Continue only inside task plan/lane ownership. If UI changed, run LOCALHOST_RUNTIME_WORKFLOW.")
    return 0


def route_defaults(task_id: str) -> list[str]:
    if task_id == "P1-001":
        return ["/"]
    if task_id in {"P1-002", "P1-003", "P1-006"}:
        return ["/", "/sa-ban", "/kham-pha-do-thi", "/bang-gia", "/phap-ly"]
    if task_id.startswith("P4-"):
        return ["/sa-ban"]
    if task_id.startswith("P3-"):
        return ["/admin"]
    return ["/"]


def runtime_packet_text(task_id: str, base_url: str, routes: Iterable[str]) -> str:
    route_lines = "\n".join(f"  - {r}" for r in routes)
    return f"""task_id: {task_id}
base_url: {base_url}
dev_command: npm run dev
routes:
{route_lines}
phases: [1,2,3,4,5,6]
viewports: [V-M, V-T, V-D]
max_retries: 2
auto_fix_allowed: true
forbidden_routes: []
workflow_ref: .ai/runtime/LOCALHOST_RUNTIME_WORKFLOW.md
"""


def command_runtime_packet(args: argparse.Namespace) -> int:
    routes = [r.strip() for r in args.routes.split(",") if r.strip()] if args.routes else route_defaults(args.task)
    text = runtime_packet_text(args.task, args.base_url, routes)
    if args.write:
        out_dir = RUNTIME_ROOT / args.task
        out_dir.mkdir(parents=True, exist_ok=True)
        out = out_dir / "RUNTIME_PACKET.yaml"
        out.write_text(text, encoding="utf-8", newline="\n")
        print(f"WROTE={rel(out)}")
    else:
        print(text)
    return 0


def command_doctor(args: argparse.Namespace) -> int:
    checks = [
        ("status", [sys.executable, str(CAU_DAO), "status", "--task", args.task]),
        ("dry-run", [sys.executable, str(CAU_DAO), "dry-run", "--task", args.task]),
        ("refresh-index", [sys.executable, str(REPO_ROOT / "tools" / "index_repo.py")]),
        ("refresh-corpus", [sys.executable, str(REPO_ROOT / "tools" / "build_corpus.py")]),
        ("index-stale", [sys.executable, str(REPO_ROOT / "tools" / "index_repo.py"), "--check-stale"]),
        ("corpus-stale", [sys.executable, str(REPO_ROOT / "tools" / "build_corpus.py"), "--check-stale"]),
    ]
    overall = 0
    for name, cmd in checks:
        print(f"== {name} ==")
        sys.stdout.flush()
        code = run_command(cmd)
        if code != 0:
            overall = code
    return overall


def main(argv: list[str] | None = None) -> int:
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except AttributeError:
        pass

    parser = argparse.ArgumentParser(description="One-stop AI task switchboard.")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("overview", help="Show key governance entrypoints and P0 switch status.")

    list_p = sub.add_parser("list", help="List tasks from TASK_GRAPH.")
    list_p.add_argument("--phase", help="Filter by phase number, e.g. 1")

    for name in ["status", "dry-run", "run"]:
        p = sub.add_parser(name)
        p.add_argument("--task", default="P0-000")

    approve_p = sub.add_parser("approve", help="Approve a task checkpoint. Use with care.")
    approve_p.add_argument("--task", default="P0-000")
    approve_p.add_argument("--checkpoint", default=None)
    approve_p.add_argument("--actor", default="human")
    approve_p.add_argument("--reason", default=None)
    approve_p.add_argument("--run", action="store_true")

    pause_p = sub.add_parser("pause", help="Open/pause a task checkpoint.")
    pause_p.add_argument("--task", default="P0-000")
    pause_p.add_argument("--checkpoint", default=None)
    pause_p.add_argument("--actor", default="human")
    pause_p.add_argument("--reason", default=None)

    prompt_p = sub.add_parser("prompt", help="Print or write the task-specific master prompt.")
    prompt_p.add_argument("--task", default="P0-000")
    prompt_p.add_argument("--out", default=None)

    resume_p = sub.add_parser("resume", help="Show resume packet for a task.")
    resume_p.add_argument("--task", default="P0-000")

    runtime_p = sub.add_parser("runtime-packet", help="Print or write a RUNTIME_PACKET template.")
    runtime_p.add_argument("--task", default="P0-000")
    runtime_p.add_argument("--base-url", default="http://localhost:3000")
    runtime_p.add_argument("--routes", default=None, help="Comma-separated routes. Defaults by task.")
    runtime_p.add_argument("--write", action="store_true")

    doctor_p = sub.add_parser("doctor", help="Run safe switchboard health checks.")
    doctor_p.add_argument("--task", default="P0-000")

    args = parser.parse_args(argv)

    if args.command == "overview":
        return command_overview(args)
    if args.command == "list":
        return command_list(args)
    if args.command in {"status", "dry-run", "run"}:
        return command_cau_dao_passthrough(args, args.command)
    if args.command == "approve":
        return command_approve(args)
    if args.command == "pause":
        return command_pause(args)
    if args.command == "prompt":
        return command_prompt(args)
    if args.command == "resume":
        return command_resume(args)
    if args.command == "runtime-packet":
        return command_runtime_packet(args)
    if args.command == "doctor":
        return command_doctor(args)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
