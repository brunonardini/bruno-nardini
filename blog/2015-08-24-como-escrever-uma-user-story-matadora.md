---
slug: como-escrever-uma-user-story-matadora
title: Como escrever uma user story matadora
description: Como escrever uma user story matadora
tags: [engineering]
image: /img/features/scrum_board.jpg
---

Escrever uma user story é muito mais do que descrever uma tarefa usando uma receita, ela é a base para construção e evolução de um produto usando metodologia ágil (Scrum, Kanban, etc), então saber criá-la da maneira certa é fundamental para a criação de valor na sua entrega.

<!--truncate-->

## O que é uma user story?

User story, ou “história do usuário” na tradução literal, é a representação de uma necessidade de negócio, descrita pelo ponto de vista do usuário.

Ela é uma redução do 5W2H, usando apenas os três itens mais importantes: quem, o quê e porque. Há diferentes formas de escrevê-la, desde que contenha os três itens principais, pode ser escrito de qualquer forma. Algumas formas de usar:

:::note Estrutura

“Com o propósito de `<porque: valor de negócio ou razão>`, como um `<quem: papel>`, eu gostaria/deveria `<o quê: função ou ação>`.”

:::

:::note Estrutura

“Eu, enquanto `<quem: papel>`, quero `<o quê: objetivo>` para `<porque: valor de negócio ou razão>`.”

:::

Parece simples, né? Mas não é. São detalhes sutis que fazem toda diferença no resultado, vou tentar explicar cada um desses detalhes por tópicos.

## Quem?

Veja um exemplo errado:

:::note Exemplo

“Eu, enquanto gestor, quero que as fotos dos produtos tenham zoom para melhorar a experiência do usuário.”

:::

Essa história pode parecer certa, porém ela contradiz um dos princípios do Manifesto Ágil:

> “Nossa maior prioridade é satisfazer o cliente através da entrega contínua e adiantada de software com valor agregado.”

Se o objetivo é satisfazer o cliente, por que a história está no ponto de vista do gestor? Se você está escrevendo histórias assim, há uma grande chance de você estar buscando o feedback para o seu negócio no lugar errado, devemos sempre buscar entregar valor para o usuário final.

Entende-se por usuário final aquele quem vai receber o valor gerado pela história, por isso é importante que a história esteja no seu ponto de vista. A escolha certa do papel é crucial para o início da construção da história.

Uma história bem escrita também especifica com detalhe o usuário. A história é para um usuário logado? Ele é usuário de qual sistema? Ele é um comprador? Ele possui uma persona definida? Quanto mais detalhado quem é esse usuário, mais fácil ficará para criar uma solução adequada.

## O quê?

Essa é a parte que as pessoas mais erram. Veja um erro clássico:

:::note Exemplo

“Eu, enquanto usuário, gostaria de uma tela de login para que eu possa acessar de forma segura minhas informações.”

:::

Você alguma vez já viu algum usuário com vontade de fazer login para fazer alguma coisa? Alguém arruma uma camisa de força para esse usuário louco! =)

Esse erro comumente acontece porque estamos sempre querendo criar as histórias já dando a solução do problema, e não é esse o objetivo dela. Como já expliquei, a história é a representação de uma necessidade de negócio, sendo assim, ela não deve representar a solução, a história deve representar o problema do usuário ou negócio.

Normalmente a história é escrita pelo Product Owner, mas quem deve escolher a solução é o time, ou seja, a solução é um processo posterior, que não deve estar presente na criação da história.

Então uma correção justa seria:

:::note Exemplo

“Eu, enquanto usuário, gostaria que somente eu acessasse minhas informações, para que eu possa manter minha privacidade.”

:::

Escrevendo assim permite que o time possa escolher a melhor solução para esse problema, podendo ser um login ou qualquer outra solução que atenda o objetivo da história.

## Porque

Não seja leviano em colocar qualquer desculpa como o porquê da sua história, ou pior, deixar sua história sem o motivo dela. O porquê é o que motiva a criação da história, por isso ele é tão importante.

Você pode colocar a dor do usuário ou o valor que história irá gerar para o usuário.

O porquê é usado para priorizar as histórias no backlog, é o guia para o time criar a solução mais adequada e é a partir dele que se cria as métricas para acompanhar se a solução cumpriu seu objetivo.

Este deveria ser o passo mais simples, pois quando você vai escrever uma história normalmente já está com o motivo na cabeça, só tem que transcrever esse motivo de forma clara e objetiva.

## Critérios de aceitação

A criação de regras pode facilitar a comunicação e a documentação do que deve ser feito, para isso usa-se criar essas regras junto com a história, que são chamadas de critérios de aceitação, que são critérios (regras) que o usuário espera que sejam atendidos para que ele aceite como pronto.

Vamos usar a história abaixo como exemplo:

:::note Exemplo

“Eu, enquanto comprador de carros, quero poder testar o carro antes de comprar, para poder fazer uma melhor escolha na compra.”

:::

Alguns critérios podem ser definidos:

- Critério #1: O comprador poderá sair com o carro da concessionária para testar o carro

- Critério #2: O comprador terá que assinar um termo de compromisso

Apesar de não serem obrigatórios, os critérios ajudam muito em todo o processo, além de poderem ser utilizados posteriormente em testes de aceitação.

## INVEST

O acrônimo INVEST ajuda a criar um checklist para assegurar a qualidade da criação das histórias. Os critérios são:

**Independente** (Independent) – Uma história deve ser independente de outra.

**Negociável** (Negotiable) – Deve ser aberta a discussão. Recursos negociáveis tiram proveito da confiança: as pessoas podem trabalhar em conjunto, partilhar ideias e compartilhar propriedade do resultado.

**Valioso** (Valuable) – A história deve entregar valor para o usuário final. Para isso é importante que a histórias sejam fatiadas verticalmente.

**Estimável** (Estimable) – Deve ser possível estimar um prazo de entrega.

**Pequeno** (Small) – Boas histórias são bem fatiadas.

**Testável** (Testable) – O time deve ser capaz de criar testes para a entrega da história.

Se a história não atender um dos critérios do INVEST, a história pode ser negada para ser reescrita.

## Tamanho é documento

A história deve ser pequena o suficiente para caber em um sticky note. A intenção da história não é burocratizar, pelo contrário, é promover a colaboração, então a história deve ser um convite para uma conversa, deve promover a comunicação e colaboração.

Se o desenvolvedor ver uma história que o Product Owner colocou no backlog e não souber do que se trata, ele tem que procurar o Product Owner pessoalmente e conversar com ele cara a cara, de preferência perto da história, pois essa é a melhor forma de comunicação.

Documentação não é algo ruim, mas se você precisa procurar um texto e não uma pessoa para alinhar o que precisa ser feito, você não está sendo ágil. Favoreça sempre a colaboração.

## Conclusão

Se você já participou de um projeto usando metodologia ágil, se identificou com as questões levantadas aqui? Deixe aqui seu comentário sobre como você tem usado as histórias, do que tem dado certo e errado.
