import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { EXTERNAL_BLOG_POSTS } from '../blog/external';

const BLOG_DIR = path.join(process.cwd(), 'blog');
const MARKDOWN_FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
const TRUNCATE_RE = /<!--\s*truncate\s*-->/i;

type ArticleBase = {
  slug: string;
  title: string;
  tags: string[];
};

export type ArticleListItem = ArticleBase & {
  image?: string;
  summary: string;
  external: boolean;
  url?: string;
};

export type LocalArticle = ArticleBase & {
  external: false;
  publishedAt: string;
  description?: string;
  image?: string;
  excerpt: string;
  content: string;
};

export type ExternalArticle = ArticleBase & {
  external: true;
  publishedAt: string;
  image?: string;
  url: string;
  summary: string;
};

export type Article = LocalArticle | ExternalArticle;

export async function getArticles(): Promise<ArticleListItem[]> {
  const articles = await loadAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    tags: article.tags,
    image: article.image,
    summary: toPlainText(article.external ? article.summary : article.excerpt),
    external: article.external,
    url: article.external ? article.url : undefined,
  }));
}

export function getArticleHref(article: ArticleListItem): string {
  return article.external && article.url
    ? article.url
    : `/blog/${article.slug}`;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const articles = await loadAllArticles();

  return articles.find((article) => article.slug === slug) ?? null;
}

async function loadAllArticles(): Promise<Article[]> {
  const localArticles = await loadLocalArticles();
  const externalArticles = loadExternalArticles();

  return [...localArticles, ...externalArticles].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

async function loadLocalArticles(): Promise<LocalArticle[]> {
  const fileNames = await readdir(BLOG_DIR);
  const markdownFiles = fileNames.filter((fileName) =>
    MARKDOWN_FILENAME_RE.test(fileName),
  );

  return Promise.all(markdownFiles.map(loadLocalArticle));
}

async function loadLocalArticle(fileName: string): Promise<LocalArticle> {
  const match = fileName.match(MARKDOWN_FILENAME_RE);
  if (!match) {
    throw new Error(`Invalid blog filename: ${fileName}`);
  }

  const [, publishedAt, fileSlug] = match;
  const raw = await readFile(path.join(BLOG_DIR, fileName), 'utf8');
  const { data, content } = parseFrontMatter(raw);

  const title = readString(data.title);
  if (!title) {
    throw new Error(`Missing title in ${fileName}`);
  }

  return {
    slug: readString(data.slug) ?? fileSlug,
    title,
    tags: readStringList(data.tags),
    external: false,
    publishedAt,
    description: readString(data.description),
    image: readString(data.image),
    excerpt: excerptFrom(content, readString(data.description)),
    content,
  };
}

function loadExternalArticles(): ExternalArticle[] {
  return EXTERNAL_BLOG_POSTS.map((post) => ({
    slug: slugFromUrl(post.link),
    title: post.title,
    tags: post.tags ?? [],
    external: true,
    publishedAt: post.published_at,
    image: post.imageUrl,
    url: post.link,
    summary: post.summary,
  }));
}

function toPlainText(value: string): string {
  return value
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~#>]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerptFrom(content: string, description?: string): string {
  const parts = content.split(TRUNCATE_RE);
  if (parts.length > 1) {
    return parts[0].trim();
  }

  return description ?? '';
}

function slugFromUrl(url: string): string {
  const pathname = new URL(url).pathname;
  const lastSegment = pathname.split('/').filter(Boolean).at(-1);

  if (!lastSegment) {
    throw new Error(`Could not derive slug from URL: ${url}`);
  }

  return decodeURIComponent(lastSegment);
}

function parseFrontMatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }

  const data: Record<string, unknown> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!key) {
      continue;
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    data[key] = value;
  }

  return { data, content: match[2].trim() };
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function readStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}
