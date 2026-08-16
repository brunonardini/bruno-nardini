import { TagFilters } from '@/components/tag-filters';

type BlogSidebarProps = {
  activeTag?: string;
};

export function BlogSidebar({ activeTag }: BlogSidebarProps) {
  return (
    <aside className="md:sticky md:top-24 md:w-72 md:shrink-0">
      <h1 className="md-typescale-display-small text-pretty text-on-surface">
        Desenvolvimento e tecnologia
      </h1>
      <p className="md-typescale-body-large mt-4 text-pretty text-on-surface-variant">
        Reflexões sobre engenharia de software, carreira e o ofício de construir
        produtos.
      </p>
      <div className="mt-8">
        <TagFilters
          activeTag={activeTag}
          allHref="/blog"
          tagHref={(slug) => `/blog?tag=${slug}`}
        />
      </div>
    </aside>
  );
}
