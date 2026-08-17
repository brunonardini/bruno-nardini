'use client';

import { MenuIcon, NavigationDrawer } from '@/components/navigation-drawer';
import { SearchBar } from '@/components/search-bar';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

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

function AppBarSearch({ onSubmitted }: { onSubmitted?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = pathname.startsWith('/busca')
    ? (searchParams.get('q') ?? '').trim()
    : '';

  return (
    <SearchBar variant="app-bar" query={query} onSubmitted={onSubmitted} />
  );
}

export function Navbar() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const isBlog = pathname.startsWith('/blog');
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const media = window.matchMedia('(min-width: 48rem)');
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);

  return (
    <header className="md-top-app-bar" data-scrolled={scrolled}>
      <nav aria-label="Principal" className="flex h-16 items-center gap-2 px-4">
        <button
          type="button"
          className="md-icon-button md-navigation-menu-trigger text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="navigation-drawer"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon className="md-icon-button-icon" />
        </button>
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
        >
          <Image
            src="/img/logo192.png"
            alt=""
            width={80}
            height={80}
            className="size-10 shrink-0"
            priority
          />
          <span className="md-typescale-title-large truncate">
            Bruno Nardini
          </span>
        </Link>
        <div className="ml-auto hidden items-center justify-end gap-2 md:flex">
          <Suspense fallback={<SearchBar variant="app-bar" />}>
            <AppBarSearch />
          </Suspense>
          <Link
            href="/blog"
            aria-current={isBlog ? 'page' : undefined}
            className="md-typescale-label-large inline-flex h-10 shrink-0 items-center rounded-sm px-3 text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
          >
            Artigos
          </Link>
        </div>
      </nav>
      <NavigationDrawer open={menuOpen} onClose={closeMenu} pathname={pathname}>
        <Suspense fallback={<SearchBar variant="app-bar" />}>
          <AppBarSearch onSubmitted={closeMenu} />
        </Suspense>
      </NavigationDrawer>
    </header>
  );
}
