import { FilterChip } from '@/components/filter-chip';
import { getTags } from '@/lib/tags';

type BlogSidebarProps = {
  activeTag?: string;
};

export function BlogSidebar({ activeTag }: BlogSidebarProps) {
  const tags = getTags();

  return (
    <aside className="md:sticky md:top-24 md:w-72 md:shrink-0">
      <h1 className="md-typescale-display-small text-pretty text-on-surface">
        Desenvolvimento e tecnologia
      </h1>
      <p className="md-typescale-body-large mt-4 text-pretty text-on-surface-variant">
        Reflexões sobre engenharia de software, carreira e o ofício de construir
        produtos.
      </p>
      <nav aria-label="Categorias" className="mt-8">
        <ul className="flex flex-wrap gap-2">
          <li>
            <FilterChip href="/blog" selected={!activeTag}>
              Recentes
            </FilterChip>
          </li>
          {tags.map((tag) => (
            <li key={tag.slug}>
              <FilterChip
                href={`/blog?tag=${tag.slug}`}
                selected={activeTag === tag.slug}
              >
                {tag.label}
              </FilterChip>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
