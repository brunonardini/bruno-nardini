import rehypeShiki from '@shikijs/rehype';
import Link from 'next/link';
import { MarkdownAsync } from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type ArticleBodyProps = {
  content: string;
};

const markdownComponents: Components = {
  a({ href, children, title }) {
    const resolved = resolveArticleHref(href);

    if (resolved?.startsWith('/')) {
      return (
        <Link href={resolved} title={title}>
          {children}
        </Link>
      );
    }

    return (
      <a href={resolved} title={title}>
        {children}
      </a>
    );
  },
  h2({ children }) {
    return (
      <h2 className="md-typescale-headline-small text-on-surface">
        {children}
      </h2>
    );
  },
  h3({ children }) {
    return (
      <h3 className="md-typescale-title-large text-on-surface">{children}</h3>
    );
  },
};

export async function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="article-body">
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeShiki,
            {
              theme: 'dracula',
              defaultLanguage: 'text',
              fallbackLanguage: 'text',
            },
          ],
        ]}
        components={markdownComponents}
      >
        {toRenderableMarkdown(content)}
      </MarkdownAsync>
    </div>
  );
}

function resolveArticleHref(href: string | undefined) {
  if (!href) {
    return href;
  }

  if (href.startsWith('./')) {
    return `/blog/${href.slice(2).replace(/\.mdx?$/, '')}`;
  }

  return href;
}

function toRenderableMarkdown(content: string) {
  return content
    .replace(/<!--\s*truncate\s*-->/gi, '')
    .replace(/\s*style=\{\{[\s\S]*?\}\}/g, '')
    .replace(/<iframe([\s\S]*?)\/>/gi, '<iframe$1></iframe>')
    .trim();
}
