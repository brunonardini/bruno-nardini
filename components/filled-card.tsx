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
  children: ReactNode;
};

export function FilledCard({
  href,
  image,
  tags = [],
  children,
}: FilledCardProps) {
  const hasTags = tags.length > 0;

  return (
    <article className="flex h-full flex-col">
      {image ? (
        <div className="relative">
          <Link
            href={href}
            className="group relative block aspect-video overflow-hidden rounded-md bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover transition-opacity group-hover:opacity-90 group-active:opacity-80"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Link>
          {hasTags ? (
            <ul className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <li key={tag.href} className="shrink-0">
                  <AssistChip href={tag.href}>{tag.label}</AssistChip>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : hasTags ? (
        <ul className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.href} className="shrink-0">
              <AssistChip href={tag.href}>{tag.label}</AssistChip>
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href={href}
        className={`flex flex-1 flex-col text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface ${
          image && hasTags ? 'mt-8' : image ? 'mt-5' : ''
        }`}
      >
        {children}
      </Link>
    </article>
  );
}
