import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyZaloButton } from '@/components/layout/StickyZaloButton'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <StickyZaloButton />
    </>
  )
}
