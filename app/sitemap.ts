import { getArticles } from '@/lib/blog';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://brunonardini.com.br';

function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).href;
}

function toLastModified(publishedAt: string) {
  return new Date(`${publishedAt}T00:00:00.000Z`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await getArticles()).filter((article) => !article.external);
  const latestPublishedAt = articles[0]?.publishedAt;
  const latestModified = latestPublishedAt
    ? toLastModified(latestPublishedAt)
    : new Date();

  return [
    {
      url: toAbsoluteUrl('/'),
      lastModified: latestModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/blog'),
      lastModified: latestModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: toAbsoluteUrl('/busca'),
      lastModified: latestModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...articles.map((article) => ({
      url: toAbsoluteUrl(`/blog/${article.slug}`),
      lastModified: toLastModified(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      ...(article.image ? { images: [toAbsoluteUrl(article.image)] } : {}),
    })),
  ];
}
