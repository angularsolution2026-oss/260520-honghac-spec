# `index_repo.py` (Repo Indexer)

Tool này giúp “đọc repo mà ít tốn token” bằng cách **không nạp toàn bộ nội dung** vào AI, mà tạo ra:
- `repo.index.jsonl`: chỉ mục file (metadata + hash + phân loại + tuỳ chọn head/tail/headings)
- `repo.dupes.json`: danh sách file trùng nội dung theo `sha256` (giúp dedupe)
- `repo.tree.txt`: cây thư mục deterministic (không cần lệnh `tree`)

Mặc định tool sẽ bỏ qua các thư mục/file “nặng” như `node_modules`, `.git`, `.next`, `dist`, `build`, ảnh/video, zip...

## Chạy tool

### 1) Nếu bạn đang đứng **ngay trong thư mục dự án** `260516-honghac`

```powershell
python tools\index_repo.py --root . --project-subdir 260516-honghac
```

### 2) Nếu bạn đang đứng ở **thư mục cha** (parent) và bên trong có `260516-honghac/`

```powershell
python 260516-honghac\tools\index_repo.py --root . --project-subdir 260516-honghac
```

## Output (mặc định)

Được tạo trong:
`260516-honghac/.ai/evidence/repo_index/`

- `repo.index.jsonl`
- `repo.dupes.json`
- `repo.tree.txt`

## Tùy chỉnh thường dùng

- Đổi thư mục output:
```powershell
python tools\index_repo.py --out .ai/evidence/repo_index_custom
```

- Giảm “glimpse” để file index nhỏ hơn (ít token hơn):
```powershell
python tools\index_repo.py --glimpse-bytes 12000 --head-lines 20 --tail-lines 10
```

- Không ghi head/tail (index siêu nhẹ):
```powershell
python tools\index_repo.py --glimpse-bytes 0 --head-lines 0 --tail-lines 0
```

- Bỏ qua thêm thư mục/file theo nhu cầu:
```powershell
python tools\index_repo.py --skip-dir .next_cache --skip-glob "*.log"
```

## Cách dùng output để giảm token (gợi ý workflow)

1. Dùng `repo.tree.txt` để “định tuyến” phần nào cần đọc.
2. Dùng `repo.dupes.json` để nhận ra **file trùng nội dung y hệt** (exact duplicate theo `sha256`) và chỉ chọn 1 bản để đọc.
   Lưu ý: các cặp như `docs/ai/*` và `.ai/*` trong repo này thường là 2 bộ tài liệu “song song/related” nhưng **không nhất thiết giống hệt byte-by-byte**, nên có thể **không xuất hiện** trong `repo.dupes.json`.
   Nếu bạn muốn phát hiện “gần giống” (near-duplicate), cần thêm bước so sánh theo similarity (ví dụ: MinHash/SimHash hoặc so sánh headings + Jaccard).
3. Khi AI cần nội dung, chỉ trích các dòng/headings liên quan từ `repo.index.jsonl` thay vì paste cả file.

## Lưu ý an toàn (secrets)

- Tool sẽ **không đọc/không hash** các file dạng `.env*` (ví dụ: `.env.local`) vì có thể chứa secrets.
- Riêng `.env.example` thường là file mẫu có thể chia sẻ, nên vẫn được index như bình thường.
