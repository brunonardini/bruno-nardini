---
slug: compose-providers
title: Como resolver o encadeamento de providers no React
description: Técnica para construir resolver o encadeamento de providers no React
image: /img/features/hadouken.jpg
tags: [frontend, react]
---

Com a introdução do hook `useContext` ficou mais prático de trabalhar com estado global no React, sem a necessidade de usar vários consumers no JSX. Porém, ainda há a necessidade de declarar o Provider dentro JSX, então sem perceber podemos entrar no Provider Hell como este:

<!--truncate-->

```jsx
function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <SettingsProvider>
          <UserProvider>
            <MagicProvider>
              <LayoutProvider>
                <Header />
                <Body />
                <Footer />
              </LayoutProvider>
            </MagicProvider>
          </UserProvider>
        </SettingsProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}
```

Não chega a ser um problema grave esse "bico de pato", mas com certeza não é nada agradável de se ver.

## Composição

Se o prolema for somente o design do código, podemos refatorar o código usando uma função para compor os providers:

```jsx
const composeProviders =
  (...providers) =>
  (props) =>
    providers.reduceRight(
      (children, Provider) => <Provider {...props}>{children}</Provider>,
      props.children,
    );

export const AllProviders = composeProviders(
  ThemeProvider,
  RouterProvider,
  SettingsProvider,
  UserProvider,
  MagicProvider,
  LayoutProvider,
);
```

Agora é só substituir aquele Provider Hell pelo novo `AllProviders`:

```jsx
function App() {
  return (
    <AllProviders>
      <Header />
      <Body />
      <Footer />
    </AllProviders>
  );
}
```

Se quiser passar alguma propriedade para todos os providers, você pode passá-lo como propriedade do `AllProviders`:

```jsx
<AllProviders env="dev" baseUrl="/">
  {/* ... */}
</AllProviders>
```

Caso queira passar uma propriedade só para um provider, basta encapsulá-lo em uma função:

```jsx
export const AllProviders = composeProviders(
  ThemeProvider,
  RouterProvider,
  SettingsProvider,
  () => <UserProvider logoutRedirectTo="/login" />,
  MagicProvider,
  LayoutProvider,
);
```

## Estado global

É confortável sair criando vários providers e colocá-los todos na raiz como demonstrado no exemplo, pode até ser uma decisão consciente com o motivo de separar bem a responsabilidade de cada estado. Mas lembre-se que quanto mais alto na hierarquia fica o estado, maior o impacto de sua atualização.

Reveja seus providers e reavalie se realmente há necessidade de ficarem global, ou se podem pelo menos descer na hierarquia dos componentes. Se contextos compartilham a mesma lógica, veja a possibilidade de agrupá-los.

## E o Redux?

Trocar para o Redux não irá resolver este problema em questão, porque o Redux trabalha da mesma forma que o React Context, então em muitos casos você só estará adicionando uma biblioteca a mais para chegar ao mesmo resultado.

## Curiosidade

Quando eu estava na faculdade, lá no começo da internet, eu vi um código de um amigo que estava com esse encadeamento gigantesco, e fiz essa brincadeira:

![Code Hadouken MEME](/img/features/hadouken.jpg)

Na época nem existia o conceito de MEME, mas acabou sendo usado até hoje. =)
