import { AssistChip } from '@/components/assist-chip';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type ArticleTag = {
  href: string;
  label: string;
};

type FilledCardProps = {
  href: string;
  image?: string;
  tags?: ArticleTag[];
  external?: boolean;
  flushMedia?: boolean;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
};

function ArticleLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  children: ReactNode;
}) {
  const sharedProps: Pick<ComponentProps<'a'>, 'className' | 'children'> = {
    className,
    children,
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title="Abre em uma nova aba"
        {...sharedProps}
      />
    );
  }

  return <Link href={href} {...sharedProps} />;
}

export function FilledCard({
  href,
  image,
  tags = [],
  external = false,
  flushMedia = false,
  orientation = 'vertical',
  children,
}: FilledCardProps) {
  const hasTags = tags.length > 0;
  const isHorizontal = orientation === 'horizontal';
  const mediaFlush = flushMedia || isHorizontal;

  const tagsMarkup = tags.map((tag) => (
    <li key={tag.href} className="shrink-0">
      <AssistChip href={tag.href}>{tag.label}</AssistChip>
    </li>
  ));

  return (
    <article
      className={`flex flex-col ${isHorizontal ? 'md:flex-row' : 'h-full'}`}
    >
      {image ? (
        <div
          className={
            isHorizontal
              ? 'relative md:w-32 md:shrink-0 md:self-stretch'
              : 'relative'
          }
        >
          <ArticleLink
            href={href}
            external={external}
            className={`group relative block overflow-hidden bg-surface-container-highest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface ${
              isHorizontal
                ? 'aspect-video md:absolute md:inset-0 md:aspect-auto'
                : 'aspect-video'
            } ${mediaFlush ? '' : 'rounded-md'}`}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover transition-opacity group-hover:opacity-90 group-active:opacity-80"
              sizes={
                isHorizontal
                  ? '(max-width: 768px) 100vw, 384px'
                  : '(max-width: 768px) 100vw, 40vw'
              }
            />
          </ArticleLink>
          {hasTags ? (
            <ul
              className={`absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 flex-wrap justify-center gap-2 ${
                isHorizontal ? 'md:hidden' : ''
              }`}
            >
              {tagsMarkup}
            </ul>
          ) : null}
        </div>
      ) : hasTags && !isHorizontal ? (
        <ul className="mb-4 flex flex-wrap gap-2">{tagsMarkup}</ul>
      ) : null}
      <ArticleLink
        href={href}
        external={external}
        className={`flex min-w-0 flex-1 flex-col text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface ${
          isHorizontal
            ? `${image && hasTags ? 'mt-8 md:mt-0' : image ? 'mt-5 md:mt-0' : ''} px-6 pb-6 md:justify-center md:px-5 md:py-4`
            : `${image && hasTags ? 'mt-8' : image ? 'mt-5' : ''} ${
                flushMedia ? 'px-6 pb-6' : ''
              }`
        }`}
      >
        {isHorizontal && hasTags && !image ? (
          <ul className="mb-3 flex flex-wrap gap-2">{tagsMarkup}</ul>
        ) : null}
        {children}
      </ArticleLink>
    </article>
  );
}
