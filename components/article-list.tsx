import { FilledCard } from '@/components/filled-card';
import type { ArticleListItem } from '@/lib/blog';
import { getTagLabel } from '@/lib/tags';

type ArticleListProps = {
  articles: ArticleListItem[];
  tagHref?: (tag: string) => string;
};

export function ArticleList({
  articles,
  tagHref = (tag) => `/blog?tag=${tag}`,
}: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className="md-typescale-body-large text-on-surface-variant">
        Nenhum artigo publicado.
      </p>
    );
  }

  return (
    <ul
      key={articles.map((article) => article.slug).join('|')}
      className="article-list grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14"
      data-phase="enter"
    >
      {articles.map((article, index) => (
        <li
          key={article.slug}
          className="article-list-item"
          style={{
            ['--article-list-index' as string]: Math.min(index, 5),
          }}
        >
          <FilledCard
            href={`/blog/${article.slug}`}
            image={article.image}
            tags={article.tags.map((tag) => ({
              href: tagHref(tag),
              label: getTagLabel(tag),
            }))}
          >
            <h2 className="md-typescale-headline-large md-typescale-title-large-sm text-pretty text-on-surface">
              {article.title}
            </h2>
            {article.summary ? (
              <p className="md-typescale-body-medium mt-4 line-clamp-3 text-on-surface-variant">
                {article.summary}
              </p>
            ) : null}
          </FilledCard>
        </li>
      ))}
    </ul>
  );
}
