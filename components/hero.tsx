import { ExternalLinkBadge } from '@/components/external-link-badge';
import { FilledCard } from '@/components/filled-card';
import { MatrixRain } from '@/components/matrix-rain';
import { ScrollToButton } from '@/components/scroll-to-button';
import { getArticleHref, type ArticleListItem } from '@/lib/blog';
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
      className="hero-surface relative isolate flex w-full flex-col overflow-hidden"
    >
      <MatrixRain />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 md:py-12">
        {latest ? (
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-10">
            <div className="overflow-hidden rounded-md bg-surface-container text-on-surface">
              <FilledCard
                href={getArticleHref(latest)}
                external={latest.external}
                image={latest.image}
                tags={toArticleTags(latest.tags)}
                flushMedia
              >
                <h1 className="md-typescale-headline-large md-typescale-title-large-sm text-pretty text-on-surface">
                  {latest.title}{' '}
                  {latest.external ? <ExternalLinkBadge /> : null}
                </h1>
                {latest.summary ? (
                  <p className="md-typescale-body-medium mt-4 line-clamp-3 text-on-surface-variant">
                    {latest.summary}
                  </p>
                ) : null}
              </FilledCard>
            </div>

            <div className="flex flex-col gap-6 md:gap-4">
              {articles.length > 0 ? (
                <ul className="flex flex-col gap-6 md:gap-4">
                  {articles.map((article) => (
                    <li
                      key={article.slug}
                      className="overflow-hidden rounded-md bg-surface-container text-on-surface"
                    >
                      <FilledCard
                        href={getArticleHref(article)}
                        external={article.external}
                        image={article.image}
                        tags={toArticleTags(article.tags)}
                        orientation="horizontal"
                      >
                        <h2 className="md-typescale-title-large text-pretty text-on-surface">
                          {article.title}{' '}
                          {article.external ? <ExternalLinkBadge /> : null}
                        </h2>
                        {article.summary ? (
                          <p className="md-typescale-body-medium mt-4 line-clamp-3 text-on-surface-variant md:hidden">
                            {article.summary}
                          </p>
                        ) : null}
                      </FilledCard>
                    </li>
                  ))}
                </ul>
              ) : null}
              <nav
                aria-label="Continuar na página"
                className="hidden shrink-0 grid-cols-2 gap-3 md:grid"
              >
                <ScrollToButton targetId="intro">Sobre mim</ScrollToButton>
                <ScrollToButton targetId="artigos">Mais artigos</ScrollToButton>
              </nav>
            </div>
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
