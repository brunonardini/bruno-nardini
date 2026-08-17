import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import type { Metadata } from 'next';
import { JetBrains_Mono, Lexend, Newsreader } from 'next/font/google';
import './globals.css';

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  axes: ['opsz'],
  style: ['normal', 'italic'],
});

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  style: ['normal', 'italic'],
  preload: false,
});

const SITE_URL = 'https://brunonardini.com.br';
const OG_TITLE = 'Bruno Nardini - Tech Blog';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Bruno Nardini | Engenharia de Software e Tecnologia',
  description:
    'Artigos, experiências e aprendizados sobre engenharia de software, arquitetura, IA, DevOps, carreira e liderança técnica.',
  alternates: {
    canonical: `${SITE_URL}/`,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Bruno Nardini',
    url: `${SITE_URL}/`,
    title: OG_TITLE,
    description:
      'Ideias e experiências sobre engenharia de software, arquitetura, tecnologia, carreira e tudo o que aprendemos construindo produtos.',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${lexend.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
