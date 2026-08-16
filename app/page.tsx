import { ArticleList } from '@/components/article-list';
import { OutlinedButton } from '@/components/outlined-button';
import { Hero } from '@/components/hero';
import { Intro } from '@/components/intro';
import { TagFilters } from '@/components/tag-filters';
import { getArticles } from '@/lib/blog';
import { readTagParam } from '@/lib/tags';

type HomePageProps = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const activeTag = readTagParam(await searchParams);
  const articles = await getArticles();
  const [latest, ...more] = articles;
  const visibleArticles = (
    activeTag
      ? articles.filter((article) => article.tags.includes(activeTag))
      : articles
  ).slice(0, 8);

  return (
    <main>
      <Hero latest={latest} articles={more.slice(0, 3)} />
      <Intro />
      <section aria-label="Artigos" className="bg-surface text-on-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:py-16">
          <TagFilters
            activeTag={activeTag}
            allHref="/"
            tagHref={(slug) => `/?tag=${slug}`}
          />
          <ArticleList
            articles={visibleArticles}
            tagHref={(tag) => `/?tag=${tag}`}
          />
          <div className="flex justify-center">
            <OutlinedButton
              href={activeTag ? `/blog?tag=${activeTag}` : '/blog'}
              size="large"
            >
              Ver todos os artigos
            </OutlinedButton>
          </div>
        </div>
      </section>
    </main>
  );
}
