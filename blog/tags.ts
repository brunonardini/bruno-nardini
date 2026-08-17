export type BlogTag = {
  label: string;
  permalink: string;
  description: string;
};

export const BLOG_TAGS = {
  engineering: {
    label: 'Engenharia',
    permalink: '/engineering',
    description: 'Engenharia de software, práticas e decisões técnicas',
  },
  architecture: {
    label: 'Arquitetura',
    permalink: '/architecture',
    description: 'Arquitetura de software, DDD, padrões e design de sistemas',
  },
  web: {
    label: 'WEB',
    permalink: '/web',
    description: 'Desenvolvimento WEB',
  },
  mobile: {
    label: 'Mobile',
    permalink: '/mobile',
    description: 'Desenvolvimento e arquitetura de aplicações mobile',
  },
  talks: {
    label: 'Palestras',
    permalink: '/talks',
    description: 'Palestras',
  },
  management: {
    label: 'Gestão',
    permalink: '/management',
    description: 'Gestão, produto, projetos e organizações',
  },
  career: {
    label: 'Carreira',
    permalink: '/career',
    description: 'Carreira, liderança técnica e desenvolvimento profissional',
  },
  notes: {
    label: 'Notas',
    permalink: '/notes',
    description: 'Experiências, ideias e outros assuntos pelo caminho',
  },
} as const satisfies Record<string, BlogTag>;

export type BlogTagSlug = keyof typeof BLOG_TAGS;
