import { ArticleBody } from '@/components/article-body';
import { CopyLinkButton } from '@/components/copy-link-button';
import { getArticle, getArticles } from '@/lib/blog';
import { getTagLabel } from '@/lib/tags';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {};
  }

  const description = article.external
    ? article.summary
    : (article.description ?? article.excerpt);

  return {
    title: `${article.title} | Bruno Nardini Blog`,
    description,
    openGraph: {
      title: article.title,
      description,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  if (article.external) {
    redirect(article.url);
  }

  const path = `/blog/${article.slug}`;

  return (
    <main className="bg-surface text-on-surface">
      <article className="mx-auto max-w-3xl py-10 md:py-12">
        <header className="mx-auto max-w-2xl px-4">
          <h1 className="md-typescale-display-medium md-typescale-display-small-sm text-pretty text-on-surface">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            {article.tags.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {article.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/blog?tag=${tag}`}
                      className="md-typescale-body-medium text-on-surface-variant focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface hover:text-on-surface active:text-on-surface"
                    >
                      {getTagLabel(tag)}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <time
              className="md-typescale-body-medium text-on-surface-variant"
              dateTime={article.publishedAt}
            >
              {formatPublishedAt(article.publishedAt)}
            </time>
            <CopyLinkButton path={path} />
          </div>
        </header>

        {article.image ? (
          <div className="mt-8 px-2 md:px-0">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-container-highest">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 48rem) 100vw, 48rem"
              />
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-10 max-w-2xl px-4 md:mt-12">
          <ArticleBody content={article.content} />
        </div>
      </article>
    </main>
  );
}

function formatPublishedAt(publishedAt: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${publishedAt}T00:00:00.000Z`));
}
