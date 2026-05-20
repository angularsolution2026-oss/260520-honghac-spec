# G4 — Seed Data Pack

**Status:** Draft v1 — demo fixtures cho `NEXT_PUBLIC_RUN_MODE=local-demo`
**Authority:** [17 §3, §8](../../docs/spec/17-launch-data-readiness.md)

> ⚠️ **Quan trọng:** Mọi file `*.demo.json` là **demo/test data**, không được dùng cho `production` mà không thay bằng data Tier 1 đã approve. Xem [17 §2](../../docs/spec/17-launch-data-readiness.md).

## Files

| File | Mục đích | SSOT thật trong production |
|---|---|---|
| `inventory-lots.demo.json` | Lô đất Hồng Phát | Payload CMS `inventory_lots` |
| `phases.demo.json` | Phase mở bán | Payload CMS `phases` |
| `progress.demo.json` | Mốc tiến độ | Payload CMS `progress` |
| `media-assets.demo.json` | Media + approval | Payload CMS `media` |
| `authors.demo.json` | Author E-E-A-T | Payload CMS `authors` |
| `tier-sources.demo.json` | Fact Ledger | Embedded trong articles |
| `bank-rates.demo.json` | Lãi suất band | Firestore `bank_rates` |
| `admin-users.demo.json` | Test admin/sales | Firebase Auth + Firestore |
| `lead-test-data.demo.json` | Test leads | Firestore `leads` |

## Cách dùng

```typescript
if (process.env.NEXT_PUBLIC_RUN_MODE !== 'production') {
  // Load demo fixture
  const lots = await import('@/data/seeds/inventory-lots.demo.json');
}
```

UI bắt buộc hiển thị banner "Đang ở chế độ demo" khi `RUN_MODE !== 'production'`.

## To replace before production

- [ ] `inventory-lots`: cần Tier 1 verified lots từ CĐT
- [ ] `phases`: cần Tier 1 phase data
- [ ] `progress`: cần Tier 1 hoặc Tier 3 cited progress
- [ ] `media-assets`: cần real images với `approvalStatus = approvedForPublic`
- [ ] `authors`: Ngô Kim Quyên với ảnh thật + LinkedIn URL
- [ ] `tier-sources`: Fact Ledger thật từ CMS
- [ ] `bank-rates`: live rates từ ngân hàng reviewed
- [ ] `admin-users`: production admins với 2FA
- [ ] `lead-test-data`: KHÔNG dùng trong production
