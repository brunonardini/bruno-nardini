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

  return (
    <header
      className={`sticky top-0 z-50 text-on-surface ${
        scrolled ? 'bg-surface-container' : 'bg-surface'
      }`}
    >
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
        <Link
          href="/blog"
          aria-current={isBlog ? 'page' : undefined}
          className="md-typescale-label-large ml-auto inline-flex h-10 items-center rounded-sm px-3 text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
        >
          Artigos
        </Link>
      </nav>
    </header>
  );
}
