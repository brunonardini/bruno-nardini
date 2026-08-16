import { BLOG_TAGS, type BlogTagSlug } from '../blog/tags';

export function getTags() {
  return Object.entries(BLOG_TAGS).map(([slug, tag]) => ({
    slug,
    ...tag,
  }));
}

export function getTagLabel(tag: string): string {
  return BLOG_TAGS[tag as BlogTagSlug]?.label ?? tag;
}

export function readTagParam(searchParams: {
  tag?: string | string[];
}): string | undefined {
  return typeof searchParams.tag === 'string' && searchParams.tag.length > 0
    ? searchParams.tag
    : undefined;
}
