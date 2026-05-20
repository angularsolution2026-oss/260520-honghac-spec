# Cấu trúc thư mục dự án (snapshot)

> Snapshot theo trạng thái thư mục tại thời điểm tạo file này.

```text
E:\260516-honghac
├─ .ai/
│  ├─ core/
│  │  ├─ done-criteria.md
│  │  ├─ orchestration.md
│  │  ├─ quality-gates.md
│  │  └─ rules.md
│  ├─ evidence/
│  │  ├─ regression/
│  │  │  └─ .gitkeep
│  │  └─ runtime/
│  │     └─ .gitkeep
│  ├─ governance/
│  │  ├─ AGENT_HANDOFF_PROTOCOL.md
│  │  ├─ ARCHITECTURE_IMMUTABLES.md
│  │  ├─ FILE_OWNERSHIP_MAP.md
│  │  ├─ KNOWN_FAILURE_PATTERNS.md
│  │  └─ ROLLBACK_POLICY.md
│  ├─ manifest/
│  │  └─ starter-manifest.md
│  ├─ onboarding/
│  │  ├─ AI_ONBOARDING.md
│  │  ├─ CONTEXT_BUDGET.md
│  │  └─ README_SYNC_POLICY.md
│  ├─ planning/
│  │  ├─ CURRENT_ARCHITECTURE.md
│  │  ├─ DECISION_LOG.md
│  │  ├─ GAP_REGISTER.md
│  │  ├─ MVP_SCOPE.md
│  │  ├─ PHASE_PLAN.md
│  │  ├─ PROGRESS_CHECKLIST.md
│  │  ├─ SPEC_DIGEST.md
│  │  └─ TASK_GRAPH.md
│  ├─ registry/
│  │  ├─ agents.registry.md
│  │  └─ skills.registry.md
│  ├─ runtime/
│  │  ├─ BROWSER_AUTOMATION_RULES.md
│  │  ├─ LOCALHOST_RUNTIME_WORKFLOW.md
│  │  ├─ UI_EXPLORATION_PROTOCOL.md
│  │  └─ VISUAL_REVIEW_CRITERIA.md
│  ├─ state/
│  │  └─ task-state.md
│  ├─ tasks/
│  │  ├─ P0-000.parallel-lanes.md
│  │  ├─ P0-000.plan.md
│  │  └─ P0-000.validation-report.md
│  └─ README.md
├─ docs/
│  ├─ ai/
│  │  ├─ audits/
│  │  │  ├─ BOUNDARY_FEASIBILITY_AUDIT.md
│  │  │  ├─ CONSISTENCY_AUDIT.md
│  │  │  ├─ CROSS_REFERENCE_AUDIT.md
│  │  │  └─ SCOPE_STRUCTURE_AUDIT.md
│  │  ├─ evidence/
│  │  │  ├─ regression/
│  │  │  └─ runtime/
│  │  ├─ tasks/
│  │  │  ├─ P0-000.parallel-lanes.md
│  │  │  ├─ P0-000.plan.md
│  │  │  └─ P0-000.validation-report.md
│  │  ├─ AGENT_HANDOFF_PROTOCOL.md
│  │  ├─ ARCHITECTURE_IMMUTABLES.md
│  │  ├─ AI_ONBOARDING.md
│  │  ├─ BROWSER_AUTOMATION_RULES.md
│  │  ├─ CONTEXT_BUDGET.md
│  │  ├─ CONTEXT_ROUTING_MATRIX.md
│  │  ├─ CURRENT_ARCHITECTURE.md
│  │  ├─ DECISION_LOG.md
│  │  ├─ EXECUTIVE_SUMMARY.md
│  │  ├─ FILE_OWNERSHIP_MAP.md
│  │  ├─ GAP_REGISTER.md
│  │  ├─ GOVERNANCE_HEALTH_REPORT.md
│  │  ├─ INDEX.md
│  │  ├─ KNOWN_FAILURE_PATTERNS.md
│  │  ├─ LOCALHOST_RUNTIME_WORKFLOW.md
│  │  ├─ MIGRATION_PLAN.md
│  │  ├─ MVP_SCOPE.md
│  │  ├─ PHASE_PLAN.md
│  │  ├─ PROGRESS_CHECKLIST.md
│  │  ├─ README_SYNC_POLICY.md
│  │  ├─ ROLLBACK_POLICY.md
│  │  ├─ SPEC_DIGEST.md
│  │  ├─ TASK_GRAPH.md
│  │  ├─ UI_EXPLORATION_PROTOCOL.md
│  │  └─ VISUAL_REVIEW_CRITERIA.md
│  └─ spec/
│     ├─ 00-master-instruction.md
│     ├─ 01-project-overview.md
│     ├─ 02-tech-stack.md
│     ├─ 03-user-roles-permissions.md
│     ├─ 04-features-priority.md
│     ├─ 05-database-schema.md
│     ├─ 06-app-router-structure.md
│     ├─ 07-ui-ux-design-system.md
│     ├─ 08-lead-capture-cro.md
│     ├─ 09-seo-strategy.md
│     ├─ 10-admin-dashboard.md
│     ├─ 11-performance.md
│     ├─ 12-analytics-tracking.md
│     ├─ 13-privacy-legal.md
│     ├─ 14-schema-markup.md
│     ├─ 15-content-governance.md
│     ├─ 16-scoring-quality-gate.md
│     └─ website-structure.md
├─ .env.example
├─ .env.local
├─ HANDOFF.md
├─ README.md
└─ Cautruc_thumuc.md
```

