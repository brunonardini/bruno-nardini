import {
  SegmentedButton,
  SegmentedButtonGroup,
} from '@/components/segmented-button';
import type { ArticleSource } from '@/lib/blog-query';

const SOURCE_OPTIONS: { source?: ArticleSource; label: string }[] = [
  { label: 'Ambos' },
  { source: 'internal', label: 'No Blog' },
  { source: 'external', label: 'Externo' },
];

type SourceFilterProps = {
  activeSource?: ArticleSource;
  href: (source?: ArticleSource) => string;
  scrollToTop?: boolean;
};

export function SourceFilter({
  activeSource,
  href,
  scrollToTop = false,
}: SourceFilterProps) {
  return (
    <SegmentedButtonGroup label="Origem dos artigos">
      {SOURCE_OPTIONS.map((option) => (
        <SegmentedButton
          key={option.label}
          href={href(option.source)}
          selected={activeSource === option.source}
          scrollToTop={scrollToTop}
        >
          {option.label}
        </SegmentedButton>
      ))}
    </SegmentedButtonGroup>
  );
}
