# Hồng Hạc City — Handoff nhanh

**Cập nhật:** 2026-05-18  
**Dành cho:** Bạn (human) hoặc Cursor session mới  
**Không phải luật sản phẩm** — chỉ bản đồ bối cảnh. Luật đầy đủ: `docs/spec/00-master-instruction.md` và `.ai/core/rules.md`.

---

## Bạn đang ở đâu?

Dự án **chưa có code app** (`package.json`, `app/` chưa tồn tại).  
Governance + spec đã xong. Việc kế tiếp: **P0-000** (scaffold Next.js 15 + route stub).

| | |
|---|---|
| **Sản phẩm** | Nền tảng hỗ trợ quyết định BĐS — không phải landing bán hàng |
| **Core product** | **Sa bàn** — bản đồ quyết định tại `/sa-ban` |
| **Site** | `https://bacninhhonghaccity.vn` |
| **CĐT (chỉ tham chiếu)** | `honghacphumyhung.vn` — không nhầm copy / positioning |
| **Governance** | GOV-001 → GOV-005 ✅ |
| **IA lock** | DEC-015 ✅ — Luxury PropTech / Urban Intelligence Decision Platform; `/sa-ban` = Sprint 1A shell, Sprint 1B full map |
| **Blocker duy nhất** | Bạn chưa **approve CP-0** → chưa được chạy `create-next-app` |

Chi tiết trạng thái live: [`.ai/state/task-state.md`](.ai/state/task-state.md)

---

## Agent đọc gì trước?

1. [`.ai/onboarding/AI_ONBOARDING.md`](.ai/onboarding/AI_ONBOARDING.md) — entry chuẩn  
2. File này (`HANDOFF.md`) — nếu cần bối cảnh human  
3. [`.ai/tasks/P0-000.plan.md`](.ai/tasks/P0-000.plan.md) — **chỉ khi** đã có lệnh execute Phase 0  

Đừng đọc hết 19 file spec — dùng [`.ai/planning/SPEC_DIGEST.md`](.ai/planning/SPEC_DIGEST.md) hoặc [`.ai/onboarding/CONTEXT_BUDGET.md`](.ai/onboarding/CONTEXT_BUDGET.md). Khi hỏi "code xong có chạy thật chưa", đọc thêm [`docs/spec/17-launch-data-readiness.md`](docs/spec/17-launch-data-readiness.md).

---

## Làm gì tiếp theo?

### Cầu dao AI

Repo đã có công tắc vận hành:

```powershell
python tools\cau_dao.py status --task P0-000
python tools\cau_dao.py dry-run --task P0-000
python tools\cau_dao.py close --task P0-000 --checkpoint CP-0 --actor human --reason "Approve CP-0: execute P0-000 scaffold"
python tools\cau_dao.py run --task P0-000
```

Chi tiết: [`tools/CAU_DAO.md`](tools/CAU_DAO.md)

### Trường hợp A — Chưa approve Phase 0

- Agent chỉ `/plan`, trả lời câu hỏi, sửa governance nếu bạn yêu cầu.  
- **Cấm:** `create-next-app`, `npm install` app, scaffold bất kỳ.

### Trường hợp B — Bạn muốn chạy Phase 0

Gửi (hoặc sửa) prompt ở cuối file này, ví dụ:

```text
Approve CP-0, CP-1, CP-2, CP-3 — execute P0-000
```

Agent thực hiện theo thứ tự:

1. [`.ai/tasks/P0-000.plan.md`](.ai/tasks/P0-000.plan.md) — lệnh, phạm vi, rủi ro  
2. [`.ai/tasks/P0-000.parallel-lanes.md`](.ai/tasks/P0-000.parallel-lanes.md) — lane A→B→C, merge, không đè file  
3. Điền [`.ai/tasks/P0-000.validation-report.md`](.ai/tasks/P0-000.validation-report.md)  
4. Pass: `npm run typecheck && npm run lint && npm run build`  
5. Cập nhật `task-state`, `TASK_GRAPH`, `PROGRESS_CHECKLIST`, `CURRENT_ARCHITECTURE`

