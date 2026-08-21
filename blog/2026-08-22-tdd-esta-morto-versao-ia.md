---
slug: tdd-esta-morto-versao-ia
title: TDD está morto? (Versão IA)
description: O que muda quando a IA escreve tanto o código quanto os testes de unidade
image: /img/features/hadouken.jpg
tags: [engineering, architecture]
---

Há mais de uma década, a pergunta **“TDD está morto?”** movimentou bastante a comunidade de desenvolvimento de software. Eu também escrevi [**sobre essa discussão**](https://brunonardini.com.br/blog/tdd-esta-morto) na época. Agora que a IA está mudando nossa forma de trabalhar, talvez seja hora de fazer essa pergunta novamente.

No artigo [**Quando escrever código deixa de ser a parte difícil**](https://medium.com/totvsdevelopers/quando-escrever-c%C3%B3digo-deixa-de-ser-a-parte-dif%C3%ADcil-8fc3e1ae2f5e), defendi que acelerar o código sem repensar o restante do processo apenas desloca o gargalo. TDD deixa isso evidente: testes de unidade podem exigir tanto ou mais trabalho que a própria implementação, especialmente pela necessidade de cobrir diferentes cenários e casos de borda. Se a IA escreve o código, é difícil imaginar esse novo fluxo sem que ela também escreva esses testes.

Mas surge um problema: **se usamos IA tanto para escrever o código quanto para criar os testes que o validam, o que garante que os dois estão certos?**

E, se não podemos confiar plenamente nos testes de unidade, **eles ainda são úteis?**

## O papel do teste de unidade no TDD

Ao longo da minha carreira, tenho estudado, praticado e discutido qualidade e processos de desenvolvimento de software e percebi que TDD tem uma característica curiosa: é quase a **física quântica da engenharia de software**. É um assunto que exige bastante estudo para ser compreendido, mas surpreendentemente pouco estudo para gerar opiniões extremamente categóricas. No meio disso, toda uma metodologia acaba frequentemente reduzida a uma regra que cabe em uma frase: **“escreva o teste antes do código”**.

TDD significa _Test-Driven Development_, ou desenvolvimento guiado por testes. O próprio nome já entrega algo importante: **o teste não é o objetivo final, ele é o meio para chegar a outro resultado**. O que buscamos com TDD é produzir código limpo que funciona, usando os testes para guiar as decisões durante o desenvolvimento.

A profundidade do TDD está justamente na teoria que sustenta a metodologia. Ele reúne princípios sobre design, simplicidade, acoplamento, coesão, feedback e evolução contínua do código. Seus benefícios não vêm simplesmente da existência dos testes nem do fato de escrevê-los primeiro, mas da combinação dessas ideias ao longo do processo. Quando seguido com rigor, o resultado tende a ser um código mais simples, melhor projetado e mais fácil de modificar, com alta segurança para evoluir, cobertura integral por testes, cenários e fluxos relevantes explicitamente exercitados e menos código especulativo ou sem uso real.

Mas é impossível separar o TDD do papel que o teste de unidade exerce nesse processo. É ele que fornece o feedback rápido necessário para conduzir os pequenos ciclos de desenvolvimento, validar o comportamento e permitir que o código seja continuamente refatorado com segurança. Se queremos praticar TDD e obter seus benefícios, os testes de unidade não são opcionais.

Mas a IA traz uma nova pergunta para essa discussão: **será que ainda precisamos seguir toda a metodologia do TDD para obter os mesmos resultados e benefícios?**

## Se não for TDD, então o quê?

Quando DHH declarou que **TDD estava morto**, em 2014, ele colocou em xeque dogmas importantes e ajudou a reacender a discussão sobre os custos e os limites da prática. Na época, [**ele defendia deslocar parte da ênfase dos testes de unidade para testes de sistema**](https://dhh.dk/2014/tdd-is-dead-long-live-testing.html). Anos depois, [**o próprio DHH reconheceu que essa aposta não entregou o que esperava**](https://world.hey.com/dhh/system-tests-have-failed-d90af718). O ponto não é provar que TDD seja a única resposta, mas reconhecer que **é muito mais fácil questionar a metodologia do que substituir os resultados que buscamos com ela**.

A IA não muda esse problema. Podemos simplesmente pedir para um coding agent implementar uma funcionalidade e, ao final, criar testes de unidade para o código produzido. O resultado pode até ser uma ótima cobertura, mas isso não significa que reproduzimos TDD. Quando os testes surgem depois da solução, eles podem ser influenciados pelas decisões que já foram tomadas e acabar validando principalmente o que foi implementado, em vez de participar da definição do que deveria ser implementado.

É justamente aí que a disciplina do TDD continua relevante. Usar os testes para guiar a construção impõe restrições e feedback durante o processo, em vez de utilizar os testes apenas como uma validação posterior. A IA pode executar esse ciclo muito mais rápido do que nós, mas **automatizar a execução não elimina a necessidade de orientar como ela deve acontecer**.

Isso também não significa que seguir TDD seja suficiente para confiar no resultado. Código e testes podem estar errados mesmo quando a metodologia é executada corretamente. TDD continua sendo uma parte importante do processo de qualidade, mas é apenas uma parte dele.

## O teste passou. E agora?

O TDD continua sendo uma parte importante do processo de qualidade, mas precisa ser combinado com outras práticas e mecanismos de validação, assim como já fazíamos antes da IA.

BDD pode ajudar a explicitar comportamentos e expectativas; testes de integração e contrato validam interações entre componentes; análise estática, verificações de segurança, observabilidade e outros quality gates acrescentam novas evidências sobre a qualidade do software. Cada uma dessas práticas cobre riscos diferentes e, juntas, aumentam nossa confiança no resultado.

Hoje já conseguimos automatizar praticamente todo esse processo de qualidade com IA e outros mecanismos de automação. Agentes podem executar diferentes etapas, analisar seus resultados e iterar sobre o código até que os critérios definidos sejam atendidos. O que muda, portanto, não é a necessidade dessas práticas, mas nossa capacidade de executá-las com muito mais velocidade e escala.

**TDD não morreu. Mas também nunca foi suficiente sozinho. Na era da IA, seu valor continua existindo como parte de algo maior: um processo de engenharia capaz de produzir evidências de qualidade na mesma velocidade em que passamos a produzir código.**
