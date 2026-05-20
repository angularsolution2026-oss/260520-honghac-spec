# Cầu Dao AI

`tools/cau_dao.py` là công tắc vận hành cho workflow `.ai`.

Nếu muốn dùng giao diện dòng lệnh dễ hơn cho task/phase/resume/prompt, dùng thêm [`AI_SWITCHBOARD.md`](AI_SWITCHBOARD.md):

```powershell
python tools\ai_switchboard.py overview
python tools\ai_switchboard.py resume --task P0-000
python tools\ai_switchboard.py prompt --task P0-000
```

## Trạng thái

```powershell
python tools\cau_dao.py status --task P0-000
```

Nếu `SWITCH=OPEN`, executor không được chạy task thật.

## Chạy thử an toàn

```powershell
python tools\cau_dao.py dry-run --task P0-000
```

Dry-run chỉ tạo evidence/TASK_PACKET/file-lock, không cần CP-0.

## Đóng cầu dao

Chỉ chạy lệnh này khi human thật sự approve CP-0.

```powershell
python tools\cau_dao.py close --task P0-000 --checkpoint CP-0 --actor human --reason "Approve CP-0: execute P0-000 scaffold"
```

Đóng xong, checkpoint trong `.ai/state/checkpoints.json` chuyển sang `approved`.

## Đóng và chạy ngay

```powershell
python tools\cau_dao.py close --task P0-000 --checkpoint CP-0 --actor human --reason "Approve CP-0: execute P0-000 scaffold" --run
```

## Chạy khi đã đóng

```powershell
python tools\cau_dao.py run --task P0-000
```

## Chạy task/phase cụ thể

`cau_dao.py` nhận `--task` bất kỳ, nhưng task đó phải có:

- `.ai/tasks/{TASK_ID}.plan.md`
- `.ai/tasks/{TASK_ID}.parallel-lanes.md`
- checkpoint tương ứng trong `.ai/state/checkpoints.json`

Ví dụ:

```powershell
python tools\cau_dao.py status --task P1-001
python tools\cau_dao.py dry-run --task P1-001
python tools\cau_dao.py close --task P1-001 --checkpoint CP-START --actor human --reason "Approve P1-001 homepage implementation"
python tools\cau_dao.py run --task P1-001
```

Muốn chọn phase thì chọn task đầu của phase trong `.ai/runtime/TASK_SWITCHBOARD.md`, không chạy cả phase như một blob.

## Mở lại / khóa execution

```powershell
python tools\cau_dao.py open --task P0-000 --checkpoint CP-0 --actor human --reason "Pause scaffold execution"
```

## Safety rules

- `run` bị block nếu CP-0 chưa `approved`.
- `.env.local` không bị đọc/sửa.
- Evidence nằm trong `.ai/evidence/executor/{TASK_ID}/{timestamp}/`.
- Script này chỉ điều khiển checkpoint và gọi `tools/ai_executor.py`; nó không tự bịa task ngoài plan.
- Nếu quá trình code ngưng, đọc `.ai/runtime/TASK_SWITCHBOARD.md` để resume theo `TASK_ID`.
