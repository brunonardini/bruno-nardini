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

export const metadata: Metadata = {
  title: 'Bruno Nardini Blog',
  description: 'Blog sobre desenvolvimento web e tecnologia',
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
