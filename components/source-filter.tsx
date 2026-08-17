import {
  SegmentedButton,
  SegmentedButtonGroup,
} from '@/components/segmented-button';
import { buildBlogHref, type ArticleSource } from '@/lib/blog-query';

const SOURCE_OPTIONS: { source?: ArticleSource; label: string }[] = [
  { label: 'Ambos' },
  { source: 'internal', label: 'No Blog' },
  { source: 'external', label: 'Externo' },
];

type SourceFilterProps = {
  activeSource?: ArticleSource;
  activeTag?: string;
};

export function SourceFilter({ activeSource, activeTag }: SourceFilterProps) {
  return (
    <SegmentedButtonGroup label="Origem dos artigos">
      {SOURCE_OPTIONS.map((option) => (
        <SegmentedButton
          key={option.label}
          href={buildBlogHref({ tag: activeTag, source: option.source })}
          selected={activeSource === option.source}
        >
          {option.label}
        </SegmentedButton>
      ))}
    </SegmentedButtonGroup>
  );
}
