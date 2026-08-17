'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type ArticleShareProps = {
  url: string;
  title: string;
};

const buttonClassName =
  'md-tonal-button md-typescale-label-large cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface';

const SHARE_LINKS = [
  {
    label: 'WhatsApp',
    href: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    icon: (
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1 2.56.12.17 1.76 2.67 4.25 3.73 1.75.74 2.18.82 2.56.82.53 0 1.57-.26 1.82-.79.25-.53.25-.99.17-1.09-.07-.1-.27-.16-.56-.31-.3-.15-1.75-.86-2.02-.96-.27-.1-.43-.07-.62.17-.19.25-.73.96-.9 1.16-.16.2-.34.22-.63.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.3-.34.43-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.08-.15-.62-1.53-.86-2.09-.22-.53-.45-.45-.62-.46-.16 0-.34 0-.52 0"
      />
    ),
  },
  {
    label: 'X',
    href: (url: string, title: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: (
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.726-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
      />
    ),
  },
  {
    label: 'LinkedIn',
    href: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: (
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z"
      />
    ),
  },
] as const;

function ShareIcon({ children }: { children: ReactNode }) {
  return (
    <svg className="md-tonal-button-icon" viewBox="0 0 24 24" aria-hidden>
      {children}
    </svg>
  );
}

export function ArticleShare({ url, title }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }

    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <nav aria-labelledby="article-share-title">
      <div className="flex items-center gap-4">
        <h2
          id="article-share-title"
          className="md-typescale-body-large shrink-0 text-on-surface-variant"
        >
          Compartilhe este artigo
        </h2>
        <div
          className="min-w-0 flex-1 border-t border-outline-variant"
          aria-hidden
        />
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {SHARE_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href(url, title)}
              target="_blank"
              rel="noopener noreferrer"
              title={`${link.label}, abre em uma nova aba`}
              className={buttonClassName}
            >
              <ShareIcon>{link.icon}</ShareIcon>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={buttonClassName}
            onClick={copyLink}
            aria-live="polite"
          >
            <ShareIcon>
              {copied ? (
                <path
                  fill="currentColor"
                  d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                />
              ) : (
                <path
                  fill="currentColor"
                  d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                />
              )}
            </ShareIcon>
            {copied ? 'Link copiado' : 'Copiar link'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
