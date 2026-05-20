#!/usr/bin/env python3
"""
Circuit breaker for the AI governance workflow.

This is a small human-facing wrapper around `.ai/state/checkpoints.json` and
`tools/ai_executor.py`. It gives the project owner a clear switch:

- open   = CP-0 pending, execute is blocked
- close  = CP-0 approved, execute may run
- run    = execute only when required checkpoints are approved
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[1]
CHECKPOINTS_PATH = REPO_ROOT / ".ai" / "state" / "checkpoints.json"
EXECUTOR_PATH = REPO_ROOT / "tools" / "ai_executor.py"
DEFAULT_TASK = "P0-000"
DEFAULT_CHECKPOINT = "CP-0"


def read_json(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"tasks": {}}
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )


def task_entry(data: dict[str, Any], task_id: str) -> dict[str, Any]:
    tasks = data.setdefault("tasks", {})
    task = tasks.setdefault(task_id, {})
    task.setdefault("required_for_execute", [DEFAULT_CHECKPOINT])
    task.setdefault("checkpoints", {})
    return task


def checkpoint_entry(data: dict[str, Any], task_id: str, checkpoint_id: str) -> dict[str, Any]:
    task = task_entry(data, task_id)
    checkpoints = task.setdefault("checkpoints", {})
    cp = checkpoints.setdefault(
        checkpoint_id,
        {
            "status": "pending",
            "description": "Approve task execution",
        },
    )
    return cp


def required_checkpoints(data: dict[str, Any], task_id: str) -> list[str]:
    task = task_entry(data, task_id)
    required = task.get("required_for_execute", [DEFAULT_CHECKPOINT])
    if not isinstance(required, list):
        return [DEFAULT_CHECKPOINT]
    return [str(item) for item in required]


def set_checkpoint_status(
    data: dict[str, Any],
    task_id: str,
    checkpoint_id: str,
    status: str,
    actor: str,
    reason: str,
) -> None:
    cp = checkpoint_entry(data, task_id, checkpoint_id)
    cp["status"] = status
    cp["updated_at"] = dt.datetime.now().isoformat(timespec="seconds")
    cp["updated_by"] = actor
    cp["reason"] = reason


def is_closed(data: dict[str, Any], task_id: str) -> bool:
    for cp_id in required_checkpoints(data, task_id):
        cp = checkpoint_entry(data, task_id, cp_id)
        if str(cp.get("status", "missing")).lower() != "approved":
            return False
    return True


def print_status(data: dict[str, Any], task_id: str) -> int:
    print(f"TASK={task_id}")
    print(f"SWITCH={'CLOSED' if is_closed(data, task_id) else 'OPEN'}")
    print(f"CHECKPOINTS={CHECKPOINTS_PATH.relative_to(REPO_ROOT)}")
    for cp_id, cp in task_entry(data, task_id).get("checkpoints", {}).items():
        required = "required" if cp_id in required_checkpoints(data, task_id) else "optional"
        status = str(cp.get("status", "missing"))
        desc = str(cp.get("description", ""))
        print(f"- {cp_id}: {status} ({required}) - {desc}")
    return 0


def run_executor(task_id: str, mode: str) -> int:
    command = [
        sys.executable,
        str(EXECUTOR_PATH),
        "--task",
        task_id,
        "--mode",
        mode,
    ]
    proc = subprocess.run(command, cwd=str(REPO_ROOT), text=True)
    return int(proc.returncode)


def main() -> int:
    parser = argparse.ArgumentParser(description="AI workflow circuit breaker.")
    sub = parser.add_subparsers(dest="command", required=True)

    for name in ["status", "dry-run", "run"]:
        p = sub.add_parser(name)
        p.add_argument("--task", default=DEFAULT_TASK)

    close_p = sub.add_parser("close")
    close_p.add_argument("--task", default=DEFAULT_TASK)
    close_p.add_argument("--checkpoint", default=DEFAULT_CHECKPOINT)
    close_p.add_argument("--actor", default="human")
    close_p.add_argument(
        "--reason",
        default="Human approved task execution checkpoint.",
    )
    close_p.add_argument(
        "--run",
        action="store_true",
        help="Immediately run the executor after closing the switch.",
    )

    open_p = sub.add_parser("open")
    open_p.add_argument("--task", default=DEFAULT_TASK)
    open_p.add_argument("--checkpoint", default=DEFAULT_CHECKPOINT)
    open_p.add_argument("--actor", default="human")
    open_p.add_argument(
        "--reason",
        default="Human paused task execution checkpoint.",
    )

    args = parser.parse_args()
    data = read_json(CHECKPOINTS_PATH)

    if args.command == "status":
        return print_status(data, args.task)

    if args.command == "dry-run":
        return run_executor(args.task, "dry-run")

    if args.command == "close":
        set_checkpoint_status(
            data=data,
            task_id=args.task,
            checkpoint_id=args.checkpoint,
            status="approved",
            actor=args.actor,
            reason=args.reason,
        )
        write_json(CHECKPOINTS_PATH, data)
        print(f"SWITCH=CLOSED task={args.task} checkpoint={args.checkpoint}")
        print_status(data, args.task)
        if args.run:
            return run_executor(args.task, "execute")
        return 0

    if args.command == "open":
        set_checkpoint_status(
            data=data,
            task_id=args.task,
            checkpoint_id=args.checkpoint,
            status="pending",
            actor=args.actor,
            reason=args.reason,
        )
        write_json(CHECKPOINTS_PATH, data)
        print(f"SWITCH=OPEN task={args.task} checkpoint={args.checkpoint}")
        return print_status(data, args.task)

    if args.command == "run":
        if not is_closed(data, args.task):
            print("RUN_BLOCKED: switch is OPEN. Use `close` only after human approval.")
            print_status(data, args.task)
            return 2
        return run_executor(args.task, "execute")

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
