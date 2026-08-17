import {
  SegmentedButton,
  SegmentedButtonGroup,
} from '@/components/segmented-button';
import type { ArticleSource } from '@/lib/blog-query';

const SOURCE_OPTIONS: {
  source?: ArticleSource;
  label: string;
  description: string;
}[] = [
  {
    label: 'Ambos',
    description: 'Artigos publicados no blog e em outras plataformas',
  },
  {
    source: 'internal',
    label: 'No Blog',
    description: 'Artigos publicados neste blog',
  },
  {
    source: 'external',
    label: 'Externo',
    description: 'Artigos publicados em outras plataformas',
  },
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
          title={option.description}
        >
          {option.label}
        </SegmentedButton>
      ))}
    </SegmentedButtonGroup>
  );
}
