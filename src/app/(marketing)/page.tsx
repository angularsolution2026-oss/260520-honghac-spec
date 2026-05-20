import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { DecisionPaths } from '@/components/home/DecisionPaths'
import { SourceTrustBand } from '@/components/home/SourceTrustBand'
import { CurrentReleaseSection } from '@/components/home/CurrentReleaseSection'
import { UrbanIntelligencePreview } from '@/components/home/UrbanIntelligencePreview'
import { DecisionSupportSection } from '@/components/home/DecisionSupportSection'
import { ProgressAndSignalPreview } from '@/components/home/ProgressAndSignalPreview'
import { LifestyleSection } from '@/components/home/LifestyleSection'
import { LeadMagnetSection } from '@/components/home/LeadMagnetSection'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'
import { WebSiteSchema } from '@/components/seo/schemas/WebSiteSchema'
import { OrganizationSchema } from '@/components/seo/schemas/OrganizationSchema'

export const metadata: Metadata = {
  title: 'Khám phá Sa bàn đô thị Hồng Hạc City Bắc Ninh',
  description:
    'Nền tảng thông tin tư vấn bất động sản độc lập tại Hồng Hạc City, Bắc Ninh. Khám phá sa bàn tương tác 197ha, phân tích hạ tầng, pháp lý và tiềm năng tăng trưởng.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />
      <OrganizationSchema />
      <HeroSection />
      <DecisionPaths />
      <SourceTrustBand />
      <CurrentReleaseSection />
      <UrbanIntelligencePreview />
      <DecisionSupportSection />
      <ProgressAndSignalPreview />
      <LifestyleSection />
      <LeadMagnetSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
