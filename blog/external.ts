export type ExternalBlogPost = {
  title: string;
  imageUrl: string;
  link: string;
  published_at: string;
  external: true;
  summary: string;
  tags?: string[];
};

export const EXTERNAL_BLOG_POSTS: ExternalBlogPost[] = [
  {
    title: 'Quando escrever código deixa de ser a parte difícil',
    imageUrl: '/img/medium/gargalo-code-review.png',
    link: 'https://medium.com/totvsdevelopers/quando-escrever-c%C3%B3digo-deixa-de-ser-a-parte-dif%C3%ADcil-8fc3e1ae2f5e',
    published_at: '2026-08-18',
    external: true,
    summary:
      'IA, coding agents e o desafio de escalar o desenvolvimento de software sem escalar a supervisão.',
    tags: ['engineering'],
  },
  {
    title:
      'Atomic Design na prática com React em um projeto real da RD Station',
    imageUrl: '/img/medium/rdstation-marketing-dashboard.png',
    link: 'https://medium.com/rd-shipit/atomic-design-na-pr%C3%A1tica-com-react-em-um-projeto-real-da-rd-station-ed6a94bcaa4c',
    published_at: '2022-01-31',
    external: true,
    summary:
      'Um caso real onde utilizamos o modelo mental do Atomic Design para construir componentes React.',
    tags: ['web'],
  },
  {
    title:
      'Como criar componentes React com uma arquitetura escalável usando Atomic Design',
    imageUrl: '/img/medium/lego-4.png',
    link: 'https://medium.com/rd-shipit/como-criar-componentes-react-com-uma-arquitetura-escal%C3%A1vel-usando-atomic-design-74a67aaf47e0',
    published_at: '2021-12-13',
    external: true,
    summary:
      'Como podemos utilizar o Atomic Design para administrar a complexidade, favorecendo a legibilidade, escalabilidade e flexibilidade do código.',
    tags: ['web', 'architecture'],
  },
  {
    title:
      'Benefícios de utilizar Outcomes para definição de domínios do negócio (DDD) e como adaptamos essa prática na RD Station',
    imageUrl: '/img/medium/pexels-ketut-subiyanto-4623355.jpg',
    link: 'https://medium.com/rd-shipit/benef%C3%ADcios-de-utilizar-outcomes-para-defini%C3%A7%C3%A3o-de-dom%C3%ADnios-do-neg%C3%B3cio-ddd-como-a-adaptamos-aqui-8290f7d871fd',
    published_at: '2021-10-14',
    external: true,
    summary:
      'Na minha última publicação sobre como fizemos a descoberta dos domínios (DDD) do RD Station Marketing através do EventStorming, eu mencionei como a decisão de utilizar Outcomes foi crucial para dividir o negócio em domínios.',
    tags: ['management', 'engineering'],
  },
  {
    title:
      'Descoberta dos domínios (DDD) do RD Station Marketing através do EventStorming',
    imageUrl: '/img/medium/1_n_jaMZKT0-osbU9Wqbt78g.png',
    link: 'https://medium.com/rd-shipit/descoberta-dos-dom%C3%ADnios-ddd-do-rd-station-marketing-atrav%C3%A9s-do-eventstorming-5c4743d5b7ea',
    published_at: '2021-08-16',
    external: true,
    summary:
      'Em meados de 2020, quando a RD Station ainda se chamava Resultados Digitais, a área de engenharia e produto já possuía aproximadamente 40 times distintos, resultado de um crescimento acelerado.',
    tags: ['management', 'engineering'],
  },
  {
    title:
      'React Hooks: por que devemos colocar funções no array de dependências do useEffecs?',
    imageUrl: '/img/medium/1_r0KEQBZMMEoVmPCVP8IHjw.jpeg',
    link: 'https://medium.com/rd-shipit/react-hooks-por-que-devemos-colocar-fun%C3%A7%C3%B5es-no-array-de-depend%C3%AAncias-do-useeffecs-6ba483c57ae',
    published_at: '2020-02-17',
    external: true,
    summary:
      'Com a introdução dos Hooks na versão 16.8 do React, surgiu uma nova forma de utilizar suas funcionalidades usando apenas funções, com conceitos e regras diferentes dos que já conhecíamos usando classes.',
    tags: ['web'],
  },
  {
    title: 'O que podemos esperar das novas versões do JavaScript',
    imageUrl: '/img/medium/1_U1L62mnxHs2hzDhH3lDoMg.jpeg',
    link: 'https://medium.com/rd-shipit/o-que-podemos-esperar-das-novas-vers%C3%B5es-do-javascript-2dce4f576b9e',
    published_at: '2020-01-24',
    external: true,
    summary:
      'Para você se preparar e ficar atualizado, eu preparei uma lista com as novidades do JavaScript que terá um grande impacto na forma em que escrevemos o código.',
    tags: ['web'],
  },
  {
    title: 'Como o Open Source mudou minha carreira e me fez entrar na Matrix',
    imageUrl: '/img/medium/1_94-Q3eLEBo8gc1WmsEQBjw.jpeg',
    link: 'https://medium.com/rd-shipit/como-o-open-source-mudou-minha-carreira-e-me-fez-entrar-na-matrix-d3bcd41e797',
    published_at: '2020-01-09',
    external: true,
    summary:
      'Recentemente o Open Source teve um impacto enorme na minha mudança de emprego, mas agora que eu parei para refletir sobre isso, eu vejo que ele vem transformando minha carreira desde o começo.',
    tags: ['career', 'notes'],
  },
  {
    title: 'Refatorando código legado em projetos React — Parte V',
    imageUrl: '/img/medium/1_DH1WAfrSGFbYKoBv8rjnfw.jpeg',
    link: 'https://medium.com/@megatroom/refatorando-c%C3%B3digo-legado-em-projetos-react-parte-v-15f20243d826',
    published_at: '2019-12-06',
    external: true,
    summary:
      'Para fechar com chave de ouro, esta série termina com algumas conclusões sobre qualidade de software, com alguns mitos e verdades que precisam ser esclarecidos para evitar a criação de novos projetos legados.',
    tags: ['web', 'architecture'],
  },
  {
    title: 'Refatorando código legado em projetos React — Parte IV',
    imageUrl: '/img/medium/1_4RGbtG6JigriTDXzrO3IHQ.jpeg',
    link: 'https://medium.com/m4u-tech/refatorando-c%C3%B3digo-legado-em-projetos-react-parte-iv-2913d1251305',
    published_at: '2019-08-02',
    external: true,
    summary:
      'O Redux é um contêiner de estado previsível e ajuda a manter a consistência do comportamento de uma aplicação. Sua utilização em projetos junto ao React se tornou tão popular que os desenvolvedores iniciantes em React passaram a usá-lo por obrigação, ignorando seu custo e efeitos colaterais.',
    tags: ['web', 'architecture'],
  },
  {
    title: 'Refatorando código legado em projetos React — Parte III',
    imageUrl: '/img/medium/1_KycS0Nf5K2BuZ3xL98RRHg.jpeg',
    link: 'https://medium.com/m4u-tech/refatorando-c%C3%B3digo-legado-em-projetos-react-parte-iii-9b6bf4a1c98e',
    published_at: '2019-07-18',
    external: true,
    summary:
      'No mundo real é bem mais complexo, como diria qualquer desenvolvedor ao ler um tutorial na internet. Para adentrar a complexidade de um projeto real, este artigo abordará uma alteração com um grande impacto no projeto de exemplo.',
    tags: ['web', 'architecture'],
  },
  {
    title: 'Refatorando código legado em projetos React — Parte II',
    imageUrl: '/img/medium/1_68N_-STWm95NgsmD3rylbw.jpeg',
    link: 'https://medium.com/m4u-tech/refatorando-c%C3%B3digo-legado-em-projetos-react-parte-ii-f3c1d898c11e',
    published_at: '2019-06-04',
    external: true,
    summary:
      'Neste artigo é introduzido a definição de refatoração, teste de unidade e teste de regressão, na prática é feito novos testes e a implementação de uma nova funcionalidade em um componente React.',
    tags: ['web', 'architecture'],
  },
  {
    title: 'Refatorando código legado em projetos React — Parte I',
    imageUrl: '/img/medium/1_oUx6VMWbOlzjw9YnYmqLHg.jpeg',
    link: 'https://medium.com/m4u-tech/refatorando-c%C3%B3digo-legado-em-projetos-react-parte-i-2214fd9ee04d',
    published_at: '2019-05-10',
    external: true,
    summary:
      'Código legado é uma dor que atinge em cheio o coração de qualquer programador. Com a evolução do desenvolvimento WEB, tecnologias emergentes trouxeram grande robustez para o que hoje chamamos de front-end, com isso vieram novos desafios de como escrever um código limpo. Nesta série de artigos mostrarei algumas dicas de como trabalhar em um projeto React com código legado.',
    tags: ['web', 'architecture'],
  },
];
