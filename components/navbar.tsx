'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return scrolled;
}

export function Navbar() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const isBlog = pathname.startsWith('/blog');
  const isSearch = pathname.startsWith('/busca');

  return (
    <header className="md-top-app-bar" data-scrolled={scrolled}>
      <nav aria-label="Principal" className="flex h-16 items-center px-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
        >
          <Image
            src="/img/logo192.png"
            alt=""
            width={80}
            height={80}
            className="size-10"
            priority
          />
          <span className="md-typescale-title-large truncate">
            Bruno Nardini
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/blog"
            aria-current={isBlog ? 'page' : undefined}
            className="md-typescale-label-large inline-flex h-10 items-center rounded-sm px-3 text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
          >
            Artigos
          </Link>
          <Link
            href="/busca"
            aria-label="Busca"
            aria-current={isSearch ? 'page' : undefined}
            title="Busca"
            className="md-icon-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
          >
            <svg
              className="md-icon-button-icon"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
