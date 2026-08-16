import { FilterChip } from '@/components/filter-chip';
import { getTags } from '@/lib/tags';

type TagFiltersProps = {
  activeTag?: string;
  allHref: string;
  tagHref: (slug: string) => string;
};

export function TagFilters({ activeTag, allHref, tagHref }: TagFiltersProps) {
  const tags = getTags();

  return (
    <nav aria-label="Categorias">
      <ul className="flex flex-wrap gap-2">
        <li>
          <FilterChip href={allHref} selected={!activeTag}>
            Todos
          </FilterChip>
        </li>
        {tags.map((tag) => (
          <li key={tag.slug}>
            <FilterChip
              href={tagHref(tag.slug)}
              selected={activeTag === tag.slug}
            >
              {tag.label}
            </FilterChip>
          </li>
        ))}
      </ul>
    </nav>
  );
}
