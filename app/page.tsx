import { ArticleList } from '@/components/article-list';
import { OutlinedButton } from '@/components/outlined-button';
import { Hero } from '@/components/hero';
import { Intro } from '@/components/intro';
import { SourceFilter } from '@/components/source-filter';
import { TagFilters } from '@/components/tag-filters';
import { getArticles } from '@/lib/blog';
import {
  buildBlogHref,
  buildHomeHref,
  matchesBlogQuery,
  readSourceParam,
} from '@/lib/blog-query';
import { readTagParam } from '@/lib/tags';

type HomePageProps = {
  searchParams: Promise<{
    tag?: string | string[];
    source?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const activeTag = readTagParam(params);
  const activeSource = readSourceParam(params);
  const articles = await getArticles();
  const [latest, ...more] = articles;
  const visibleArticles = articles
    .filter((article) =>
      matchesBlogQuery(article, { tag: activeTag, source: activeSource }),
    )
    .slice(0, 8);

  return (
    <main>
      <Hero latest={latest} articles={more.slice(0, 3)} />
      <Intro />
      <section
        aria-labelledby="artigos-title"
        className="bg-surface text-on-surface"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:py-16">
          <div id="artigos" className="scroll-target flex flex-col gap-8">
            <div>
              <h2
                id="artigos-title"
                className="md-typescale-display-small text-pretty text-on-surface"
              >
                Explore os artigos
              </h2>
              <p className="md-typescale-body-large mt-4 text-pretty text-on-surface">
                Ideias, experiências e aprendizados sobre engenharia de
                software, tecnologia e carreira.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
              <div className="min-w-0 flex-1">
                <TagFilters
                  activeTag={activeTag}
                  allHref={buildHomeHref({ source: activeSource })}
                  tagHref={(slug) =>
                    buildHomeHref({ tag: slug, source: activeSource })
                  }
                />
              </div>
              <div className="w-full shrink-0 md:w-72">
                <SourceFilter
                  activeSource={activeSource}
                  href={(source) => buildHomeHref({ tag: activeTag, source })}
                />
              </div>
            </div>
          </div>
          <ArticleList
            articles={visibleArticles}
            tagHref={(tag) => buildHomeHref({ tag, source: activeSource })}
          />
          <div className="flex justify-center">
            <OutlinedButton
              href={buildBlogHref({ tag: activeTag, source: activeSource })}
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
