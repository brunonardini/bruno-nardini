import { ArticleList } from '@/components/article-list';
import { BlogSidebar } from '@/components/blog-sidebar';
import { getArticles } from '@/lib/blog';
import { getTagLabel, readTagParam } from '@/lib/tags';
import type { Metadata } from 'next';

type BlogPageProps = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const tag = readTagParam(await searchParams);
  const label = tag ? getTagLabel(tag) : undefined;

  return {
    title: label
      ? `${label} | Bruno Nardini Blog`
      : 'Artigos | Bruno Nardini Blog',
    description: 'Todos os artigos sobre desenvolvimento web e tecnologia',
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const activeTag = readTagParam(await searchParams);
  const articles = await getArticles();
  const visibleArticles = activeTag
    ? articles.filter((article) => article.tags.includes(activeTag))
    : articles;

  return (
    <main className="bg-surface text-on-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <BlogSidebar activeTag={activeTag} />
          <div className="min-w-0 flex-1">
            <ArticleList articles={visibleArticles} />
          </div>
        </div>
      </div>
    </main>
  );
}
