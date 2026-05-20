# `ai_executor.py` (Governance Executor)

Minimal executor for GAP-7. It turns an approved task plan into coordination artifacts and, in execute mode, runs Tier 1 quality gates with captured evidence.

## Modes

Recommended human-facing switch:

```powershell
python tools\cau_dao.py status --task P0-000
python tools\cau_dao.py dry-run --task P0-000
python tools\cau_dao.py close --task P0-000 --checkpoint CP-0 --actor human --reason "Approve CP-0: execute P0-000 scaffold"
python tools\cau_dao.py run --task P0-000
python tools\cau_dao.py open --task P0-000 --checkpoint CP-0 --actor human --reason "Pause scaffold execution"
```

See `tools/CAU_DAO.md`.

Dry run is safe and does not require checkpoint approval:

```powershell
python tools\ai_executor.py --task P0-000 --mode dry-run
```

Execute mode is gated:

```powershell
python tools\ai_executor.py --task P0-000 --mode execute
```

`execute` reads `.ai/state/checkpoints.json`. If required checkpoints such as `CP-0` are not `approved`, it exits with `EXECUTE_BLOCKED` and does not run commands.

## Evidence

Each run writes:

- `.ai/evidence/executor/{TASK_ID}/{timestamp}/manifest.json`
- `task_packets/*.TASK_PACKET.yaml`
- `{TASK_ID}.file-locks.md`
- Tier 1 logs in execute mode: `tier1-typecheck.log`, `tier1-lint.log`, `tier1-build.log`

## Current scope

- Reads `.ai/tasks/{TASK_ID}.plan.md`
- Reads `.ai/tasks/{TASK_ID}.parallel-lanes.md`
- Emits TASK_PACKET and file lock artifacts from lane ownership tables
- Enforces checkpoint approvals before execution
- Runs Tier 1 only: `npm run typecheck`, `npm run lint`, `npm run build`

Runtime UI packs, browser evidence, auto-fix loops, and mark-complete mutations remain future extensions.
