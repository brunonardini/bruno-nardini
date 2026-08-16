import { ArticleList } from '@/components/article-list';
import { BlogSidebar } from '@/components/blog-sidebar';
import { getArticles } from '@/lib/blog';
import {
  buildBlogHref,
  matchesBlogQuery,
  readSourceParam,
} from '@/lib/blog-query';
import { getTagLabel, readTagParam } from '@/lib/tags';
import type { Metadata } from 'next';

type BlogPageProps = {
  searchParams: Promise<{
    tag?: string | string[];
    source?: string | string[];
  }>;
};

const SOURCE_LABELS = {
  internal: 'No Blog',
  external: 'Externo',
} as const;

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const tag = readTagParam(params);
  const source = readSourceParam(params);
  const parts = [
    tag ? getTagLabel(tag) : undefined,
    source ? SOURCE_LABELS[source] : undefined,
  ].filter(Boolean);

  return {
    title: parts.length
      ? `${parts.join(' · ')} | Bruno Nardini Blog`
      : 'Artigos | Bruno Nardini Blog',
    description: 'Todos os artigos sobre desenvolvimento web e tecnologia',
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const activeTag = readTagParam(params);
  const activeSource = readSourceParam(params);
  const articles = await getArticles();
  const visibleArticles = articles.filter((article) =>
    matchesBlogQuery(article, { tag: activeTag, source: activeSource }),
  );

  return (
    <main className="bg-surface text-on-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <BlogSidebar activeTag={activeTag} activeSource={activeSource} />
          <div className="min-w-0 flex-1">
            <ArticleList
              articles={visibleArticles}
              tagHref={(tag) => buildBlogHref({ tag, source: activeSource })}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
