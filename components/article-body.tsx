import { renderMarkdownAdmonition } from '@/components/admonition';
import {
  normalizeAdmonitionSyntax,
  remarkAdmonitions,
} from '@/lib/admonitions';
import rehypeShiki from '@shikijs/rehype';
import Link from 'next/link';
import { MarkdownAsync } from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
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
  aside({ children, ...props }) {
    const admonition = renderMarkdownAdmonition({
      type: readStringProp(props, 'data-admonition-type'),
      title: readStringProp(props, 'data-admonition-title'),
      children,
    });

    if (admonition) {
      return admonition;
    }

    return <aside>{children}</aside>;
  },
};

export async function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="article-body">
      <MarkdownAsync
        remarkPlugins={[remarkGfm, remarkDirective, remarkAdmonitions]}
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

function readStringProp(props: object, key: string) {
  if (!(key in props)) {
    return undefined;
  }

  const value = (props as Record<string, unknown>)[key];
  return typeof value === 'string' ? value : undefined;
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
  return normalizeAdmonitionSyntax(
    content
      .replace(/<!--\s*truncate\s*-->/gi, '')
      .replace(/\s*style=\{\{[\s\S]*?\}\}/g, '')
      .replace(/<iframe([\s\S]*?)\/>/gi, '<iframe$1></iframe>')
      .trim(),
  );
}
