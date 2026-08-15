import Link from 'next/link';
import type { ReactNode } from 'react';

type AssistChipProps = {
  href?: string;
  children: ReactNode;
};

const chipClassName =
  'md-assist-chip-filled md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface';

export function AssistChip({ href, children }: AssistChipProps) {
  if (href) {
    return (
      <Link href={href} className={chipClassName}>
        {children}
      </Link>
    );
  }

  return <span className={chipClassName}>{children}</span>;
}
