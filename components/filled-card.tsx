import { AssistChip } from '@/components/assist-chip';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type ArticleTag = {
  href: string;
  label: string;
};

type FilledCardProps = {
  href: string;
  image?: string;
  tags?: ArticleTag[];
  flushMedia?: boolean;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
};

export function FilledCard({
  href,
  image,
  tags = [],
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
          <Link
            href={href}
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
          </Link>
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
      <Link
        href={href}
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
      </Link>
    </article>
  );
}
