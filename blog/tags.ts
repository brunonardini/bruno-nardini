export type BlogTag = {
  label: string;
  permalink: string;
  description: string;
};

export const BLOG_TAGS = {
  news: {
    label: 'Novidades',
    permalink: '/news',
    description: 'Novidades',
  },
  agile: {
    label: 'Processos Ágeis',
    permalink: '/agile',
    description: 'Processos Ágeis',
  },
  entrepreneurship: {
    label: 'Empreendedorismo',
    permalink: '/entrepreneurship',
    description: 'Empreendedorismo',
  },
  'business-management': {
    label: 'Gestão de Empresas',
    permalink: '/business-management',
    description: 'Gestão de Empresas',
  },
  'project-management': {
    label: 'Gestão de Projetos',
    permalink: '/project-management',
    description: 'Gestão de Projetos',
  },
  backend: {
    label: 'Back-end',
    permalink: '/backend',
    description: 'Back-end',
  },
  frontend: {
    label: 'Front-end',
    permalink: '/frontend',
    description: 'Front-end',
  },
  'design-patterns': {
    label: 'Padrões de Projeto',
    permalink: '/design-patterns',
    description: 'Padrões de Projeto',
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
  react: {
    label: 'React',
    permalink: '/react',
    description: 'React',
  },
  career: {
    label: 'Carreira',
    permalink: '/career',
    description: 'Carreira',
  },
} as const satisfies Record<string, BlogTag>;

export type BlogTagSlug = keyof typeof BLOG_TAGS;
