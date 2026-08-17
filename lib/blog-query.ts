export type ArticleSource = 'internal' | 'external';

export type BlogQuery = {
  tag?: string;
  source?: ArticleSource;
};

const ARTICLE_SOURCES = new Set<ArticleSource>(['internal', 'external']);

export function readSearchQuery(searchParams: {
  q?: string | string[];
}): string {
  return typeof searchParams.q === 'string' ? searchParams.q.trim() : '';
}

export function readSourceParam(searchParams: {
  source?: string | string[];
}): ArticleSource | undefined {
  const source =
    typeof searchParams.source === 'string' ? searchParams.source : undefined;

  return source && ARTICLE_SOURCES.has(source as ArticleSource)
    ? (source as ArticleSource)
    : undefined;
}

function buildHref(pathname: string, { tag, source }: BlogQuery = {}): string {
  const params = new URLSearchParams();

  if (tag) {
    params.set('tag', tag);
  }

  if (source) {
    params.set('source', source);
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function buildBlogHref(query: BlogQuery = {}): string {
  return buildHref('/blog', query);
}

export function buildHomeHref(query: BlogQuery = {}): string {
  return buildHref('/', query);
}

export function buildSearchHref(query = ''): string {
  const trimmed = query.trim();
  return trimmed ? `/busca?q=${encodeURIComponent(trimmed)}` : '/busca';
}

export function matchesBlogQuery(
  article: { tags: string[]; external: boolean },
  { tag, source }: BlogQuery,
): boolean {
  if (tag && !article.tags.includes(tag)) {
    return false;
  }

  if (source === 'internal') {
    return !article.external;
  }

  if (source === 'external') {
    return article.external;
  }

  return true;
}
