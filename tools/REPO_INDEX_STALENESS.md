# Repo Index Staleness

`index_repo.py` writes `.ai/evidence/repo_index/repo.manifest.json` with an
`inventory_hash` for the files included in the snapshot.

Check whether the current repository still matches the snapshot:

```powershell
python tools\index_repo.py --git-tracked-only --check-stale
```

Exit codes:

- `0`: snapshot is current
- `1`: snapshot is stale; rerun `index_repo.py` and `build_corpus.py`
- `2`: manifest is missing, so freshness is unknown

`build_corpus.py` also writes `repo.corpus.manifest.json`, including the
`sha256` of the index file used to build the corpus.

Recommended regen after governance/spec changes:

```powershell
python tools\index_repo.py --git-tracked-only
python tools\build_corpus.py --git-tracked-only
```
