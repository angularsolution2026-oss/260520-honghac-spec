# AI Switchboard Tool

`tools/ai_switchboard.py` is the one-stop human control tool for AI Coding tasks.

It wraps `tools/cau_dao.py` and reads `.ai/planning/TASK_GRAPH.md`, `.ai/tasks/*`, `.ai/state/*`, and `.ai/prompts/MASTER_AI_CODING_PROMPT.md`.

## Common Commands

```powershell
python tools\ai_switchboard.py overview
python tools\ai_switchboard.py list
python tools\ai_switchboard.py list --phase 1
python tools\ai_switchboard.py status --task P0-000
python tools\ai_switchboard.py dry-run --task P0-000
python tools\ai_switchboard.py resume --task P0-000
python tools\ai_switchboard.py prompt --task P0-000
python tools\ai_switchboard.py runtime-packet --task P1-001
python tools\ai_switchboard.py doctor --task P0-000
```

## Approve / Pause

Only approve after human review:

```powershell
python tools\ai_switchboard.py approve --task P0-000 --checkpoint CP-0 --reason "Approve CP-0 scaffold"
python tools\ai_switchboard.py run --task P0-000
```

Pause again:

```powershell
python tools\ai_switchboard.py pause --task P0-000 --checkpoint CP-0 --reason "Pause scaffold"
```

## Generate Prompt For AI Coding

```powershell
python tools\ai_switchboard.py prompt --task P0-000 --out .ai/evidence/prompts/P0-000.MASTER_PROMPT.md
```

Paste that prompt into the AI Coding tool before implementation.

## Resume After Interruption

```powershell
python tools\ai_switchboard.py resume --task P0-000
```

The output tells the agent which plan, lane file, latest executor manifest, and runtime report to read before continuing.
