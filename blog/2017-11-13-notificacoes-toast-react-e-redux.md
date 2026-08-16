---
slug: notificacoes-toast-react-e-redux
title: Notificações, Toast, React e Redux
description: Notificações, Toast, React e Redux
tags: [frontend, react]
image: /img/features/blue_bg_react.png
---

A missão era simples: enviar uma **mensagem não bloqueante** de sucesso ou erro em resposta a uma **requisição assíncrona**. Seria simples se não fosse pelas palavras em negrito, pois me deparei com várias questões de arquitetura do projeto que está em [React](https://reactjs.org/) com [Redux](https://redux.js.org/), e ao pesquisar a melhor solução eu vi vários artigos em blog inconformados com o problema e dando suas sugestões de como deveria ficar, só que nenhuma dessas soluções me deixou confortável. Então neste artigo eu trago uma alternativa, expondo passo a passo as questões levantadas e as decisões tomadas para implementar essa solução.

<!--truncate-->

## Toasts

Toast é um mensagem de notificação (pop-up notification) que ganhou esse apelido por parecer uma torrada saltando na tela. Eu trago o costumo de chamar essas mensagens de toast por causa do Android, que na [documentação](https://developer.android.com/guide/topics/ui/notifiers/toasts.html) descreve como:

> “A toast provides simple feedback about an operation in a small popup.”

A grande vantagem do toast é o fato de não ser bloqueante, ele é exibido em algum canto da tela e não impede o usuário de continuar usando o sistema, site ou app.

## React-Toastify

Definido que seria um toast, restava procurar uma biblioteca com a implementação já pronta. Em uma busca (não tão longa assim) por uma, encontrei o React-Toastify, que já é para React e é bem flexível para ser adaptada às minhas necessidades de layout.

Encontrei outras alterantivas, mas sem adaptação pronta para React:

- [AlertifyJS](http://alertifyjs.com/)
- [Toastr](https://github.com/CodeSeven/toastr)

## Colocando em prática

Definido a biblioteca, era hora de começar a implementar a solução. Conforme [especificado na documentação](https://github.com/fkhadra/react-toastify#simple), basta fazer a importação do css `ReactToastify.min.css` e adicionar o `ToastContainer` ao seu container principal e está pronto para a chamada do toast. Depois seria só chamar o toast, como `toast('Lorem ipsum dolor');` por exemplo, mas como eu falei no começo do artigo, essa mensagem seria em resposta a uma requisição assíncrona, então agora que se inicia o problema…

## Container?

Como toast é uma uma interface, o mais intuitivo é colocar a sua chamada dentro de um [container](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components) (componente React). Vamos imaginar o seguinte cenário:

:::note Exemplo

O usuário clica no botão de excluir um registro da tabela. Esse botão dispara a ação (Redux action) “DELETE”, que irá chamar uma API para executar a operação, que por sua vez irá disparar a ação “DELETE_SUCCESS” ou “DELETE_FAIL” de acordo com a resposta da API, sendo que ambas ações de retorno disparam um toast para o usuário.

:::

Neste exemplo, o toast não pode ser exibido no click no botão, deve aguardar a resposta da API para saber se será exibido uma mensagem de sucesso ou de erro. O container não escuta ações, este papel é do reducer, então as ações de retorno poderiam alterar uma flag na store para indicar o resultado, algo como `deleteStatus` e o container iria chamar o toast de sucesso ao valor `'success'` ou de erro com o valor `'error'`. Só que depois de chamar de chamar o Toast, o `deleteStatus` deveria ser reiniciado, para evitar o Toast ser chamado mais de uma vez. Começou a ficar complicado. Dessa forma teria que ter outras ações só para controlar o estado do toast, e isso causaria o que eu chamo de redux-actions-hell, que são ações que não deveriam existir e polui o código.

Além de criar um estado e ação desnecessária, eu teria que ficar tratando isso a cada chamada de toast, gerando muito código desnecessário e suscetível a bugs.

## Saga?

O [Redux-Saga](https://github.com/redux-saga/redux-saga) é uma excelente biblioteca que ajuda a tratar os efeitos colaterais de ações assíncronas no Redux, e no projeto em questão foi utilizado para fazer conexões com a API. Usando o exemplo, o código da saga ficaria assim:

```js
function* delete(action) {
  const { payload } = action;

  try {
    yield MyService.delete(payload);

    yield put({
      type: 'DELETE_SUCCESS',
    });
  } catch (error) {
    yield put({
      type: 'DELETE_FAIL',
      error,
    });
  }
}
```

Como é aqui que eu defino se é sucesso ou falha, o intuitivo seria chamar o Toast aqui. Até iria funcionar, pois bastaria invocar o `toast('Operação realizado com sucesso!');` que o toast seria exibido e não seria criado o redux-actions-hell que citei no tópico anterior. Porém, isso geraria vários problemas do qual quero evitar.

O mais grave são os problemas de **responsabilidade** e **testabilidade**. A saga deveria ser simples e fácil de testar, pois a responsabilidade dela é só transitar ações em uma chama assíncrona, ele não deveria ter operações de telas. Como mencionei no tópico anterior, toast é uma operação de interface. Então além de tomar responsabilidade a qual não pertence, dificulta o teste da saga, sendo necessário criar um proxy para conseguir testar a saga sem chamar a biblioteca de terceiro.

Outro problema seria a pulverização da chamada do toast em várias sagas. Por mais que fizesse um encapsulamento da chama à biblioteca, esse **acoplamento** iria dificultar a manutenção.

## Middleware!

Depois de ter eliminado o container e saga, eu confesso que fiquei perdido, pois todas as soluções violava uma teoria da arquitetura. Depois de muito pensar e reler várias vezes a documentação do Redux, eu lembrei que a saga em si não é nativo, é um middleware, pois ele é um hook do fluxo redux, que faz todo sentido para o toast, pois a mensagem é um efeito colateral de uma ação, e usando middleware ele fica completamente **isolado**, **testável** e **reutilizável**.

Na prática, eu teria que identificar que a ação deseja disparar um toast. Eu até poderia criar um tipo de ação como `“SHOW_TOAST”` e chamá-la na saga, mas o toast é o efeito colateral de uma ação, não a ação em si, então o middleware teria que identificar por outra propriedade da ação, que já poderia servir para definir as próprias propriedades do toast.

A implementação, adaptada para este artigo, ficou assim:

```js
import { toast } from 'react-toastify';

const toastMiddleware = () => (next) => (action) => {
  if (action.toast) {
    toast(action.toast.message, action.toast.options);
  }
  return next(action);
};

export default toastMiddleware;
```

Você já notou que a propriedade de controle foi nomeada como “toast”, para ser o mais óbvio possível. E para criar a ação do toast criei o arquivo “toastActionCreator.jsx” com o código:

```js title="toastActionCreator.jsx"
export const ToastTypes = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export const buildToast = (message, type = 'default', options) => ({
  message,
  type,
  options,
});

export default (message, type = 'default', options) => ({
  type: 'SHOW_TOAST',
  toast: buildToast(message, type, options),
});
```

O “toastActionCreator” cria a ação completa, para caso haja necessidade de chamar apenas o toast, mas como já mencionei algumas vezes, o toast como regra é um efeito de uma ação, como demonstro no exemplo atualizado:

```js
import { buildToast, ToastTypes } from '../toastActionCreator';

function* delete(action) {
  const { payload } = action;

  try {
    yield MyService.delete(payload);

    yield put({
      type: 'DELETE_SUCCESS',
      toast: buildToast('Operação realizada com sucesso.', ToastTypes.success),
    });
  } catch (error) {
    yield put({
      type: 'DELETE_FAIL',
      toast: buildToast('Erro ao executar operação!', ToastTypes.error),
      error,
    });
  }
}
```

Se você acompanha a timeline do redux, você veria a ação assim:

```js
{
  type: 'DELETE_SUCCESS',
  toast: {
    message: 'Operação realizada com sucesso.',
    type: 'success',
    options: undefined,
  },
}
```

Assim fica mais fácil de testar a saga, pois a saga continuou trabalhando com objetos simples (plain objects), além de ficar flexível, pois você pode passar propriedades para o toast via “action”, como o texto com tradução, entre outras.

Qualquer tratamento de layout deve ser implementado direto no middleware, para deixar as ações bem limpas.

## Conclusão

Neste artigo eu tratei não só a implementação do toast, mas também vários conceitos importantes do Redux, demonstrando passo a passo meu raciocínio durante o processo de implementação. O objetivo é expor meu ponto de vista para promover o debate, pois são paradigmas relativamente novos, e nada melhor do que a troca de experiência para promover a evolução da tecnologia. E o que você achou? Como faria diferente?
