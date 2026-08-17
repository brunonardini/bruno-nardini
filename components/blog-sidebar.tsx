import { SourceFilter } from '@/components/source-filter';
import { TagFilters } from '@/components/tag-filters';
import { buildBlogHref, type ArticleSource } from '@/lib/blog-query';

type BlogSidebarProps = {
  activeTag?: string;
  activeSource?: ArticleSource;
};

export function BlogSidebar({ activeTag, activeSource }: BlogSidebarProps) {
  return (
    <aside className="md:sticky md:top-24 md:w-72 md:shrink-0">
      <h1 className="md-typescale-display-small text-pretty text-on-surface">
        Tech Blog
      </h1>
      <p className="md-typescale-body-large mt-4 text-pretty text-on-surface">
        Ideias e experiências sobre engenharia de software, arquitetura,
        tecnologia, carreira e tudo o que aprendemos construindo produtos.
      </p>
      <div className="mt-8 flex flex-col gap-8">
        <section>
          <h2 className="md-typescale-title-small text-on-surface-variant">
            Publicações
          </h2>
          <div className="mt-3">
            <SourceFilter
              activeSource={activeSource}
              href={(source) => buildBlogHref({ tag: activeTag, source })}
              scrollToTop
            />
          </div>
        </section>
        <section>
          <h2 className="md-typescale-title-small text-on-surface-variant">
            Categorias
          </h2>
          <div className="mt-3">
            <TagFilters
              activeTag={activeTag}
              allHref={buildBlogHref({ source: activeSource })}
              tagHref={(slug) =>
                buildBlogHref({ tag: slug, source: activeSource })
              }
              scrollToTop
            />
          </div>
        </section>
      </div>
    </aside>
  );
}
