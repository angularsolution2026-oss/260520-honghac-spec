// AbstractPlaceholder — 07 §12
// Used until real assets have approvalStatus = approvedForPublic

interface AbstractPlaceholderProps {
  aspectRatio: '16/9' | '4/3' | '1/1' | '3/2'
  label?: string
  category?: 'urban' | 'lifestyle' | 'infrastructure' | 'interior'
}

const CATEGORY_GRADIENTS: Record<NonNullable<AbstractPlaceholderProps['category']>, string> = {
  urban: 'from-[#1C2B3A] to-[#2D4260]',
  lifestyle: 'from-[#2D4260] to-[#1C2B3A]',
  infrastructure: 'from-[#1C2B3A] to-[#0F1A24]',
  interior: 'from-[#2D3748] to-[#1A202C]',
}

const ASPECT_CLASSES: Record<AbstractPlaceholderProps['aspectRatio'], string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
}

export function AbstractPlaceholder({
  aspectRatio,
  label = 'Ảnh thực tế đang được cập nhật',
  category = 'urban',
}: AbstractPlaceholderProps) {
  const gradient = CATEGORY_GRADIENTS[category]
  const aspect = ASPECT_CLASSES[aspectRatio]

  return (
    <div
      className={`${aspect} relative w-full overflow-hidden bg-gradient-to-br ${gradient}`}
      role="img"
      aria-label={label}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <svg
          className="h-8 w-8 text-[var(--color-brand-primary)] opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs text-white/40">{label}</p>
      </div>
    </div>
  )
}
