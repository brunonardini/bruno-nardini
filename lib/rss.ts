import { getArticleHref, type ArticleListItem } from '@/lib/blog';
import { getTagLabel } from '@/lib/tags';

const SITE_URL = 'https://brunonardini.com.br';
const SITE_TITLE = 'Bruno Nardini';
const SITE_DESCRIPTION =
  'Artigos, experiências e aprendizados sobre engenharia de software, arquitetura, IA, DevOps, carreira e liderança técnica.';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toAbsoluteUrl(pathnameOrUrl: string) {
  return new URL(pathnameOrUrl, SITE_URL).href;
}

function toRfc822(publishedAt: string) {
  return new Date(`${publishedAt}T00:00:00.000Z`).toUTCString();
}

function itemXml(article: ArticleListItem) {
  const url = toAbsoluteUrl(getArticleHref(article));
  const categories = article.tags
    .map((tag) => `      <category>${escapeXml(getTagLabel(tag))}</category>`)
    .join('\n');

  return [
    '    <item>',
    `      <title>${escapeXml(article.title)}</title>`,
    `      <link>${escapeXml(url)}</link>`,
    `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
    `      <pubDate>${toRfc822(article.publishedAt)}</pubDate>`,
    article.summary
      ? `      <description>${escapeXml(article.summary)}</description>`
      : null,
    categories || null,
    '    </item>',
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildRssXml(articles: ArticleListItem[]) {
  const latest = articles[0]?.publishedAt
    ? toRfc822(articles[0].publishedAt)
    : new Date().toUTCString();
  const feedUrl = toAbsoluteUrl('/feed.xml');
  const blogUrl = toAbsoluteUrl('/blog');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${articles.map(itemXml).join('\n')}
  </channel>
</rss>
`;
}
