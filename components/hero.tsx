import { FilledCard } from '@/components/filled-card';
import { MatrixRain } from '@/components/matrix-rain';
import type { ArticleListItem } from '@/lib/blog';
import { getTagLabel } from '@/lib/tags';

type HeroProps = {
  latest?: ArticleListItem;
  articles: ArticleListItem[];
};

function toArticleTags(tags: string[]) {
  return tags.map((tag) => ({
    href: `/blog?tag=${tag}`,
    label: getTagLabel(tag),
  }));
}

export function Hero({ latest, articles }: HeroProps) {
  return (
    <section
      aria-label="Artigos recentes"
      className="hero-surface relative isolate flex min-h-[32rem] w-full items-center overflow-hidden"
    >
      <MatrixRain />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 md:py-12">
        {latest ? (
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10">
            <div className="overflow-hidden rounded-md bg-surface-container text-on-surface">
              <FilledCard
                href={`/blog/${latest.slug}`}
                image={latest.image}
                tags={toArticleTags(latest.tags)}
                flushMedia
              >
                <h1 className="md-typescale-headline-large text-pretty text-on-surface">
                  {latest.title}
                </h1>
                {latest.summary ? (
                  <p className="md-typescale-body-medium mt-4 line-clamp-3 text-on-surface-variant">
                    {latest.summary}
                  </p>
                ) : null}
              </FilledCard>
            </div>

            {articles.length > 0 ? (
              <ul className="flex flex-col gap-6 md:gap-4">
                {articles.map((article) => (
                  <li
                    key={article.slug}
                    className="overflow-hidden rounded-md bg-surface-container text-on-surface"
                  >
                    <FilledCard
                      href={`/blog/${article.slug}`}
                      image={article.image}
                      tags={toArticleTags(article.tags)}
                      orientation="horizontal"
                    >
                      <h2 className="md-typescale-title-large text-pretty text-on-surface">
                        {article.title}
                      </h2>
                      {article.summary ? (
                        <p className="md-typescale-body-medium mt-4 line-clamp-3 text-on-surface-variant md:mt-2 md:line-clamp-2">
                          {article.summary}
                        </p>
                      ) : null}
                    </FilledCard>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <p className="md-typescale-body-large text-on-primary-container">
            Nenhum artigo publicado.
          </p>
        )}
      </div>
    </section>
  );
}
