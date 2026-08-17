'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, type ReactNode } from 'react';

const NAV_ITEMS = [
  {
    label: 'Início',
    href: '/',
    match: (pathname: string) => pathname === '/',
    icon: <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  },
  {
    label: 'Artigos',
    href: '/blog',
    match: (pathname: string) => pathname.startsWith('/blog'),
    icon: (
      <path
        fill="currentColor"
        d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
      />
    ),
  },
  {
    label: 'Sobre mim',
    href: '/#intro',
    match: () => false,
    icon: (
      <path
        fill="currentColor"
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    ),
  },
] as const;

type NavigationDrawerProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
  children?: ReactNode;
};

export function NavigationDrawer({
  open,
  onClose,
  pathname,
  children,
}: NavigationDrawerProps) {
  const titleId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const drawer = drawerRef.current;
      if (!drawer) {
        return;
      }

      const focusable = [
        ...drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled])',
        ),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        className="md-navigation-drawer-scrim"
        data-open="true"
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        id="navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="md-navigation-drawer"
        data-open="true"
      >
        <div className="md-navigation-drawer-header">
          <h2 id={titleId} className="md-typescale-title-large text-on-surface">
            Menu
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Fechar menu"
            className="md-icon-button text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        {children ? (
          <div className="md-navigation-drawer-search">{children}</div>
        ) : null}
        <nav aria-label="Páginas" className="md-navigation-drawer-nav">
          {NAV_ITEMS.map((item) => {
            const current = item.match(pathname);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? 'page' : undefined}
                className="md-navigation-drawer-item md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
                onClick={onClose}
              >
                <svg
                  className="md-navigation-drawer-item-icon"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg className="md-icon-button-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  );
}

export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
      />
    </svg>
  );
}
