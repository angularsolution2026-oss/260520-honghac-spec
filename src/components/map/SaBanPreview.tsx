import Link from 'next/link'

// Sprint 1A: Static preview shell — NO maplibre-gl import per 00 §5.3 + 02 §2
// Sprint 1B: will swap for dynamic import SaBanMap with ssr:false

export function SaBanPreview() {
  return (
    <Link
      href="/sa-ban"
      aria-label="Xem sa bàn tương tác đầy đủ"
      className="group relative block w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-brand-secondary-dark)] shadow-2xl transition-transform duration-[var(--duration-base)] hover:scale-[1.01]"
    >
      {/* Aspect ratio container */}
      <div className="relative aspect-[4/3]">
        {/* Simulated map grid — urban planning aesthetic */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 400 300"
          fill="none"
          aria-hidden="true"
        >
          {/* Grid lines */}
          {Array.from({ length: 10 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 30}
              x2="400"
              y2={i * 30}
              stroke="#B5893A"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 30}
              y1="0"
              x2={i * 30}
              y2="300"
              stroke="#B5893A"
              strokeWidth="0.5"
            />
          ))}
          {/* Lot blocks representing phan khu */}
          <rect x="40" y="40" width="100" height="80" rx="4" fill="#22C55E" opacity="0.6" />
          <rect x="150" y="40" width="80" height="80" rx="4" fill="#EAB308" opacity="0.5" />
          <rect x="240" y="40" width="100" height="80" rx="4" fill="#F97316" opacity="0.4" />
          <rect x="40" y="140" width="60" height="60" rx="4" fill="#22C55E" opacity="0.5" />
          <rect x="110" y="140" width="80" height="60" rx="4" fill="#6B7280" opacity="0.5" />
          <rect x="200" y="140" width="60" height="60" rx="4" fill="#22C55E" opacity="0.6" />
          <rect x="270" y="140" width="90" height="60" rx="4" fill="#EAB308" opacity="0.4" />
          {/* Roads */}
          <rect x="0" y="128" width="400" height="6" fill="#1C2B3A" opacity="0.8" />
          <rect x="192" y="0" width="6" height="300" fill="#1C2B3A" opacity="0.8" />
        </svg>

        {/* Status legend */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1">
          {[
            { color: 'bg-[#22C55E]', label: 'Còn hàng' },
            { color: 'bg-[#EAB308]', label: 'Đang giữ chỗ' },
            { color: 'bg-[#F97316]', label: 'Đặt cọc' },
            { color: 'bg-[#6B7280]', label: 'Đã bán' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`inline-block h-2.5 w-2.5 rounded-sm ${color}`} />
              <span className="text-xs text-white/60">{label}</span>
            </div>
          ))}
        </div>

        {/* Overlay CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-brand-secondary)]/40 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-base)] group-hover:opacity-100">
          <p className="font-display text-xl font-semibold text-white">
            Xem trên bản đồ tương tác
          </p>
          <p className="mt-1 text-sm text-white/70">197ha · 3 phân khu · Real-time</p>
        </div>
      </div>

      {/* Caption */}
      <div className="border-t border-white/10 px-4 py-3">
        <p className="text-sm font-medium text-white">Sa bàn Hồng Hạc City</p>
        <p className="text-xs text-white/50">Phân khu Hồng Phát · Đang mở bán</p>
      </div>
    </Link>
  )
}