Ghi chú:
- `.env.local` thường chứa secrets (không nên commit).


--- 📁 .ai/
Nội dung : Thư mục cấu hình và tài liệu vận hành cho workflow AI agents trong dự án
Mục đích : Chuẩn hóa cách Codex/agents đọc spec, làm việc theo phase, theo dõi trạng thái và áp quality gate
--- 📁 .ai/core/
Nội dung : Bộ “luật lõi” và tiêu chuẩn nền tảng cho tác nhân AI (rules/orchestration/quality)
Mục đích : Là nguồn tham chiếu gốc để agents tuân thủ khi lập kế hoạch và thực thi thay đổi
--- 📄 .ai/core/done-criteria.md
Nội dung : Tiêu chí “xong” ở mức core (điều kiện hoàn tất task/phase)
Mục đích : Giúp agents và người review đánh giá kết quả có đạt yêu cầu trước khi kết thúc công việc
--- 📄 .ai/core/orchestration.md
Nội dung : Quy ước điều phối tác vụ (vai trò, luồng làm việc, nhịp kiểm tra)
Mục đích : Hướng dẫn cách phối hợp multi-agent để tránh chồng chéo và giữ tiến độ ổn định
--- 📄 .ai/core/quality-gates.md
Nội dung : Danh sách cổng kiểm soát chất lượng (checks, bằng chứng, ngưỡng đạt)
Mục đích : Buộc tác vụ AI phải qua các bước xác minh tối thiểu trước khi merge/chốt
--- 📄 .ai/core/rules.md
Nội dung : Quy tắc hành vi và ràng buộc khi tác nhân AI đọc/ghi/ra quyết định
Mục đích : Giảm rủi ro “bịa”, vượt phạm vi, hoặc làm sai cấu trúc dự án khi AI thao tác
--- 📁 .ai/evidence/
Nội dung : Nơi lưu bằng chứng thực thi (runtime/regression) cho các lần chạy/kiểm tra
Mục đích : Phục vụ audit, truy vết, và so sánh trước-sau khi agents thay đổi hệ thống
--- 📁 .ai/evidence/regression/
Nội dung : Nhánh bằng chứng liên quan kiểm thử hồi quy/so sánh hành vi
Mục đích : Giúp phát hiện regressions khi AI cập nhật code/spec theo thời gian
--- 📄 .ai/evidence/regression/.gitkeep
Nội dung : File giữ chỗ để commit được thư mục rỗng trên Git
Mục đích : Đảm bảo cấu trúc thư mục evidence luôn tồn tại dù chưa có dữ liệu
--- 📁 .ai/evidence/runtime/
Nội dung : Nhánh bằng chứng liên quan các lần chạy local/CI, log, trạng thái runtime
Mục đích : Lưu dấu vết để debug khi agent chạy dev server, build, hoặc automation
--- 📄 .ai/evidence/runtime/.gitkeep
Nội dung : File giữ chỗ để commit được thư mục rỗng trên Git
Mục đích : Cố định cấu trúc evidence/runtime cho quy trình làm việc của agents
--- 📁 .ai/governance/
Nội dung : Bộ tài liệu governance: bất biến kiến trúc, handoff, rollback, ownership, failure patterns
Mục đích : Đặt “lan can” để AI không phá vỡ ràng buộc hệ thống và biết cách bàn giao/hoàn tác
--- 📄 .ai/governance/AGENT_HANDOFF_PROTOCOL.md
Nội dung : Quy trình bàn giao khi đổi agent/người làm (trạng thái, ngữ cảnh, checklist)
Mục đích : Giảm mất mát ngữ cảnh, giúp chuyển ca mượt và hạn chế sai lệch khi tiếp tục công việc
--- 📄 .ai/governance/ARCHITECTURE_IMMUTABLES.md
Nội dung : Danh sách phần kiến trúc “bất biến” không được tự ý thay đổi
Mục đích : Ngăn AI refactor vượt rào, giữ ổn định định hướng kiến trúc dự án
--- 📄 .ai/governance/FILE_OWNERSHIP_MAP.md
Nội dung : Bản đồ ownership theo file/thư mục (ai/công cụ chịu trách nhiệm)
Mục đích : Hướng dẫn agents sửa đúng chỗ, đúng chủ sở hữu, tránh xung đột thay đổi
--- 📄 .ai/governance/KNOWN_FAILURE_PATTERNS.md
Nội dung : Các mẫu lỗi thường gặp khi AI triển khai (anti-patterns, cảnh báo)
Mục đích : Giúp agents nhận diện sớm rủi ro và tránh lặp lại lỗi đã biết
--- 📄 .ai/governance/ROLLBACK_POLICY.md
Nội dung : Chính sách hoàn tác (khi nào rollback, cách ghi nhận và phục hồi)
Mục đích : Đảm bảo thay đổi của AI có đường lui an toàn khi phát sinh sự cố
--- 📁 .ai/manifest/
Nội dung : Thư mục manifest khai báo “gói khởi động”/cấu hình ban đầu cho agent workflow
Mục đích : Cho phép khởi tạo dự án/phiên làm việc theo một cấu hình nhất quán
--- 📄 .ai/manifest/starter-manifest.md
Nội dung : Manifest khởi động (các tài liệu/luật/đầu vào chuẩn cần nạp)
Mục đích : Hướng dẫn Codex/agents biết cần đọc gì trước để làm việc đúng ngữ cảnh
--- 📁 .ai/onboarding/
Nội dung : Tài liệu onboarding dành cho AI agents (điểm bắt đầu, ngân sách ngữ cảnh, sync policy)
Mục đích : Giúp agent mới vào dự án bắt nhịp nhanh mà không đọc tràn lan
--- 📄 .ai/onboarding/AI_ONBOARDING.md
Nội dung : Hướng dẫn onboarding cho tác nhân AI (bắt đầu từ đâu, nguyên tắc đọc spec)
Mục đích : Là “entrypoint” để Codex/agents hiểu luật chơi trước khi code
--- 📄 .ai/onboarding/CONTEXT_BUDGET.md
Nội dung : Quy ước ngân sách ngữ cảnh (giới hạn đọc, ưu tiên nguồn, cách route)
Mục đích : Tránh lãng phí context window và giảm nguy cơ đọc sai/chồng chéo tài liệu
--- 📄 .ai/onboarding/README_SYNC_POLICY.md
Nội dung : Chính sách đồng bộ README (khi nào cập nhật, mức độ, ai chịu trách nhiệm)
Mục đích : Giữ README phản ánh đúng trạng thái dự án khi AI thay đổi spec/cấu trúc
--- 📁 .ai/planning/
Nội dung : Tập tài liệu lập kế hoạch: phase plan, scope, decision log, gap register, checklist tiến độ
Mục đích : Là “bộ não kế hoạch” để agents bám roadmap và ghi nhận quyết định có kiểm soát
--- 📄 .ai/planning/CURRENT_ARCHITECTURE.md
Nội dung : Mô tả kiến trúc hiện tại (điểm đang có, giả định, ranh giới)
Mục đích : Giúp agent định vị trước khi thêm tính năng, tránh thiết kế lệch thực tế
--- 📄 .ai/planning/DECISION_LOG.md
Nội dung : Nhật ký quyết định (decision log) theo thời gian
Mục đích : Truy vết “vì sao làm vậy” để người/agent sau không phải đoán
--- 📄 .ai/planning/GAP_REGISTER.md
Nội dung : Danh sách khoảng trống/thiếu sót (gaps) cần xử lý
Mục đích : Giúp agents ưu tiên việc còn thiếu và tránh quên các rủi ro mở
--- 📄 .ai/planning/MVP_SCOPE.md
Nội dung : Phạm vi MVP (cái gì có/không có ở giai đoạn đầu)
Mục đích : Giữ AI không “overbuild”, tập trung đúng phần giá trị cốt lõi
--- 📄 .ai/planning/PHASE_PLAN.md
Nội dung : Kế hoạch theo phase (mốc, mục tiêu, tiêu chí hoàn tất)
Mục đích : Điều phối tiến độ multi-agent theo từng giai đoạn có kiểm soát
--- 📄 .ai/planning/PROGRESS_CHECKLIST.md
Nội dung : Checklist tiến độ (done/pending) theo hạng mục
Mục đích : Cho người và agent nhìn nhanh trạng thái dự án và next actions
--- 📄 .ai/planning/SPEC_DIGEST.md
Nội dung : Bản tóm tắt spec (digest) để đọc nhanh thay vì đọc toàn bộ
Mục đích : Giảm tải context, giúp agent nắm nhanh luật sản phẩm trước khi triển khai
--- 📄 .ai/planning/TASK_GRAPH.md
Nội dung : Đồ thị nhiệm vụ (phụ thuộc, thứ tự, lanes)
Mục đích : Tối ưu phối hợp multi-agent và tránh làm sai thứ tự phụ thuộc
--- 📁 .ai/registry/
Nội dung : Nơi lưu registry về agents và skills (danh mục, phiên bản, mô tả)
Mục đích : Cho hệ thống điều phối biết “có những agent/skill nào” và cách dùng
--- 📄 .ai/registry/agents.registry.md
Nội dung : Registry tác nhân (agents) theo chuẩn dự án
Mục đích : Hỗ trợ orchestration chọn đúng agent/role cho từng loại việc
--- 📄 .ai/registry/skills.registry.md
Nội dung : Registry kỹ năng (skills) mà agents có thể áp dụng
Mục đích : Chuẩn hóa khả năng và giảm “tự nghĩ” quy trình khi agent làm việc
--- 📁 .ai/runtime/
Nội dung : Tài liệu vận hành khi chạy local (browser automation, workflow localhost, visual review)
Mục đích : Hướng dẫn agents chạy, kiểm tra UI, và thu bằng chứng đúng chuẩn
--- 📄 .ai/runtime/BROWSER_AUTOMATION_RULES.md
Nội dung : Quy tắc automation trình duyệt (được/không được, cách test)
Mục đích : Đảm bảo agent dùng browser automation nhất quán và an toàn khi QA UI
--- 📄 .ai/runtime/LOCALHOST_RUNTIME_WORKFLOW.md
Nội dung : Quy trình chạy localhost (dev server, build, smoke test)
Mục đích : Chuẩn hóa cách agent kiểm tra dự án Next.js ở môi trường local
--- 📄 .ai/runtime/UI_EXPLORATION_PROTOCOL.md
Nội dung : Giao thức khám phá UI (cách đi luồng, chụp/ghi nhận lỗi)
Mục đích : Giúp agent review UI có phương pháp, tránh bỏ sót hoặc đánh giá cảm tính
--- 📄 .ai/runtime/VISUAL_REVIEW_CRITERIA.md
Nội dung : Tiêu chí review hình ảnh/visual (layout, responsive, typography)
Mục đích : Đặt chuẩn chất lượng UI để agent tự kiểm và báo cáo đúng trọng tâm
--- 📁 .ai/state/
Nội dung : Thư mục trạng thái (state) liên quan tiến độ/tác vụ
Mục đích : Lưu “nguồn sự thật” về trạng thái hiện tại cho agent orchestration
--- 📄 .ai/state/task-state.md
Nội dung : File trạng thái nhiệm vụ (task state) ở mức dự án
Mục đích : Cho agents biết việc nào đang làm/dừng/hoàn tất để tránh trùng lặp
--- 📁 .ai/tasks/
Nội dung : Thư mục tài liệu tác vụ cụ thể (plan, lanes, validation report) theo mã task
Mục đích : Là nơi agents bám theo khi thực thi một task lớn theo đúng quy trình
--- 📄 .ai/tasks/P0-000.parallel-lanes.md
Nội dung : Mô tả các “làn song song” (parallel lanes) cho task P0-000
Mục đích : Giúp tách việc cho nhiều agent mà không dẫm chân nhau
--- 📄 .ai/tasks/P0-000.plan.md
Nội dung : Kế hoạch thực hiện task P0-000
Mục đích : Là tài liệu điều phối để agent triển khai đúng phạm vi và thứ tự
--- 📄 .ai/tasks/P0-000.validation-report.md
Nội dung : Báo cáo xác minh/validation cho task P0-000
Mục đích : Cung cấp bằng chứng đạt quality gates trước khi coi task hoàn tất
--- 📄 .ai/README.md
Nội dung : README riêng cho hệ thống .ai (cách dùng, cấu trúc, quy ước)
Mục đích : Giúp người/agent hiểu nhanh thư mục .ai phục vụ gì và dùng ra sao
--- 📁 docs/
Nội dung : Thư mục tài liệu dự án (spec sản phẩm/tech + tài liệu AI vận hành song song)
Mục đích : Là nguồn tài liệu chính để người và agents hiểu yêu cầu và ràng buộc dự án
--- 📁 docs/ai/
Nội dung : Bộ tài liệu AI dành cho con người/agents: protocol, policy, checklist, audit, task docs
Mục đích : Cung cấp hướng dẫn vận hành AI trong repo (đọc gì, làm gì, kiểm gì, ghi nhận gì)
--- 📁 docs/ai/audits/
Nội dung : Các báo cáo audit (kiểm tra tính nhất quán, phạm vi, liên kết chéo, khả thi)
Mục đích : Cho phép review governance và phát hiện điểm lệch giữa spec, cấu trúc và triển khai
--- 📄 docs/ai/audits/BOUNDARY_FEASIBILITY_AUDIT.md
Nội dung : Audit về ranh giới hệ thống và tính khả thi triển khai
Mục đích : Giúp agents không thiết kế/triển khai vượt khả năng hoặc vượt scope hạ tầng
--- 📄 docs/ai/audits/CONSISTENCY_AUDIT.md
Nội dung : Audit về tính nhất quán giữa các tài liệu/quy ước
Mục đích : Phát hiện mâu thuẫn để agent sửa spec/structure trước khi code
--- 📄 docs/ai/audits/CROSS_REFERENCE_AUDIT.md
Nội dung : Audit liên kết chéo (cross-reference) giữa các tài liệu
Mục đích : Đảm bảo đường dẫn tham chiếu đúng để agents đọc theo tuyến chuẩn
--- 📄 docs/ai/audits/SCOPE_STRUCTURE_AUDIT.md
Nội dung : Audit về phạm vi và cấu trúc tài liệu/thư mục
Mục đích : Giúp hệ thống tài liệu không phình to vô tổ chức và giữ “route” rõ ràng cho AI
--- 📁 docs/ai/evidence/
Nội dung : Thư mục bằng chứng liên quan hoạt động AI (tách runtime/regression)
Mục đích : Hỗ trợ lưu lại dấu vết phục vụ debug và đánh giá chất lượng theo thời gian
--- 📁 docs/ai/evidence/regression/
Nội dung : Nhánh bằng chứng cho hồi quy trong hệ tài liệu docs/ai
Mục đích : Là chỗ tập trung khi cần tổng hợp/đính kèm bằng chứng so sánh trước-sau
--- 📁 docs/ai/evidence/runtime/
Nội dung : Nhánh bằng chứng cho runtime trong hệ tài liệu docs/ai
Mục đích : Là chỗ tập trung khi cần tổng hợp log/ảnh/biên bản chạy local phục vụ báo cáo
--- 📁 docs/ai/tasks/
Nội dung : Tài liệu tác vụ theo mã (plan/lanes/validation) trong nhánh tài liệu docs/ai
Mục đích : Cho phép con người review kế hoạch và báo cáo tác vụ theo chuẩn tài liệu
--- 📄 docs/ai/tasks/P0-000.parallel-lanes.md
Nội dung : Phân rã lanes song song cho task P0-000 (phiên bản trong docs/ai)
Mục đích : Dùng khi review/trao đổi ở tầng tài liệu thay vì làm việc trực tiếp trong .ai/
--- 📄 docs/ai/tasks/P0-000.plan.md
Nội dung : Kế hoạch P0-000 (phiên bản trong docs/ai)
Mục đích : Là bản kế hoạch dễ tiếp cận cho con người/agent khi đọc từ docs/
--- 📄 docs/ai/tasks/P0-000.validation-report.md
Nội dung : Báo cáo validation P0-000 (phiên bản trong docs/ai)
Mục đích : Là bằng chứng “đã kiểm” cho stakeholders khi xem qua thư mục docs
--- 📄 docs/ai/AGENT_HANDOFF_PROTOCOL.md
Nội dung : Quy trình handoff (bản trong docs/ai)
Mục đích : Dành cho người/agent đọc qua docs thay vì .ai/governance
--- 📄 docs/ai/ARCHITECTURE_IMMUTABLES.md
Nội dung : Kiến trúc bất biến (bản trong docs/ai)
Mục đích : Đảm bảo ràng buộc kiến trúc dễ tìm trong tài liệu chính của dự án
--- 📄 docs/ai/AI_ONBOARDING.md
Nội dung : Onboarding cho AI (bản trong docs/ai)
Mục đích : Là điểm bắt đầu phổ biến khi ai đó mở docs thay vì thư mục .ai
--- 📄 docs/ai/BROWSER_AUTOMATION_RULES.md
Nội dung : Quy tắc browser automation (bản trong docs/ai)
Mục đích : Hỗ trợ quy trình QA UI cho tác nhân AI khi đọc tài liệu dự án
--- 📄 docs/ai/CONTEXT_BUDGET.md
Nội dung : Ngân sách ngữ cảnh (bản trong docs/ai)
Mục đích : Giúp người/agent hiểu chiến lược đọc tài liệu để tránh quá tải context
--- 📄 docs/ai/CONTEXT_ROUTING_MATRIX.md
Nội dung : Ma trận điều hướng ngữ cảnh (đọc tài liệu nào cho từng nhu cầu)
Mục đích : Cho agents chọn đúng tài liệu theo tình huống mà không phải tự dò toàn repo
--- 📄 docs/ai/CURRENT_ARCHITECTURE.md
Nội dung : Mô tả kiến trúc hiện tại (bản trong docs/ai)
Mục đích : Giúp thống nhất góc nhìn kiến trúc cho cả người và AI khi đọc từ docs
--- 📄 docs/ai/DECISION_LOG.md
Nội dung : Nhật ký quyết định (bản trong docs/ai)
Mục đích : Dùng để truyền thông quyết định cho stakeholders qua hệ tài liệu dự án
--- 📄 docs/ai/EXECUTIVE_SUMMARY.md
Nội dung : Tóm tắt điều hành (high-level) về trạng thái/định hướng dự án
Mục đích : Cho người quản lý/owner nắm nhanh mà không cần đọc toàn bộ spec
--- 📄 docs/ai/FILE_OWNERSHIP_MAP.md
Nội dung : Bản đồ ownership (bản trong docs/ai)
Mục đích : Làm rõ trách nhiệm sửa đổi khi nhiều người/agent cùng tham gia
--- 📄 docs/ai/GAP_REGISTER.md
Nội dung : Danh sách gaps (bản trong docs/ai)
Mục đích : Công khai các khoảng trống cần xử lý để ưu tiên và theo dõi minh bạch
--- 📄 docs/ai/GOVERNANCE_HEALTH_REPORT.md
Nội dung : Báo cáo “sức khỏe governance” (mức tuân thủ, điểm lệch, cảnh báo)
Mục đích : Giúp đánh giá hệ thống governance cho AI có còn hiệu lực khi dự án tiến triển
--- 📄 docs/ai/INDEX.md
Nội dung : Trang chỉ mục điều hướng các tài liệu trong docs/ai
Mục đích : Là điểm vào để người/agent tìm tài liệu nhanh theo danh mục
--- 📄 docs/ai/KNOWN_FAILURE_PATTERNS.md
Nội dung : Danh sách failure patterns đã biết (bản trong docs/ai)
Mục đích : Truyền đạt bài học/rủi ro cho người/agent khi đọc docs
--- 📄 docs/ai/LOCALHOST_RUNTIME_WORKFLOW.md
Nội dung : Quy trình chạy localhost (bản trong docs/ai)
Mục đích : Chuẩn hóa thao tác chạy dev/build/test cho agents trên máy local
--- 📄 docs/ai/MIGRATION_PLAN.md
Nội dung : Kế hoạch migration (chuyển đổi cấu trúc/tech/spec theo giai đoạn)
Mục đích : Giảm rủi ro khi thay đổi lớn, giúp agent bám từng bước có kiểm soát
--- 📄 docs/ai/MVP_SCOPE.md
Nội dung : Phạm vi MVP (bản trong docs/ai)
Mục đích : Làm rõ ranh giới sản phẩm để AI không triển khai lan man ngoài mục tiêu
--- 📄 docs/ai/PHASE_PLAN.md
Nội dung : Kế hoạch phase (bản trong docs/ai)
Mục đích : Cung cấp roadmap theo giai đoạn cho cả người và agents tham chiếu
--- 📄 docs/ai/PROGRESS_CHECKLIST.md
Nội dung : Checklist tiến độ (bản trong docs/ai)
Mục đích : Theo dõi “đã làm/đang làm/chưa làm” ở mức tài liệu chung của dự án
--- 📄 docs/ai/README_SYNC_POLICY.md
Nội dung : Chính sách sync README (bản trong docs/ai)
Mục đích : Đảm bảo README dự án không lệch so với trạng thái khi agent cập nhật
--- 📄 docs/ai/ROLLBACK_POLICY.md
Nội dung : Chính sách rollback (bản trong docs/ai)
Mục đích : Cho phép người/agent tra cứu nhanh cách hoàn tác khi thay đổi gây lỗi
--- 📄 docs/ai/SPEC_DIGEST.md
Nội dung : Tóm tắt spec (bản trong docs/ai)
Mục đích : Tăng tốc onboarding và giảm chi phí đọc spec cho agents
--- 📄 docs/ai/TASK_GRAPH.md
Nội dung : Đồ thị nhiệm vụ (bản trong docs/ai)
Mục đích : Hỗ trợ phân rã và điều phối công việc multi-agent theo phụ thuộc
--- 📄 docs/ai/UI_EXPLORATION_PROTOCOL.md
Nội dung : Protocol khám phá UI (bản trong docs/ai)
Mục đích : Chuẩn hóa cách agent đi luồng UI và ghi nhận lỗi/nhận xét
--- 📄 docs/ai/VISUAL_REVIEW_CRITERIA.md
Nội dung : Tiêu chí visual review (bản trong docs/ai)
Mục đích : Đặt chuẩn thẩm mỹ và tính đúng để agent tự QA giao diện Next.js
--- 📁 docs/spec/
Nội dung : Bộ đặc tả sản phẩm/tech (spec) theo chương mục
Mục đích : Là “luật sản phẩm” để AI và dev triển khai đúng yêu cầu, đúng phạm vi
--- 📄 docs/spec/00-master-instruction.md
Nội dung : Chỉ thị tổng (master instruction) mang tính quyền lực cao nhất trong spec
Mục đích : Là “source of truth” để agents ưu tiên khi có mâu thuẫn giữa các tài liệu
--- 📄 docs/spec/01-project-overview.md
Nội dung : Tổng quan dự án (mục tiêu, bối cảnh, phạm vi khái quát)
Mục đích : Giúp agent/dev hiểu nhanh dự án nhằm định hướng triển khai nhất quán
--- 📄 docs/spec/02-tech-stack.md
Nội dung : Mô tả tech stack dự kiến (ví dụ Next.js, tooling, hạ tầng)
Mục đích : Định khung kỹ thuật để agents không tự chọn công nghệ lệch hướng
--- 📄 docs/spec/03-user-roles-permissions.md
Nội dung : Đặc tả vai trò người dùng và phân quyền
Mục đích : Là cơ sở để AI thiết kế auth, route protection và admin features đúng quyền hạn
--- 📄 docs/spec/04-features-priority.md
Nội dung : Danh sách tính năng và mức ưu tiên
Mục đích : Giúp agents lập kế hoạch triển khai theo thứ tự giá trị và tránh làm thừa
--- 📄 docs/spec/05-database-schema.md
Nội dung : Đặc tả schema dữ liệu (bảng/quan hệ/field) ở mức thiết kế
Mục đích : Dùng cho agent/dev khi dựng database, migrations và API contracts
--- 📄 docs/spec/06-app-router-structure.md
Nội dung : Đặc tả cấu trúc App Router (Next.js) và phân tầng route
Mục đích : Giữ routing/layout/loading đúng chuẩn dự án, tránh cấu trúc tùy tiện
--- 📄 docs/spec/07-ui-ux-design-system.md
Nội dung : Design system (UI/UX): typography, spacing, components, nguyên tắc giao diện
Mục đích : Cho agents triển khai UI nhất quán và review theo tiêu chuẩn đã chốt
--- 📄 docs/spec/08-lead-capture-cro.md
Nội dung : Chiến lược lead capture và CRO (tối ưu chuyển đổi)
Mục đích : Định hướng agent xây form/CTA/tracking đúng mục tiêu kinh doanh
--- 📄 docs/spec/09-seo-strategy.md
Nội dung : Chiến lược SEO (nội dung, kỹ thuật, cấu trúc trang)
Mục đích : Giúp agents triển khai metadata, nội dung, và cấu trúc tối ưu tìm kiếm
--- 📄 docs/spec/10-admin-dashboard.md
Nội dung : Đặc tả dashboard quản trị (màn hình, chức năng, luồng)
Mục đích : Là blueprint để agent xây admin area đúng nhu cầu vận hành
--- 📄 docs/spec/11-performance.md
Nội dung : Yêu cầu/chiến lược hiệu năng (perf budgets, tối ưu)
Mục đích : Đặt chuẩn để agent không đánh đổi UX bằng UI nặng hoặc data fetching sai
--- 📄 docs/spec/12-analytics-tracking.md
Nội dung : Đặc tả analytics/tracking (sự kiện, công cụ, quy ước đặt tên)
Mục đích : Cho agents cài tracking đúng, phục vụ đo lường sản phẩm và CRO
--- 📄 docs/spec/13-privacy-legal.md
Nội dung : Yêu cầu privacy/pháp lý (cookie, lưu dữ liệu, consent)
Mục đích : Giảm rủi ro pháp lý khi agent tích hợp analytics, forms và lưu dữ liệu người dùng
--- 📄 docs/spec/14-schema-markup.md
Nội dung : Quy ước schema markup (structured data cho SEO)
Mục đích : Hướng dẫn agent triển khai JSON-LD/structured data đúng chuẩn SEO
--- 📄 docs/spec/15-content-governance.md
Nội dung : Governance cho nội dung (ai viết, kiểm duyệt, quy tắc cập nhật)
Mục đích : Giữ nội dung nhất quán và giảm sai lệch khi AI tạo/sửa copy
--- 📄 docs/spec/16-scoring-quality-gate.md
Nội dung : Hệ chấm điểm và quality gate (tiêu chí đánh giá đầu ra)
Mục đích : Cho phép đánh giá định lượng chất lượng khi AI hoàn thành hạng mục
--- 📄 docs/spec/website-structure.md
Nội dung : Đặc tả cấu trúc website (sitemap, nhóm trang, luồng điều hướng)
Mục đích : Là cơ sở để agent dựng IA và routing phù hợp mục tiêu sản phẩm/SEO
--- 📄 .env.example
Nội dung : Mẫu biến môi trường (template) để copy sang file local
Mục đích : Giúp dev/agent biết cần cấu hình gì khi chạy Next.js mà không lộ secrets
--- 📄 .env.local
Nội dung : Biến môi trường local, chứa secrets — không commit
Mục đích : Dùng khi chạy local/dev để cung cấp key/token; tránh đưa secrets lên Git
--- 📄 HANDOFF.md
Nội dung : Tài liệu bàn giao nhanh (tóm tắt dự án, trạng thái, cách tiếp tục)
Mục đích : Giúp đổi máy/tài khoản/nhân sự mà vẫn tiếp tục làm việc với AI/dev ngay
--- 📄 README.md
Nội dung : README dự án (tên dự án, mục tiêu, trạng thái, link tài liệu quan trọng)
Mục đích : Là điểm vào cho người và agent khi mở repo lần đầu để biết “đọc gì tiếp theo”
--- 📄 Cautruc_thumuc.md
Nội dung : Snapshot cây thư mục của dự án dưới dạng ASCII tree
Mục đích : Giúp người/agent nhìn nhanh cấu trúc repo để định tuyến đọc tài liệu và đặt file đúng chỗ
