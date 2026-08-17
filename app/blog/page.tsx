import { ArticleList } from '@/components/article-list';
import { BlogSidebar } from '@/components/blog-sidebar';
import { ScrollToTopOnMount } from '@/components/scroll-to-top-on-mount';
import { getArticles } from '@/lib/blog';
import {
  buildBlogHref,
  matchesBlogQuery,
  readSourceParam,
} from '@/lib/blog-query';
import { readTagParam } from '@/lib/tags';

type BlogPageProps = {
  searchParams: Promise<{
    tag?: string | string[];
    source?: string | string[];
  }>;
};

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
      <ScrollToTopOnMount />
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
