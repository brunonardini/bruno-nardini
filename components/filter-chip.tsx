'use client';

import { scrollToPageTop } from '@/lib/scroll-to-top';
import Link from 'next/link';
import type { ReactNode } from 'react';

type FilterChipProps = {
  href: string;
  selected?: boolean;
  scrollToTop?: boolean;
  title?: string;
  children: ReactNode;
};

export function FilterChip({
  href,
  selected = false,
  scrollToTop = false,
  title,
  children,
}: FilterChipProps) {
  return (
    <Link
      href={href}
      scroll={false}
      title={title}
      aria-current={selected ? 'page' : undefined}
      className="md-filter-chip md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
      onClick={scrollToTop ? () => scrollToPageTop() : undefined}
    >
      {children}
    </Link>
  );
}
