import { CompactArticleList } from '@/components/compact-article-list';
import { OutlinedButton } from '@/components/outlined-button';
import { ScrollToTopOnMount } from '@/components/scroll-to-top-on-mount';
import { SearchBar } from '@/components/search-bar';
import { searchArticles } from '@/lib/blog';
import { buildBlogHref, readSearchQuery } from '@/lib/blog-query';
import type { Metadata } from 'next';

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = readSearchQuery(await searchParams);
  const title = query ? `Busca: ${query}` : 'Busca';

  return {
    title: {
      absolute: `${title} | Bruno Nardini`,
    },
    description: 'Busque artigos pelo título ou pelo conteúdo.',
    alternates: {
      canonical: '/busca',
    },
    openGraph: {
      title,
      description: 'Busque artigos pelo título ou pelo conteúdo.',
      url: '/busca',
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Bruno Nardini',
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = readSearchQuery(await searchParams);
  const articles = query ? await searchArticles(query) : [];

  return (
    <main className="bg-surface text-on-surface">
      <ScrollToTopOnMount />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:py-16">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="md-typescale-display-small text-pretty text-on-surface">
              Encontre o que procura
            </h1>
            <p className="md-typescale-body-large mt-4 text-pretty text-on-surface">
              Busque por artigos, temas e ideias publicados por aqui.
            </p>
          </div>
          <SearchBar query={query} />
        </div>
        {query ? (
          <section
            aria-labelledby="resultados-title"
            className="flex flex-col gap-8"
          >
            <h2
              id="resultados-title"
              className="md-typescale-title-large text-on-surface"
            >
              {articles.length === 1
                ? '1 artigo encontrado'
                : `${articles.length} artigos encontrados`}
            </h2>
            {articles.length > 0 ? (
              <CompactArticleList articles={articles} columns={2} showSummary />
            ) : (
              <div className="flex flex-col items-start gap-6">
                <p className="md-typescale-body-large text-on-surface-variant">
                  Nenhum artigo encontrado para “{query}”.
                </p>
                <OutlinedButton href={buildBlogHref()}>
                  Ver todos os artigos
                </OutlinedButton>
              </div>
            )}
          </section>
        ) : (
          <p className="md-typescale-body-large text-on-surface-variant">
            Digite um termo e pressione Enter ou clique em Buscar.
          </p>
        )}
      </div>
    </main>
  );
}
