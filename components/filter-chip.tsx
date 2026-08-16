import Link from 'next/link';
import type { ReactNode } from 'react';

type FilterChipProps = {
  href: string;
  selected?: boolean;
  children: ReactNode;
};

export function FilterChip({
  href,
  selected = false,
  children,
}: FilterChipProps) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={selected ? 'page' : undefined}
      className="md-filter-chip md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
    >
      {children}
    </Link>
  );
}
