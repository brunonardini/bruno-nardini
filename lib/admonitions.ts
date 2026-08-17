import { visit } from 'unist-util-visit';

export const ADMONITION_TYPES = [
  'note',
  'tip',
  'info',
  'warning',
  'danger',
] as const;

export type AdmonitionType = (typeof ADMONITION_TYPES)[number];

const ADMONITION_TYPE_SET = new Set<string>(ADMONITION_TYPES);

const ADMONITION_OPEN_RE = new RegExp(
  `^(:{3,})(${ADMONITION_TYPES.join('|')})([^\\n]*)$`,
  'gim',
);

type UnistNode = {
  type: string;
  name?: string;
  value?: string;
  children?: UnistNode[];
  data?: {
    directiveLabel?: boolean | null;
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
};

export function isAdmonitionType(value: unknown): value is AdmonitionType {
  return typeof value === 'string' && ADMONITION_TYPE_SET.has(value);
}

export function normalizeAdmonitionSyntax(content: string): string {
  return content.replace(ADMONITION_OPEN_RE, (_, colons, type, rest) => {
    const trimmed = String(rest).trim();

    if (!trimmed || trimmed.startsWith('[') || trimmed.startsWith('{')) {
      return `${colons}${type}${trimmed}`;
    }

    const attributesIndex = trimmed.indexOf('{');
    if (attributesIndex === -1) {
      return `${colons}${type}[${trimmed}]`;
    }

    const title = trimmed.slice(0, attributesIndex).trim();
    const attributes = trimmed.slice(attributesIndex);

    return title
      ? `${colons}${type}[${title}]${attributes}`
      : `${colons}${type}${attributes}`;
  });
}

export function remarkAdmonitions() {
  return (tree: UnistNode) => {
    visit(tree, (node: UnistNode) => {
      if (node.type !== 'containerDirective' || !isAdmonitionType(node.name)) {
        return;
      }

      const data = node.data ?? {};
      node.data = data;

      data.hName = 'aside';
      data.hProperties = {
        'data-admonition-type': node.name,
        'data-admonition-title': takeDirectiveTitle(node) ?? '',
      };
    });
  };
}

function takeDirectiveTitle(node: UnistNode): string | undefined {
  const [first, ...rest] = node.children ?? [];

  if (!first || first.type !== 'paragraph' || !first.data?.directiveLabel) {
    return undefined;
  }

  node.children = rest;
  const title = nodeText(first).trim();
  return title || undefined;
}

function nodeText(node: UnistNode): string {
  if (typeof node.value === 'string') {
    return node.value;
  }

  return (node.children ?? []).map(nodeText).join('');
}
