import { Hero } from '@/components/hero';
import { getArticles } from '@/lib/blog';

export default async function Home() {
  const articles = await getArticles();
  const [latest, ...more] = articles;

  return (
    <main>
      <Hero latest={latest} articles={more.slice(0, 3)} />
    </main>
  );
}
