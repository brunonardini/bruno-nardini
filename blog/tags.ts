export type BlogTag = {
  label: string;
  permalink: string;
  description: string;
};

export const BLOG_TAGS = {
  notes: {
    label: 'Notas',
    permalink: '/notes',
    description: 'Experiências, ideias e outros assuntos pelo caminho',
  },
  engineering: {
    label: 'Engenharia',
    permalink: '/engineering',
    description: 'Engenharia de software, práticas e decisões técnicas',
  },
  management: {
    label: 'Gestão',
    permalink: '/management',
    description: 'Gestão, produto, projetos e organizações',
  },
  architecture: {
    label: 'Arquitetura',
    permalink: '/architecture',
    description: 'Arquitetura de software, DDD, padrões e design de sistemas',
  },
  web: {
    label: 'WEB',
    permalink: '/web',
    description: 'WEB',
  },
  mobile: {
    label: 'Mobile',
    permalink: '/mobile',
    description: 'Mobile',
  },
  talks: {
    label: 'Palestras',
    permalink: '/talks',
    description: 'Palestras',
  },
  career: {
    label: 'Carreira',
    permalink: '/career',
    description: 'Carreira',
  },
} as const satisfies Record<string, BlogTag>;

export type BlogTagSlug = keyof typeof BLOG_TAGS;
