#!/usr/bin/env python3
"""
Repo indexer for AI-assisted workflows.

Goal: reduce tokens by replacing "read everything" with:
- a lightweight file index (jsonl)
- a deterministic directory tree view (txt)
- optional small content glimpses (head/tail) for quick routing
- duplicate detection by sha256

Works well for repositories that keep parallel doc structures (e.g. docs/ai vs .ai).
"""

from __future__ import annotations

import argparse
import datetime as _dt
import fnmatch
import hashlib
import json
import os
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Iterator, Optional


DEFAULT_SKIP_DIRS = [
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
    ".venv",
    "venv",
    "__pycache__",
]

DEFAULT_SKIP_GLOBS = [
    "*.png",
    "*.jpg",
    "*.jpeg",
    "*.gif",
    "*.webp",
    "*.svg",
    "*.ico",
    "*.pdf",
    "*.zip",
    "*.7z",
    "*.tar",
    "*.gz",
    "*.rar",
    "*.mp4",
    "*.mov",
    "*.avi",
]


@dataclass(frozen=True)
class FileRecord:
    path: str
    ext: str
    bytes: int
    mtime_iso: str
    sha256: str
    kind: str
    md_headings: Optional[list[str]] = None
    head: Optional[str] = None
    tail: Optional[str] = None


def _iso_mtime(p: Path) -> str:
    ts = p.stat().st_mtime
    return _dt.datetime.fromtimestamp(ts).isoformat(timespec="seconds")


def _sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def _match_any_glob(name: str, globs: list[str]) -> bool:
    for g in globs:
        if fnmatch.fnmatch(name, g):
            return True
    return False


def _detect_kind(p: Path) -> str:
    n = p.name.lower()
    ext = p.suffix.lower()
    if n.startswith(".env"):
        return "env"
    if ext in {".md", ".mdx"}:
        return "doc"
    if ext in {".json", ".yml", ".yaml", ".toml", ".ini"}:
        return "config"
    if ext in {".ts", ".tsx", ".js", ".jsx", ".py", ".go", ".java", ".rb", ".php"}:
        return "code"
    if ext in {".sql"}:
        return "data"
    return "other"


def _safe_ext(p: Path) -> str:
    # For env-style files like ".env.local" the suffix is ".local", which is not useful.
    # Normalize to ".env" to make downstream filtering simpler.
    if p.name.lower().startswith(".env"):
        return ".env"
    return p.suffix.lower()


def _extract_md_headings(text: str, limit: int = 40) -> list[str]:
    headings: list[str] = []
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("#"):
            headings.append(s)
        if len(headings) >= limit:
            break
    return headings


def _read_text_lossy(p: Path, max_bytes: int) -> str:
    # Lossy decode is intentional: we want robustness even when files are not UTF-8.
    with p.open("rb") as f:
        b = f.read(max_bytes)
    return b.decode("utf-8", errors="replace")


def _head_tail(text: str, head_lines: int, tail_lines: int) -> tuple[Optional[str], Optional[str]]:
    if head_lines <= 0 and tail_lines <= 0:
        return None, None
    lines = text.splitlines()
    head = "\n".join(lines[:head_lines]) if head_lines > 0 else None
    tail = "\n".join(lines[-tail_lines:]) if tail_lines > 0 else None
    return head, tail


def iter_files(
    root: Path,
    skip_dirs: list[str],
    skip_globs: list[str],
) -> Iterator[Path]:
    skip_dir_set = set(d.lower() for d in skip_dirs)
    skip_globs_lc = [g.lower() for g in skip_globs]
    for dirpath, dirnames, filenames in os.walk(root):
        d = Path(dirpath)
        # prune directories in-place
        dirnames[:] = [x for x in dirnames if x.lower() not in skip_dir_set]
        for name in filenames:
            if _match_any_glob(name.lower(), skip_globs_lc):
                continue
            yield d / name


def git_tracked_files(project_dir: Path) -> Optional[list[Path]]:
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
    files: list[Path] = []
    for line in proc.stdout.splitlines():
        rel = line.strip()
        if not rel:
            continue
        p = (project_dir / rel).resolve()
        if p.exists() and p.is_file():
            files.append(p)
    return files


def iter_tracked_files(
    project_dir: Path,
    tracked_files: list[Path],
    skip_dirs: list[str],
    skip_globs: list[str],
) -> Iterator[Path]:
    skip_dir_set = set(d.lower() for d in skip_dirs)
    skip_globs_lc = [g.lower() for g in skip_globs]
    for p in tracked_files:
        rel_parts = p.relative_to(project_dir).parts
        if any(part.lower() in skip_dir_set for part in rel_parts[:-1]):
            continue
        if _match_any_glob(p.name.lower(), skip_globs_lc):
            continue
        yield p


