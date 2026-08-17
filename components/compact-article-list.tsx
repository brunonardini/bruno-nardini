import { ExternalLinkBadge } from '@/components/external-link-badge';
import { FilledCard } from '@/components/filled-card';
import { getArticleHref, type ArticleListItem } from '@/lib/blog';
import { getTagLabel } from '@/lib/tags';

type CompactArticleListProps = {
  articles: ArticleListItem[];
  tagHref?: (tag: string) => string;
  columns?: 1 | 2;
  showSummary?: boolean;
};

export function CompactArticleList({
  articles,
  tagHref = (tag) => `/blog?tag=${tag}`,
  columns = 1,
  showSummary = false,
}: CompactArticleListProps) {
  return (
    <ul
      className={
        columns === 2
          ? 'grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6'
          : 'flex flex-col gap-6 md:gap-4'
      }
    >
      {articles.map((article) => (
        <li
          key={article.slug}
          className="overflow-hidden rounded-md bg-surface-container text-on-surface"
        >
          <FilledCard
            href={getArticleHref(article)}
            external={article.external}
            image={article.image}
            tags={article.tags.map((tag) => ({
              href: tagHref(tag),
              label: getTagLabel(tag),
            }))}
            orientation="horizontal"
          >
            <h2 className="md-typescale-title-large text-pretty text-on-surface">
              <span
                className={
                  article.external ? 'md-external-link-title' : undefined
                }
              >
                {article.title}
              </span>
              {article.external ? <ExternalLinkBadge /> : null}
            </h2>
            {article.summary ? (
              <p
                className={`md-typescale-body-medium mt-4 line-clamp-3 text-on-surface-variant ${
                  showSummary ? '' : 'md:hidden'
                }`}
              >
                {article.summary}
              </p>
            ) : null}
          </FilledCard>
        </li>
      ))}
    </ul>
  );
}
