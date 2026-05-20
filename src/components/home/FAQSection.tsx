'use client'

import { useState } from 'react'
import { FAQSchema } from '@/components/seo/schemas/FAQSchema'

const FAQS = [
  {
    q: 'Website này có phải trang chính thức của chủ đầu tư không?',
    a: 'Không. Đây là nền tảng thông tin tư vấn bất động sản độc lập. Trang chính thức của chủ đầu tư là honghacphumyhung.vn. Mọi thông tin cần được đối chiếu với nguồn chính thức trước khi ra quyết định.',
  },
  {
    q: 'Thông tin giá có chính xác không?',
    a: 'Thông tin giá trên nền tảng mang tính tham khảo. Giá thực tế phụ thuộc vào giai đoạn mở bán và chính sách của chủ đầu tư. Liên hệ để nhận thông tin giá phù hợp với giai đoạn hiện tại.',
  },
  {
    q: 'Pháp lý dự án ra sao?',
    a: 'Thông tin pháp lý đang được xác minh từ nguồn chính thức. Chúng tôi chỉ công bố thông tin có nguồn Tier 1 (văn bản nhà nước) hoặc Tier 3 (báo chí uy tín). Xem chi tiết tại trang Pháp lý.',
  },
  {
    q: 'Tiến độ xây dựng hiện tại thế nào?',
    a: 'Tiến độ đang được cập nhật từ nguồn chính thức. Đăng ký nhận thông báo mới nhất để theo dõi tiến độ theo thời gian thực.',
  },
  {
    q: 'Tôi có thể đặt cọc qua website này không?',
    a: 'Không. Nền tảng này chỉ cung cấp thông tin tư vấn. Mọi giao dịch cần thực hiện trực tiếp với chủ đầu tư hoặc đại lý được ủy quyền, có đầy đủ hợp đồng pháp lý.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding bg-[var(--color-surface-elevated)]" aria-labelledby="faq-heading">
      <FAQSchema faqs={FAQS} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 id="faq-heading" className="mb-10 font-display text-3xl font-semibold text-[var(--color-brand-secondary)] sm:text-4xl">
          Câu hỏi thường gặp
        </h2>

        <dl className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <dt>
                <button
                  type="button"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-[var(--color-brand-secondary)]"
                >
                  {faq.q}
                  <svg
                    className={`h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-fast)] ${openIndex === i ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </dt>
              <dd
                id={`faq-answer-${i}`}
                className={`px-5 text-sm text-[var(--color-text-secondary)] transition-all duration-[var(--duration-base)] ${
                  openIndex === i ? 'pb-4 pt-0' : 'hidden'
                }`}
              >
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
