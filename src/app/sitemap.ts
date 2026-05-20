import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bacninhhonghaccity.vn'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core routes — sitemap-core per 06 §5.4
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/sa-ban`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/kham-pha-do-thi`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/tiem-nang`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/tien-do`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/phong-cach-song`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/phap-ly`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/bang-gia`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/vay-mua`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/tu-van`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/lien-he`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Compliance routes
  const complianceRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/chinh-sach-bao-mat`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/yeu-cau-du-lieu`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Cluster — phan khu (only active ones)
  const clusterRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/phan-khu/hong-phat`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Sprint 1A: author E-E-A-T
  const authorRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/tu-van/ngo-kim-quyen`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // DO NOT include: /portals/*, /broker/*, /api/*
  // DO NOT include noindex routes
  return [...coreRoutes, ...complianceRoutes, ...clusterRoutes, ...authorRoutes]
}
