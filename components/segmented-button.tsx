'use client';

import { scrollToPageTop } from '@/lib/scroll-to-top';
import Link from 'next/link';
import type { ReactNode } from 'react';

type SegmentedButtonGroupProps = {
  label: string;
  children: ReactNode;
};

type SegmentedButtonProps = {
  href: string;
  selected?: boolean;
  scrollToTop?: boolean;
  children: ReactNode;
};

export function SegmentedButtonGroup({
  label,
  children,
}: SegmentedButtonGroupProps) {
  return (
    <div role="group" aria-label={label} className="md-segmented-button">
      {children}
    </div>
  );
}

export function SegmentedButton({
  href,
  selected = false,
  scrollToTop = false,
  children,
}: SegmentedButtonProps) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={selected ? 'page' : undefined}
      className="md-segmented-button-segment md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface"
      onClick={scrollToTop ? () => scrollToPageTop() : undefined}
    >
      {children}
    </Link>
  );
}
