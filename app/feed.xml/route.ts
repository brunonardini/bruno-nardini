import { getArticles } from '@/lib/blog';
import { buildRssXml } from '@/lib/rss';

export const dynamic = 'force-static';

export async function GET() {
  const articles = await getArticles();
  const xml = buildRssXml(articles);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
