---
slug: meu-vs-code-snippets
title: Meu VS Code snippets
description: Meu VS Code snippets
tags: [web]
image: /img/features/shortcut.jpg
---

Code snippets são blocos de códigos dinâmicos e reutilizáveis. Você pode usar extensões que já possuem vários snippets prontos e você pode criar para aqueles seus códigos que você digita repetitivamente.

<!--truncate-->

Para as tarefas comuns, eu estou usando esta extensão:

[React-Native/React/Redux snippets for es6/es7](https://marketplace.visualstudio.com/items?itemName=EQuimper.react-native-react-redux)

Os snippets que criei:

```json
{
  "React Component": {
    "prefix": "myrc",
    "description": "React Component",
    "body": [
      "import React from \"react\";",
      "import PropTypes from \"prop-types\";",
      "",
      "const ${TM_FILENAME_BASE} = () => (",
      "  $1",
      ");",
      "",
      "${TM_FILENAME_BASE}.defaultProps = {};",
      "",
      "${TM_FILENAME_BASE}.propTypes = {};",
      "",
      "export default ${TM_FILENAME_BASE};"
    ]
  },
  "Component Storybook": {
    "prefix": "mycs",
    "description": "Component Storybook",
    "body": [
      "import React from \"react\";",
      "",
      "import ${TM_FILENAME_BASE/(.stories)//} from \"./${TM_FILENAME_BASE/(.stories)//}\";",
      "",
      "export default {",
      "  title: \"Components|${1|Atoms,Molecules,Organisms,Templates,Pages|}/${TM_FILENAME_BASE/(.stories)//}\",",
      "  component: ${TM_FILENAME_BASE/(.stories)//}",
      "};",
      "",
      "export const usage = () => (",
      "  <${TM_FILENAME_BASE/(.stories)//}>$2",
      ");"
    ]
  },
  "Component Unit Test": {
    "prefix": "myct",
    "description": "Component Unit Test",
    "body": [
      "import React from \"react\";",
      "import { render, screen } from \"test-utils\";",
      "",
      "import ${TM_FILENAME_BASE/(.test)//} from \"./${TM_FILENAME_BASE/(.test)//}\";",
      "",
      "test('$1', () => {",
      "  render(<${TM_FILENAME_BASE/(.test)//}>);",
      "});"
    ]
  },
  "Import styled from styled-components": {
    "prefix": "imst",
    "description": "Import styled from styled-components",
    "body": ["import styled from \"styled-components\";"]
  },
  "Import from Testing Library React": {
    "description": "Import from Testing Library React",
    "scope": "javascript",
    "prefix": "imtlr",
    "body": ["import { $1 } from \"@testing-library/react\";"]
  },
  "Import default module": {
    "description": "Import default module",
    "scope": "javascript",
    "prefix": "imdm",
    "body": ["import ${name} from \"$1\";"]
  },
  "Import named module": {
    "description": "Import named module",
    "scope": "javascript",
    "prefix": "imnm",
    "body": ["import { $2 } from \"$1\";"]
  },
  "Add PropType to component": {
    "description": "Add PropType to component",
    "scope": "javascript",
    "prefix": "propc",
    "body": [
      "${TM_FILENAME_BASE}.propTypes = {",
      "  $1",
      "};",
      "",
      "${TM_FILENAME_BASE}.defaultProps = {",
      "  $2",
      "};"
    ]
  }
}
```