def build_tree(project_dir: Path, skip_dirs: list[str]) -> str:
    # Deterministic tree-like view, without needing external "tree" command.
    # ASCII-only on purpose to avoid encoding issues across shells/editors.
    skip_dir_set = set(d.lower() for d in skip_dirs)

    def is_skipped_dir(p: Path) -> bool:
        return p.name.lower() in skip_dir_set

    lines: list[str] = [str(project_dir)]

    def walk_dir(d: Path, prefix: str) -> None:
        entries = []
        for p in d.iterdir():
            if p.is_dir():
                if is_skipped_dir(p):
                    continue
                entries.append((p.name, p, True))
            else:
                entries.append((p.name, p, False))
        entries.sort(key=lambda t: (not t[2], t[0].lower()))

        for i, (_, p, is_dir) in enumerate(entries):
            last = i == len(entries) - 1
            branch = "`-- " if last else "|-- "
            lines.append(f"{prefix}{branch}{p.name}{'/' if is_dir else ''}")
            if is_dir:
                walk_dir(p, prefix + ("    " if last else "|   "))

    walk_dir(project_dir, "")
    return "\n".join(lines) + "\n"


def build_tree_from_files(project_dir: Path, files: list[Path]) -> str:
    root: dict[str, dict] = {}
    for p in files:
        node = root
        for part in p.relative_to(project_dir).parts:
            node = node.setdefault(part, {})

    lines: list[str] = [str(project_dir)]

    def walk(node: dict[str, dict], prefix: str) -> None:
        names = sorted(node.keys(), key=str.lower)
        for i, name in enumerate(names):
            last = i == len(names) - 1
            is_dir = bool(node[name])
            branch = "`-- " if last else "|-- "
            lines.append(f"{prefix}{branch}{name}{'/' if is_dir else ''}")
            if is_dir:
                walk(node[name], prefix + ("    " if last else "|   "))

    walk(root, "")
    return "\n".join(lines) + "\n"


def file_signature(project_dir: Path, p: Path, max_file_bytes: int) -> dict:
    st = p.stat()
    rel = p.relative_to(project_dir).as_posix()
    name_lc = p.name.lower()
    if name_lc.startswith(".env") and name_lc != ".env.example":
        sha = "(skipped:secrets)"
    elif st.st_size > max_file_bytes:
        sha = "(skipped:too_large)"
    else:
        sha = _sha256_file(p)
    return {
        "path": rel,
        "bytes": int(st.st_size),
        "mtime_iso": _iso_mtime(p),
        "sha256": sha,
        "kind": _detect_kind(p),
    }


