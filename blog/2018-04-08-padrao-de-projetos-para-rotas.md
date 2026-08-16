---
slug: padrao-de-projetos-para-rotas
title: Padrão de projetos para Rotas
description: Padrão de projetos para Rotas
tags: [frontend, react]
image: /img/features/routes.jpg
---

Criar rotas é uma tarefa bem simples, a maioria dos frameworks já dão suporte nativo, mas com o crescimento do projeto algumas decisões podem dificultar a manutenção. Neste artigo vou dar uma sugestão de como organizar as rotas para facilitar o desenvolvimento de projetos complexos.

Os exemplos estarão usando apenas as bibliotecas React e React Router, mas o padrão pode ser usado para qualquer biblioteca de front-end ou até mesmo de back-end. O React Router também possui suporte para rotas estáticas e pode ser usado no Rails, Express, Koa, Ember, Angular, por exemplo.

<!--truncate-->

## Introdução

Começando pelo básico, vamos definir algumas rotas para nosso projeto de exemplo:

```jsx
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRoute, SigninContainer } from './Authentication';
import { HomeContainer } from './Home';
import { UserContainer, UserFormContainer } from './User';
import { Error404Container } from './Error';

const Routes = () => (
  <Switch>
    <Route path="/signin" component={SigninContainer} />

    <PrivateRoute exact path="/" component={HomeContainer} />

    <PrivateRoute path="/users/new" component={UserFormContainer} />
    <PrivateRoute path="/users/:id" component={UserFormContainer} />
    <PrivateRoute path="/users" component={UserContainer} />

    <Route path="*" component={Error404Container} />
  </Switch>
);

export default Routes;
```

Primeiro padrão: **coloque todas as rotas do projeto em um só arquivo na raiz do diretório de containers/controllers**. Alguns motivos para fazê-lo:

- Normalmente quando alguém vai resolver um bug, e não sabe ainda onde procurar, o desenvolvedor procura pela rota, então se todas as rotas estiverem no mesmo lugar, fica muito mais fácil encontrar o ponto de partida.

- Eu sou a favor de modularizar a aplicação, no exemplo mesmo os containers são importados de módulos, mas não acho que faça sentido a rota estar dentro do módulo. A rota é uma configuração bem específica do projeto, por exemplo você pode ter o módulo de usuários, em um app você tem a rota “/users” e usando o mesmo módulo em outro app você tem a rota “/auth/groups/users”.

- Para muitos gerenciadores de rotas a ordem que cada rota faz diferença. Por exemplo, se você colocar a rota “/users” antes de “/users/new”, ele pode cair sempre no primeiro, porque o começo da rota é suficiente para atender o regex. Então colocando todas as rotas no mesmo lugar ajuda a identificar esse problema com facilidade.

- Se você tiver que fazer alguma alteração em uma rota, fica mais fácil fazer uma análise global das rotas se estiverem todas em um só lugar. Fora que se você for alterar todas as rotas, como colocar um prefixo novo por exemplo, dificulta ainda mais se estiver espalhado.

**Tem que estar visível o que é rota pública ou privada**. No exemplo eu criei um componente próprio de rota chamado PrivateRoute, mas você pode usar um middleware ou qualquer coisa que facilite a identificação do acesso da rota.

**Trate o erro 404**. Não tem nada pior que você cair em um link quebrado e você se deparar com o erro do nginx ou algo do tipo. Uma página bem feita para o erro 404, além de passar mais credibilidade, é uma ótima oportunidade de ajudar o usuário a encontrar o que procura.

## Mantenha-se sempre seco

DRY (seco) é o acrônimo para **don’t repeat yourself** (não repita a si mesmo) que tem o seguinte princípio:

> Cada pedaço de conhecimento deve ter uma representação única, não ambígua e autoritária dentro de um sistema.

Sendo assim, toda vez que formos criar um link para a tela de usuário, não poderemos simplesmente usar a string `"/users"`, porque não estaríamos com uma representação única dessa rota, e toda vez que precisarmos identificar onde está sendo usado ou precisarmos alterá-la, nós teríamos que rastrear essa string por todo o projeto.

Para seguir o DRY, teremos que isolar as rotas para podermos reaproveitá-las:

```jsx
const paths = {
  admin: {
    label: 'Admin',
    path: '/',
    signin: {
      label: 'Signin',
      path: '/signin',
    },
    users: {
      label: 'Usuários',
      path: '/users',
      new: {
        label: 'Novo usuário',
        path: '/users/new',
      },
      edit: {
        label: 'Usuário',
        path: '/users/:id',
      },
    },
  },
};

const Routes = () => (
  <Switch>
    <Route path={paths.admin.signin.path} component={SigninContainer} />

    <PrivateRoute exact path={paths.admin.path} component={HomeContainer} />

    <PrivateRoute
      path={paths.admin.users.new.path}
      component={UserFormContainer}
    />
    <PrivateRoute
      path={paths.admin.users.edit.path}
      component={UserFormContainer}
    />
    <PrivateRoute path={paths.admin.users.path} component={UserContainer} />

    <Route path="*" component={Error404Container} />
  </Switch>
);
```

Agora o objeto paths possui a estrutura de rotas do projeto, assim é possível usá-lo na rota e quando for necessário criar um link para uma dessas rotas é possível reaproveitar o mesmo objeto:

```jsx
import { Link } from 'react-router-dom';
import { paths } from '../Routes';

<Link to={paths.admin.users.path}>Usuários</Link>;
```

## Breadcrumb

Você deve ter notado que além do path o objeto possui também a propriedade label, além do objeto seguir a hierarquia da rota, isso facilita o reaproveitamento de várias informações da rota, assim como podermos criar componentes como o Breadcrumb por exemplo:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { Link } from 'react-router-dom';

import { paths } from '../../containers/Routes';

const propTypes = {
  path: PropTypes.string.isRequired,
};

const ContainerBreadcrumb = ({ path }) => {
  const crumbs = path.split('.');
  let crumb = { ...paths };

  return (
    <div className="breadcrumb">
      {crumbs.map((item, index) => {
        const isLast = crumbs.length === index + 1;
        crumb = crumb[item];

        return (
          <div key={`crumb-${crumb.path}`}>
            <Button
              className={isLast ? null : 'button-enabled'}
              component={Link}
              to={crumb.path}
              disabled={isLast}
              size="small"
            >
              {crumb.label}
            </Button>
            {!isLast ? <Icon>chevron_right</Icon> : null}
          </div>
        );
      })}
    </div>
  );
};

ContainerBreadcrumb.propTypes = propTypes;

export default ContainerBreadcrumb;
```

Agora para usar o componente basta importá-lo e usá-lo apenas com uma linha de código:

```jsx
import { ContainerBreadcrumb } from '../../components';

<ContainerBreadcrumb path="admin.users.new" />;
```

O resultado é esse para o exemplo acima:

![Breadcrumb](../static/img/breadcrumb.png)

E cada nó, com exceção do último, é um link para suas respectivas telas.

## Considerações finais

Todo projeto tende a complexidade, então se você for criar um projeto novo é importante você seguir o DRY, mesmo que sua implementação seja diferente da que sugeri, tome cuidado em deixar as rotas em strings soltas pelo projeto, cedo ou tarde isso se tornará uma dor.

Se seu projeto já foi iniciado, você tem que analisar os prós e contras de fazer essa refatoração, mas como falei acima, todo projeto só tende a ficar mais complexo, então quanto mais você adiar essa decisão mais complicado vai se tornando.
