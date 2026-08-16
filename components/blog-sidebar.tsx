import { TagFilters } from '@/components/tag-filters';

type BlogSidebarProps = {
  activeTag?: string;
};

export function BlogSidebar({ activeTag }: BlogSidebarProps) {
  return (
    <aside className="md:sticky md:top-24 md:w-72 md:shrink-0">
      <h1 className="md-typescale-display-small text-pretty text-on-surface">
        Tech Blog
      </h1>
      <p className="md-typescale-body-large mt-4 text-pretty text-on-surface">
        Ideias e experiências sobre engenharia de software, arquitetura,
        tecnologia, carreira e tudo o que aprendemos construindo produtos.
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
