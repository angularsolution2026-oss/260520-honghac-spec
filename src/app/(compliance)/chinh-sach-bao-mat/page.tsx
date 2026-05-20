import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật — Hồng Hạc City',
  description: 'Chính sách bảo mật và quyền riêng tư của nền tảng tư vấn Hồng Hạc City.',
  alternates: { canonical: '/chinh-sach-bao-mat' },
}

export default function ChinhSachBaoMatPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Chính sách bảo mật
        </h1>
        <div className="prose max-w-none text-[var(--color-text-secondary)]">
          <p className="mb-4">
            Nền tảng này thu thập thông tin liên hệ (số điện thoại hoặc email)
            khi bạn gửi yêu cầu tư vấn, nhằm mục đích liên lạc và hỗ trợ bạn
            ra quyết định về bất động sản.
          </p>
          <h2 className="mb-3 mt-6 text-xl font-semibold text-[var(--color-text-primary)]">
            Dữ liệu thu thập
          </h2>
          <ul className="mb-4 list-inside list-disc space-y-1">
            <li>Số điện thoại hoặc địa chỉ email (tùy chọn)</li>
            <li>Họ tên (không bắt buộc)</li>
            <li>Nội dung yêu cầu tư vấn</li>
            <li>UTM source/medium/campaign (ẩn danh)</li>
          </ul>
          <h2 className="mb-3 mt-6 text-xl font-semibold text-[var(--color-text-primary)]">
            Mục đích sử dụng
          </h2>
          <p className="mb-4">
            Dữ liệu chỉ dùng để liên hệ tư vấn bất động sản theo yêu cầu của
            bạn. Chúng tôi không chia sẻ dữ liệu cá nhân với bên thứ ba cho
            mục đích marketing mà không có sự đồng ý rõ ràng.
          </p>
          <h2 className="mb-3 mt-6 text-xl font-semibold text-[var(--color-text-primary)]">
            Quyền của bạn
          </h2>
          <p className="mb-4">
            Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu cá nhân.
            Gửi yêu cầu qua trang{' '}
            <a href="/yeu-cau-du-lieu" className="text-[var(--color-brand-primary)] underline">
              Yêu cầu dữ liệu (DSAR)
            </a>
            .
          </p>
          <p className="mt-8 text-sm text-[var(--color-text-muted)]">
            Cập nhật lần cuối: tháng 5/2026
          </p>
        </div>
      </div>
    </div>
  )
}
