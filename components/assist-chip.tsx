import type { ReactNode } from 'react';

type AssistChipProps = {
  children: ReactNode;
};

export function AssistChip({ children }: AssistChipProps) {
  return (
    <span className="md-typescale-label-large inline-flex h-8 items-center rounded-sm border border-outline-variant px-4 text-on-surface-variant">
      {children}
    </span>
  );
}