**Phase 0 không có:** nội dung thật, LeadForm, MapLibre import, Payload chạy thật. Mọi `page.tsx` stub → `return null`.  
**Map:** package có thể cài; **cấm import** `maplibre-gl` trong Phase 0.

Nếu `create-next-app` báo thư mục không trống → scaffold `temp-app/` rồi merge (trong plan).

---

## Checkpoints cần bạn quyết

| ID | Bạn quyết gì | Mặc định nếu không nói thêm |
|----|----------------|------------------------------|
| **CP-0** | Cho phép chạy scaffold | — (bắt buộc) |
| **CP-1** | Top nav | **Approved DEC-017:** `Sa bàn`; **không** Bảng giá / Pháp lý trên nav |
| **CP-2** | Thêm env GAP-1/2 | Chỉ keys `02 §3` trong `.env.example` |
| **CP-3** | Route tác giả | **Không** tạo `/tu-van/[author-slug]` |
| **CP-4** | Validation PASS | Sau khi build xong |

Top nav (CP-1):

```text
Khám phá đô thị | Sa bàn | Tiềm năng | Tiến độ | Phong cách sống | Tư vấn | Đối tác
```

Gap mở: hiện không có Phase 0 gap mở. Xem [`.ai/planning/GAP_REGISTER.md`](.ai/planning/GAP_REGISTER.md)

---

## 5 quy tắc nhớ lâu

1. **Map-centric** — mọi thứ phục vụ hành trình tới `/sa-ban`, không làm site brochure.  
2. **`/plan` trước code** — không nhảy thẳng implement.  
3. **Không rebuild kiến trúc** — stack/route đã lock (`00 §13`).  
4. **Không commit** `.env.local` (có secret).  
5. **Gap không tự sửa** — ghi `DECISION_LOG` + chờ approve.

---

## File quan trọng (bookmark)

| Cần | Đường dẫn |
|-----|-----------|
| Trạng thái task | `.ai/state/task-state.md` |
| Cây governance | `.ai/README.md` |
| Plan Phase 0 | `.ai/tasks/P0-000.plan.md` |
| Đã xong / chưa xong | `.ai/planning/PROGRESS_CHECKLIST.md` |
| Audit GOV-005 | `docs/ai/EXECUTIVE_SUMMARY.md` |
| Đọc gì cho đỡ tốn token | `docs/ai/CONTEXT_ROUTING_MATRIX.md` |
| Spec luật cao nhất | `docs/spec/00-master-instruction.md` |
| Cây route chuẩn | `docs/spec/06-app-router-structure.md` |
| Luật dữ liệu để chạy thật | `docs/spec/17-launch-data-readiness.md` |

> Các file cũ `docs/ai/TÊN.md` ở root `docs/ai/` là **redirect** — sửa bản trong `.ai/`, không sửa stub.

---

## Prompt copy-paste (session mới)

**Chưa approve scaffold** — dùng block này:

```text
Đọc HANDOFF.md và .ai/onboarding/AI_ONBOARDING.md.

Trạng thái: chưa có app. GOV-005 xong. P0-000 đã plan, CHƯA approve CP-0.
Chỉ plan / trả lời câu hỏi — KHÔNG create-next-app, KHÔNG scaffold.

Core product: /sa-ban (decision platform). Không brochure BĐS.
```

**Đã approve scaffold** — đổi thành:

```text
Đọc HANDOFF.md và .ai/onboarding/AI_ONBOARDING.md.

Approve CP-0, CP-1, CP-2, CP-3 — execute P0-000.
Theo .ai/tasks/P0-000.plan.md và P0-000.parallel-lanes.md.
Phase 0: route stub return null; KHÔNG import maplibre-gl.
Sau xong: typecheck + lint + build pass; cập nhật validation-report và task-state.
Không commit .env.local.
```

---

## Sau Phase 0

Khi scaffold xong, cập nhật lại **§ "Bạn đang ở đâu?"** trong file này (hoặc nhắn agent refresh HANDOFF): đã có `app/`, blocker chuyển sang Sprint 1A.

---

*Lịch sử: 2026-05-16 — viết lại HANDOFF sau GOV-005. 2026-05-18 — thêm Launch Data Readiness.*
