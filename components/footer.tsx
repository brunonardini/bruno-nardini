import Link from 'next/link';
import type { ReactNode } from 'react';

const SOCIAL_LINKS = [
  {
    label: 'X',
    href: 'https://x.com/BrunoNardini',
    icon: (
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.726-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
      />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/brunonardini/',
    icon: (
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z"
      />
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bruno.nardini.dev/',
    icon: (
      <path
        fill="currentColor"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
      />
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/brunonardini',
    icon: (
      <path
        fill="currentColor"
        d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.1.73-.24.73-.53v-1.86c-3.03.66-3.67-1.46-3.67-1.46-.5-1.26-1.21-1.6-1.21-1.6-.98-.67.08-.66.08-.66 1.09.08 1.66 1.12 1.66 1.12.97 1.66 2.54 1.18 3.16.9.1-.7.38-1.18.69-1.45-2.42-.28-4.96-1.21-4.96-5.4 0-1.2.43-2.17 1.12-2.93-.11-.28-.48-1.39.11-2.9 0 0 .91-.29 3 1.12a10.4 10.4 0 0 1 5.46 0c2.08-1.41 3-1.12 3-1.12.59 1.51.22 2.62.11 2.9.7.76 1.12 1.74 1.12 2.93 0 4.2-2.55 5.12-4.98 5.4.39.33.74 1 .74 2.01v3c0 .10.10.0.3.53A11 11 0 0 0 12 1.27z"
      />
    ),
  },
] as const;

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Artigos', href: '/blog' },
  { label: 'Sobre mim', href: '/#intro' },
] as const;

const TOPIC_LINKS = [
  { label: 'Arquitetura', href: '/blog?tag=architecture' },
  { label: 'Engenharia', href: '/blog?tag=engineering' },
  { label: 'Carreira', href: '/blog?tag=career' },
  { label: 'WEB', href: '/blog?tag=web' },
] as const;

const RESOURCE_LINKS = [
  { label: 'Feed RSS', href: '/feed.xml' },
  { label: 'Mapa do site', href: '/sitemap.xml' },
] as const;

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="md-footer-link md-typescale-label-large focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
    >
      {children}
    </Link>
  );
}

function FooterNav({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="md-typescale-title-small text-on-surface">{title}</h2>
      <ul className="mt-3 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="md-site-footer">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="md-typescale-title-large text-on-surface">
              Bruno Nardini
            </p>
            <p className="md-typescale-body-medium mt-3 text-pretty text-on-surface-variant">
              Engenharia de software, ideias e aprendizados pelo caminho.
            </p>
            <nav aria-label="Redes sociais" className="mt-5">
              <ul className="flex items-center gap-1">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={`${social.label}, abre em uma nova aba`}
                      className="md-icon-button focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-surface"
                    >
                      <svg
                        className="md-icon-button-icon"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        {social.icon}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <FooterNav title="Navegar" links={NAV_LINKS} />
          <FooterNav title="Assuntos" links={TOPIC_LINKS} />
          <FooterNav title="Recursos" links={RESOURCE_LINKS} />
        </div>

        <p className="md-typescale-body-small mt-10 border-t border-outline-variant pt-6 text-on-surface-variant">
          Copyright © {year} Bruno Nardini.
        </p>
      </div>
    </footer>
  );
}
