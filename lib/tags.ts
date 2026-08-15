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
