import { BlogSidebar } from '@/components/blog-sidebar';
import { FilledCard } from '@/components/filled-card';
import { getArticles } from '@/lib/blog';
import { getTagLabel } from '@/lib/tags';
import type { Metadata } from 'next';

type BlogPageProps = {
  searchParams: Promise<{ tag?: string | string[] }>;
};

function readTag(searchParams: {
  tag?: string | string[];
}): string | undefined {
  return typeof searchParams.tag === 'string' && searchParams.tag.length > 0
    ? searchParams.tag
    : undefined;
}

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const tag = readTag(await searchParams);
  const label = tag ? getTagLabel(tag) : undefined;

  return {
    title: label
      ? `${label} | Bruno Nardini Blog`
      : 'Artigos | Bruno Nardini Blog',
    description: 'Todos os artigos sobre desenvolvimento web e tecnologia',
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const activeTag = readTag(await searchParams);
  const articles = await getArticles();
  const visibleArticles = activeTag
    ? articles.filter((article) => article.tags.includes(activeTag))
    : articles;

  return (
    <main className="bg-surface text-on-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <BlogSidebar activeTag={activeTag} />

          {visibleArticles.length === 0 ? (
            <p className="md-typescale-body-large min-w-0 flex-1 text-on-surface-variant">
              Nenhum artigo publicado.
            </p>
          ) : (
            <ul className="grid min-w-0 flex-1 grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
              {visibleArticles.map((article) => (
                <li key={article.slug}>
                  <FilledCard
                    href={`/blog/${article.slug}`}
                    image={article.image}
                    tags={article.tags.map((tag) => ({
                      href: `/blog?tag=${tag}`,
                      label: getTagLabel(tag),
                    }))}
                  >
                    <h2 className="md-typescale-headline-large text-pretty text-on-surface">
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
          )}
        </div>
      </div>
    </main>
  );
}
