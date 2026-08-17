---
slug: dominando-o-vs-code
title: Dominando o VS Code
description: Neste artigo vou mostrar como eu o turbinei com plugins e configurações para ser muito mais produtivo.
tags: [web]
image: /img/features/vscode-bg.png
---

Já tem alguns anos que adotei o Visual Studio Code como minha IDE principal para desenvolvimento web. Neste artigo vou mostrar como eu o turbinei com plugins e configurações para ser muito mais produtivo.

<!--truncate-->

## Plugins

Utilidade gerais:

- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons) – ícones para arquivos e diretórios do explorer, deixa muito mais fácil a navegação.

- [Dracula Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula) – Tema dark.

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) – integração do VS Code com o EditorConfig, que é uma forma de manter a configuração entre diferentes IDE’s do mesmo projeto, mas para isso o projeto precisar ter seu próprio arquivo .editorconfig.

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) – Um corretor ortográfico que funciona bem com o código camelCase, ótimo para evitar erros de digitação.

- [Brazilian Portuguese](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-portuguese-brazilian) – Code Spell Checker – Dicionário pt-BR para o Spell Checker.

- [Coverage Gutters](https://marketplace.visualstudio.com/items?itemName=ryanluker.vscode-coverage-gutters) – Se você é um bom programador e gosta de cobrir todo seu código por testes, este plugin vai te ajudar a ver quais são as linhas cobertas ou não direto no VS Code.

- [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer) – Visualizar de imagens SVG.

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) – Adicionar alguns recursos extras para o Git.

- [Emoji](https://marketplace.visualstudio.com/items?itemName=Perkovec.emoji) – Uma forma de adicionar emojis no texto.

- [Gitmoji](https://marketplace.visualstudio.com/items?itemName=Vtrois.gitmoji-vscode) - Facilita adição do padrão [gitmoji](https://gitmoji.dev/).

- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) – Torna possível marcar como favorito linhas em arquivos. Eu uso muito para arquivos que uso muito e sempre tenho dificuldade de achar, em casos de projetos grandes.

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) – Habilita suporte para Markdown.

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) – Sincroniza a alteração da tag HTML da abertura com o fechamento.

- [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap) – Tira screenshots do seu código, do arquivo todo ou só da parte que você selecionar.

Específicos para front-end:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)

- [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint)

- [Prettier – Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis)

- [React-Native/React/Redux snippets for es6/es7](https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux)

- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

## Settings

Configurações do ambiente:

```js
{
  /* Exibe uma linha para que ajuda a demarcar o limite de caracters.
  80 é o valor padrão do Prittier */
  "editor.rulers": [80],
  /* Alguns arquivos são inconvenientes na hora de realizar uma busca,
  então eu removo algumas extensões. */
  "files.exclude": {
      "**/.git": true,
      "**/.svn": true,
      "**/.hg": true,
      "**/.DS_Store": true,
      "build/**/*.*": true,
      "coverage/**/*.*": true
  },
  /* O VSCode exibe o conteúdo quando clico no arquivo, isso me atrapalha muito,
  então eu deixo desabilitado */
  "explorer.autoReveal": false,
  /* Remove espaço a direita de todas as linhas ao salvar o arquivo */
  "files.trimTrailingWhitespace": true,
  /* Formata o arquivo ao salvá-lo */
  "editor.formatOnSave": true,
  /* Habilita o plugin de ícones (link acima) */
  "workbench.iconTheme": "vscode-icons",
  /* Habilita o EMMET */
  "emmet.triggerExpansionOnTab": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  /* Habilita o breadcumb */
  "breadcrumbs.enabled": true
}
```

Você pode deixar isso como configuração pessoal ou você pode colocar como configuração do projeto no arquivo `.vscode/settings.json` na raiz do seu projeto.

Eu separei minha [lista de snippets em outro post](./meu-vs-code-snippets).
