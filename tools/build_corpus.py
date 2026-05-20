#!/usr/bin/env python3
"""
Build a local "corpus bag" of repository text files.

Why: You may want the agent to "read the whole repo", but sending all contents into
the LLM context is wasteful. Instead, we generate a local artifact that contains
file contents for retrieval on demand.

Outputs JSONL records:
  { path, bytes, mtime_iso, sha256, kind, content }

Safety:
- Skip binary-like files (by extension + null-byte heuristic)
- Never include secrets: skip all ".env*" except ".env.example"
"""

from __future__ import annotations

import argparse
import datetime as _dt
import hashlib
import json
import subprocess
from pathlib import Path
from typing import Optional


SKIP_EXTS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".ico",
    ".pdf",
    ".zip",
    ".7z",
    ".tar",
    ".gz",
    ".rar",
    ".mp4",
    ".mov",
    ".avi",
}


def _iso_mtime(p: Path) -> str:
    ts = p.stat().st_mtime
    return _dt.datetime.fromtimestamp(ts).isoformat(timespec="seconds")


def _sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _sha256_text_file(p: Path) -> str:
    return _sha256_file(p)


def _read_text_lossy(p: Path, max_bytes: int) -> str:
    with p.open("rb") as f:
        b = f.read(max_bytes)
    return b.decode("utf-8", errors="replace")


def _looks_binary(p: Path, sniff_bytes: int = 8192) -> bool:
    try:
        with p.open("rb") as f:
            b = f.read(sniff_bytes)
    except OSError:
        return True
    if b"\x00" in b:
        return True
    return False


def git_tracked_paths(project_dir: Path) -> Optional[set[str]]:
    try:
        proc = subprocess.run(
            ["git", "ls-files"],
            cwd=str(project_dir),
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=False,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    if proc.returncode != 0:
        return None
    return {line.strip().replace("\\", "/") for line in proc.stdout.splitlines() if line.strip()}


def main(argv: Optional[list[str]] = None) -> int:
    ap = argparse.ArgumentParser(description="Build a local corpus JSONL from repo text files.")
    ap.add_argument("--project-dir", default=str(Path.cwd()), help="Project directory to read.")
    ap.add_argument("--index", default=".ai/evidence/repo_index/repo.index.jsonl", help="Index jsonl produced by index_repo.py (relative to project-dir unless absolute).")
    ap.add_argument("--out", default=".ai/evidence/repo_index/repo.corpus.jsonl", help="Output JSONL path (relative to project-dir unless absolute).")
    ap.add_argument("--manifest", default=None, help="Output manifest path. Defaults to repo.corpus.manifest.json next to --out.")
    ap.add_argument("--max-bytes", type=int, default=300_000, help="Max bytes to read per file (truncate).")
    ap.add_argument("--git-tracked-only", action="store_true", help="Only include files from git ls-files; fallback to index contents if git is unavailable.")
    ap.add_argument("--check-stale", action="store_true", help="Exit 1 if corpus manifest does not match current index hash.")
    args = ap.parse_args(argv)

    project_dir = Path(args.project_dir).resolve()
    index_path = Path(args.index)
    if not index_path.is_absolute():
        index_path = (project_dir / index_path).resolve()

    out_path = Path(args.out)
    if not out_path.is_absolute():
        out_path = (project_dir / out_path).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    manifest_path = Path(args.manifest) if args.manifest else out_path.with_name("repo.corpus.manifest.json")
    if not manifest_path.is_absolute():
        manifest_path = (project_dir / manifest_path).resolve()

    if args.check_stale:
        if not manifest_path.exists():
            print("STALE=yes")
            print("REASON=missing_manifest")
            return 1
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8", errors="replace"))
        except (OSError, json.JSONDecodeError) as exc:
            print("STALE=yes")
            print(f"REASON=manifest_unreadable:{exc}")
            return 1
        current_index_hash = _sha256_text_file(index_path) if index_path.exists() else None
        manifest_index_hash = manifest.get("index_sha256")
        stale = current_index_hash != manifest_index_hash
        print(f"STALE={'yes' if stale else 'no'}")
        print(f"MANIFEST_INDEX_HASH={manifest_index_hash}")
        print(f"CURRENT_INDEX_HASH={current_index_hash}")
        print(f"MANIFEST_CREATED_AT={manifest.get('created_at')}")
        return 1 if stale else 0

    tracked_paths: Optional[set[str]] = None
    if args.git_tracked_only:
        tracked_paths = git_tracked_paths(project_dir)
        if tracked_paths is None:
            print("WARNING=git_tracked_only_requested_but_git_unavailable; falling back to index contents")

    total = 0
    kept = 0
    with index_path.open("r", encoding="utf-8", errors="replace") as idx, out_path.open("w", encoding="utf-8", newline="\n") as out:
        for line in idx:
            line = line.strip()
            if not line:
                continue
            rec = json.loads(line)
            total += 1
            rel = rec.get("path")
            if not rel:
                continue
            rel = str(rel).replace("\\", "/")
            if tracked_paths is not None and rel not in tracked_paths:
                continue
            p = (project_dir / rel).resolve()

            name_lc = p.name.lower()
            if name_lc.startswith(".env") and name_lc != ".env.example":
                continue

            ext = p.suffix.lower()
            if ext in SKIP_EXTS:
                continue
            if not p.exists() or not p.is_file():
                continue
            if _looks_binary(p):
                continue

            content = _read_text_lossy(p, max_bytes=int(args.max_bytes))
            out_rec = {
                "path": rel,
                "bytes": int(p.stat().st_size),
                "mtime_iso": _iso_mtime(p),
                "sha256": _sha256_file(p),
                "kind": rec.get("kind") or "other",
                "content": content,
            }
            out.write(json.dumps(out_rec, ensure_ascii=False) + "\n")
            kept += 1

    manifest = {
        "created_at": _dt.datetime.now().isoformat(timespec="seconds"),
        "project_dir": str(project_dir),
        "index": str(index_path),
        "index_sha256": _sha256_text_file(index_path) if index_path.exists() else None,
        "corpus": str(out_path),
        "corpus_sha256": _sha256_text_file(out_path) if out_path.exists() else None,
        "git_tracked_only_requested": bool(args.git_tracked_only),
        "files_total": total,
        "files_included": kept,
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"PROJECT_DIR={project_dir}")
    print(f"INDEX={index_path}")
    print(f"CORPUS={out_path}")
    print(f"MANIFEST={manifest_path}")
    print(f"FILES_TOTAL={total}")
    print(f"FILES_INCLUDED={kept}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
