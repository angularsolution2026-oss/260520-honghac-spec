# Git Tracked Only Inventory

`index_repo.py` and `build_corpus.py` support a noise-control mode:

```powershell
python tools\index_repo.py --git-tracked-only
python tools\build_corpus.py --git-tracked-only
```

When the project directory is a Git repository, the tools use `git ls-files`
as the source of truth and ignore local/untracked/generated files.

When Git is unavailable or the directory is not a Git repository, the tools
print a `WARNING` and fall back to the previous behavior:

- `index_repo.py`: filesystem scan
- `build_corpus.py`: index contents
