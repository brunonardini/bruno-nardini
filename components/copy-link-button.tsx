'use client';

import { useEffect, useRef, useState } from 'react';

type CopyLinkButtonProps = {
  path: string;
};

export function CopyLinkButton({ path }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  async function copyLink() {
    const url = new URL(path, window.location.origin).href;

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
    <button
      type="button"
      className="md-text-button md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
      onClick={copyLink}
    >
      <svg className="md-text-button-icon" viewBox="0 0 24 24" aria-hidden>
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
      </svg>
      {copied ? 'Link copiado' : 'Copiar link'}
    </button>
  );
}