def inventory_hash(signatures: list[dict]) -> str:
    stable = sorted(signatures, key=lambda x: x["path"])
    payload = json.dumps(stable, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def resolve_inventory_files(
    project_dir: Path,
    skip_dirs: list[str],
    skip_globs: list[str],
    git_tracked_only: bool,
) -> tuple[list[Path], str]:
    tracked_files: Optional[list[Path]] = None
    if git_tracked_only:
        tracked_files = git_tracked_files(project_dir)
        if tracked_files is None:
            print("WARNING=git_tracked_only_requested_but_git_unavailable; falling back to filesystem scan")
        else:
            return list(iter_tracked_files(project_dir, tracked_files, skip_dirs, skip_globs)), "git_tracked"
    return list(iter_files(project_dir, skip_dirs=skip_dirs, skip_globs=skip_globs)), "filesystem"


def current_inventory_hash(
    project_dir: Path,
    skip_dirs: list[str],
    skip_globs: list[str],
    max_file_bytes: int,
    git_tracked_only: bool,
    exclude_dir: Optional[Path] = None,
) -> tuple[str, int, str]:
    files, source_mode = resolve_inventory_files(project_dir, skip_dirs, skip_globs, git_tracked_only)
    if exclude_dir is not None:
        exclude_dir = exclude_dir.resolve()
        files = [p for p in files if not p.resolve().is_relative_to(exclude_dir)]
    signatures: list[dict] = []
    for p in files:
        try:
            signatures.append(file_signature(project_dir, p, max_file_bytes))
        except OSError:
            continue
    return inventory_hash(signatures), len(signatures), source_mode


def check_stale(
    manifest_path: Path,
    project_dir: Path,
    skip_dirs: list[str],
    skip_globs: list[str],
    max_file_bytes: int,
    git_tracked_only: bool,
) -> int:
    if not manifest_path.exists():
        print(f"STALE=unknown")
        print(f"REASON=manifest_missing")
        print(f"MANIFEST={manifest_path}")
        return 2
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    current_hash, file_count, source_mode = current_inventory_hash(
        project_dir=project_dir,
        skip_dirs=skip_dirs,
            skip_globs=skip_globs,
            max_file_bytes=max_file_bytes,
            git_tracked_only=git_tracked_only,
            exclude_dir=manifest_path.parent,
        )
    manifest_hash = manifest.get("inventory_hash")
    stale = current_hash != manifest_hash
    print(f"STALE={'yes' if stale else 'no'}")
    print(f"MANIFEST_HASH={manifest_hash}")
    print(f"CURRENT_HASH={current_hash}")
    print(f"MANIFEST_CREATED_AT={manifest.get('created_at')}")
    print(f"CURRENT_FILE_COUNT={file_count}")
    print(f"SOURCE_MODE={source_mode}")
    return 1 if stale else 0


def index_repo(
    project_dir: Path,
    out_dir: Path,
    skip_dirs: list[str],
    skip_globs: list[str],
    max_file_bytes: int,
    glimpse_bytes: int,
    head_lines: int,
    tail_lines: int,
    git_tracked_only: bool,
) -> tuple[Path, Path, Path, Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    index_path = out_dir / "repo.index.jsonl"
    dupes_path = out_dir / "repo.dupes.json"
    tree_path = out_dir / "repo.tree.txt"
    manifest_path = out_dir / "repo.manifest.json"

    files, source_mode = resolve_inventory_files(project_dir, skip_dirs, skip_globs, git_tracked_only)
    out_dir_resolved = out_dir.resolve()
    files = [p for p in files if not p.resolve().is_relative_to(out_dir_resolved)]

    # tree
    if source_mode == "git_tracked":
        tree_path.write_text(build_tree_from_files(project_dir, files), encoding="utf-8")
    else:
        tree_path.write_text(build_tree(project_dir, skip_dirs), encoding="utf-8")

    # index + dupes
    sha_to_paths: dict[str, list[str]] = {}
    signatures: list[dict] = []

    with index_path.open("w", encoding="utf-8", newline="\n") as f:
        for p in files:
            try:
                sig = file_signature(project_dir, p, max_file_bytes)
            except OSError:
                continue
            signatures.append(sig)

            # Safety: never read or hash local env files. They may contain secrets.
            # We still record their existence and metadata for reproducibility.
            # Exception: ".env.example" is meant to be shared, so it's allowed.
            name_lc = p.name.lower()
            if name_lc.startswith(".env") and name_lc != ".env.example":
                rec = FileRecord(
                    path=sig["path"],
                    ext=_safe_ext(p),
                    bytes=sig["bytes"],
                    mtime_iso=sig["mtime_iso"],
                    sha256=sig["sha256"],
                    kind=sig["kind"],
                    md_headings=None,
                    head=None,
                    tail=None,
                )
                f.write(json.dumps(rec.__dict__, ensure_ascii=False) + "\n")
                continue

            if sig["sha256"] == "(skipped:too_large)":
                # index metadata only for huge files; don't hash/read them
                rec = FileRecord(
                    path=sig["path"],
                    ext=_safe_ext(p),
                    bytes=sig["bytes"],
                    mtime_iso=sig["mtime_iso"],
                    sha256=sig["sha256"],
                    kind=sig["kind"],
                )
                f.write(json.dumps(rec.__dict__, ensure_ascii=False) + "\n")
                continue

            sha = sig["sha256"]
            rel = sig["path"]
            sha_to_paths.setdefault(sha, []).append(rel)

            kind = sig["kind"]
            md_headings: Optional[list[str]] = None
            head: Optional[str] = None
            tail: Optional[str] = None

            if glimpse_bytes > 0 and kind in {"doc", "config", "code", "env"}:
                text = _read_text_lossy(p, max_bytes=glimpse_bytes)
                head, tail = _head_tail(text, head_lines=head_lines, tail_lines=tail_lines)
                if kind == "doc" and p.suffix.lower() in {".md", ".mdx"}:
                    md_headings = _extract_md_headings(text)

            rec = FileRecord(
                path=rel,
                ext=_safe_ext(p),
                bytes=sig["bytes"],
                mtime_iso=sig["mtime_iso"],
                sha256=sha,
                kind=kind,
                md_headings=md_headings,
                head=head,
                tail=tail,
            )
            f.write(json.dumps(rec.__dict__, ensure_ascii=False) + "\n")

    dupes = {sha: paths for sha, paths in sha_to_paths.items() if len(paths) > 1}
    dupes_path.write_text(json.dumps(dupes, ensure_ascii=False, indent=2), encoding="utf-8")
    manifest = {
        "created_at": _dt.datetime.now().isoformat(timespec="seconds"),
        "project_dir": str(project_dir),
        "source_mode": source_mode,
        "git_tracked_only_requested": bool(git_tracked_only),
        "file_count": len(signatures),
        "inventory_hash": inventory_hash(signatures),
        "artifacts": {
            "index": index_path.name,
            "dupes": dupes_path.name,
            "tree": tree_path.name,
        },
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    return index_path, dupes_path, tree_path, manifest_path


def resolve_project_dir(root: Path, project_subdir: str) -> Path:
    # If the caller runs from the parent folder, use root/subdir.
    cand = root / project_subdir
    if cand.exists() and cand.is_dir():
        return cand
    # Otherwise assume root already is the project folder.
    return root


def main(argv: Optional[list[str]] = None) -> int:
    ap = argparse.ArgumentParser(
        description="Index a repository for AI-friendly retrieval (reduce tokens by indexing + dedupe + optional glimpses).",
        epilog=(
            "Examples:\n"
            "  # Run from the project folder\n"
            "  python tools/index_repo.py --root . --project-subdir 260516-honghac\n"
            "\n"
            "  # Run from the parent folder of the project\n"
            "  python 260516-honghac/tools/index_repo.py --root . --project-subdir 260516-honghac\n"
            "\n"
            "Outputs (by default): .ai/evidence/repo_index/{repo.index.jsonl,repo.dupes.json,repo.tree.txt}\n"
        ),
        formatter_class=argparse.RawTextHelpFormatter,
    )
    ap.add_argument("--root", default=str(Path.cwd()), help="Root folder (parent of the project folder, or the project folder itself).")
    ap.add_argument("--project-subdir", default="260516-honghac", help="Project subfolder under root. If missing, root is used as project.")
    ap.add_argument("--out", default=".ai/evidence/repo_index", help="Output directory (relative to project dir unless absolute).")
    ap.add_argument("--max-file-bytes", type=int, default=1_000_000, help="Skip hashing/reading files larger than this.")
    ap.add_argument("--glimpse-bytes", type=int, default=48_000, help="Max bytes to read for head/tail/headings extraction.")
    ap.add_argument("--head-lines", type=int, default=40, help="How many head lines to include per file.")
    ap.add_argument("--tail-lines", type=int, default=20, help="How many tail lines to include per file.")
    ap.add_argument("--skip-dir", action="append", default=[], help="Additional directory name to skip (repeatable).")
    ap.add_argument("--skip-glob", action="append", default=[], help="Additional filename glob to skip (repeatable).")
    ap.add_argument("--git-tracked-only", action="store_true", help="Use git ls-files as the file inventory; fallback to filesystem scan if git is unavailable.")
    ap.add_argument("--check-stale", action="store_true", help="Check current inventory against repo.manifest.json and exit 1 when stale.")
    ap.add_argument("--manifest", default=None, help="Manifest path for --check-stale. Defaults to {out}/repo.manifest.json.")
    args = ap.parse_args(argv)

    root = Path(args.root).resolve()
    project_dir = resolve_project_dir(root, args.project_subdir).resolve()

    skip_dirs = DEFAULT_SKIP_DIRS + args.skip_dir
    skip_globs = DEFAULT_SKIP_GLOBS + args.skip_glob

    out_dir = Path(args.out)
    if not out_dir.is_absolute():
        out_dir = (project_dir / out_dir).resolve()

    manifest_path = Path(args.manifest) if args.manifest else out_dir / "repo.manifest.json"
    if not manifest_path.is_absolute():
        manifest_path = (project_dir / manifest_path).resolve()

    if args.check_stale:
        return check_stale(
            manifest_path=manifest_path,
            project_dir=project_dir,
            skip_dirs=skip_dirs,
            skip_globs=skip_globs,
            max_file_bytes=int(args.max_file_bytes),
            git_tracked_only=bool(args.git_tracked_only),
        )

    index_path, dupes_path, tree_path, written_manifest_path = index_repo(
        project_dir=project_dir,
        out_dir=out_dir,
        skip_dirs=skip_dirs,
        skip_globs=skip_globs,
        max_file_bytes=int(args.max_file_bytes),
        glimpse_bytes=int(args.glimpse_bytes),
        head_lines=int(args.head_lines),
        tail_lines=int(args.tail_lines),
        git_tracked_only=bool(args.git_tracked_only),
    )

    print(f"PROJECT_DIR={project_dir}")
    print(f"INDEX={index_path}")
    print(f"DUPES={dupes_path}")
    print(f"TREE={tree_path}")
    print(f"MANIFEST={written_manifest_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
