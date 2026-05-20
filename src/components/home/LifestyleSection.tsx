import Link from 'next/link'
import { AbstractPlaceholder } from '@/components/ui/AbstractPlaceholder'

// 07 §2.1: 3 story cards, editorial lifestyle
// No stock photos with foreign logos — using AbstractPlaceholder until real assets approved

const LIFESTYLE_CARDS = [
  {
    category: 'Gia đình' as const,
    headline: 'Không gian sống cân bằng',
    subCopy: 'Thiết kế đô thị lấy gia đình làm trung tâm',
    category_label: 'Gia đình',
  },
  {
    category: 'Sống xanh' as const,
    headline: 'Hạ tầng xanh trong lòng đô thị',
    subCopy: 'Mảng xanh quy hoạch tích hợp toàn khu',
    category_label: 'Sống xanh',
  },
  {
    category: 'Cộng đồng' as const,
    headline: 'Cộng đồng cư dân chất lượng',
    subCopy: 'Không gian kết nối và sinh hoạt cộng đồng',
    category_label: 'Cộng đồng',
  },
]

export function LifestyleSection() {
  return (
    <section className="section-padding bg-[var(--color-surface)]" aria-labelledby="lifestyle-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 id="lifestyle-heading" className="font-display text-3xl font-semibold text-[var(--color-brand-secondary)] sm:text-4xl">
            Phong cách sống
          </h2>
          <Link href="/phong-cach-song" className="text-sm text-[var(--color-brand-primary)] hover:underline">
            Xem thêm
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {LIFESTYLE_CARDS.map((card) => (
            <Link
              key={card.headline}
              href="/phong-cach-song"
              className="group overflow-hidden rounded-2xl border border-[var(--color-border)] transition-all duration-[var(--duration-base)] hover:shadow-lg"
            >
              <AbstractPlaceholder
                aspectRatio="3/2"
                label="Ảnh thực tế đang được cập nhật"
                category="lifestyle"
              />
              <div className="p-5">
                <span className="mb-2 inline-block rounded-full bg-[var(--color-brand-primary)]/10 px-3 py-0.5 text-xs font-medium text-[var(--color-brand-primary)]">
                  {card.category_label}
                </span>
                <p className="mb-1 font-semibold text-[var(--color-brand-secondary)] group-hover:text-[var(--color-brand-primary)]">
                  {card.headline}
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">{card.subCopy}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
