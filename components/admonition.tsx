import { isAdmonitionType, type AdmonitionType } from '@/lib/admonitions';
import type { ReactNode } from 'react';

const DEFAULT_TITLES: Record<AdmonitionType, string> = {
  note: 'Nota',
  tip: 'Dica',
  info: 'Info',
  warning: 'Atenção',
  danger: 'Cuidado',
};

const ICONS: Record<AdmonitionType, ReactNode> = {
  note: (
    <path
      fill="currentColor"
      d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8zm2 18H6V4h7v5h5z"
    />
  ),
  tip: (
    <path
      fill="currentColor"
      d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7m2.85 11.1-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1"
    />
  ),
  info: (
    <path
      fill="currentColor"
      d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"
    />
  ),
  warning: (
    <path
      fill="currentColor"
      d="M12 5.99 19.53 19H4.47zM12 2 1 21h22zm1 14h-2v2h2zm0-6h-2v4h2z"
    />
  ),
  danger: (
    <path
      fill="currentColor"
      d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1m-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m1-3h-2v-2h2z"
    />
  ),
};

type AdmonitionProps = {
  type: AdmonitionType;
  title?: string;
  children: ReactNode;
};

export function Admonition({ type, title, children }: AdmonitionProps) {
  const heading = title?.trim() || DEFAULT_TITLES[type];

  return (
    <aside
      className={`md-admonition md-admonition-${type}`}
      aria-label={heading}
    >
      <p className="md-admonition-title md-typescale-title-small">
        <svg className="md-admonition-icon" viewBox="0 0 24 24" aria-hidden>
          {ICONS[type]}
        </svg>
        {heading}
      </p>
      <div className="md-admonition-content">{children}</div>
    </aside>
  );
}

export function renderMarkdownAdmonition({
  type,
  title,
  children,
}: {
  type?: string;
  title?: string;
  children: ReactNode;
}) {
  if (!isAdmonitionType(type)) {
    return null;
  }

  return (
    <Admonition type={type} title={title}>
      {children}
    </Admonition>
  );
}
