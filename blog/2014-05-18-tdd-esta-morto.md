---
slug: tdd-esta-morto
title: TDD está morto?
description: TDD está morto? Neste post darei minha contribuição para a discussão e ajudarei a esclarecer alguns pontos cegos.
tags: [engineering]
---

Recentemente o David Heinemeier Hansson (DHH) publicou um post com o polêmico título [“TDD is dead. Long live testing.”](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html) (TDD está morto. Longa vida ao teste) que teve grande repercussão e a comunidade tem falado só sobre isso ultimamente. E isso não poderia ter acontecido em melhor hora, pois eu estou exatamente preparando um treinamento de TDD e BDD, então estou com muita informação para debater o assunto.

<!--truncate-->

Antes do artigo, houve a [palestra do David na RailsConf](http://youtu.be/9LfmrkyP81M) onde ele iniciou esse tema. Depois do artigo, houve dois hangount de titãs com o David, [Martin Fowler](https://martinfowler.com/) e [Kent Beck](https://www.kentbeck.com/) debatendo esse assunto: [parte 1](http://www.youtube.com/watch?v=z9quxZsLcfo&feature=share) e [parte 2](http://www.youtube.com/watch?v=JoTB2mcjU7w&feature=share).

Neste post darei minha contribuição para a discussão e ajudarei a esclarecer alguns pontos cegos.

## Quem é esse DHH para dizer isso?

Para quem não conhece o David, ele é o criador do Ruby On Rails, que é o web framework de ruby mais utilizado no mundo, também é fundador e CTO do Basecamp (antes chamado de 37 signals), que possui uma excelente ferramenta de gerenciamento de projeto com mais de 15 milhões de usuários, autor best-seller do livro REWORK, que é um dos meus livros favoritos sobre startups, ele também é palestrante e entre outras coisas.

Sabendo disso, é fácil entender porque a polêmica que ele criou fez tanto barulho. Polêmica porque o TDD é uma prática muito defendida pelos agilistas e trouxe grandes benefícios para o processo de desenvolvimento de software no mundo todo. Então quem está certo nessa história?

## Testes na comunidade Rails

Antes de entrar no mérito assunto, precisamos entender o contexto em que o David está inserido.

Quando o David fez o Rails, ele utilizou o padrão Active Record para abstrair toda a interface com o banco de dados, ele é a camada do modelo do padrão MVC que o Rails utiliza. Esse acoplamento da infra-estrutura com o modelo de dados parece inofensivo, parece até muito produtivo para o desenvolvimento, mas as coisas começam a complicar quando entra o teste de unidade.

Por definição, o teste de unidade não pode fazer integração, isso inclui integração com o banco de dados. Não faz muito sentido fazer um teste de unidade em uma unidade que sua responsabilidade é se comunicar com o banco de dados, faz mais sentido fazer um teste de integração. Porém, para uma unidade onde está o modelo do seu negócio, é muito importante que seja feito um teste de unidade. Mas se o modelo e interface com o banco estão na mesma unidade, qual teste então deveria ser feito?

Então vários problemas começam a surgir com esse acoplamento:

- Alguns começaram a fazer testes utilizando um banco de dados de teste, mas continuaram chamando de teste de unidade, o que contradiz o conceito.

- Outros além do teste citado acima, fazia TDD. Se TDD é feito com teste de unidade, então cai no mesmo problema da utilização do banco de dados.

- Na tentativa de fazer os testes de unidade sem o banco de dados, alguns tentaram resolver o problema do acoplamento, gerando designs monstro só para testar isoladamente cada parte.

- Já que tudo é bem amarrado, muitos faziam teste de sistema e deixava o teste de unidade de lado.

- O restante simplesmente deixava isso pra lá e ficava sem teste mesmo. O que é o pior de tudo.

E o problema não está só no Active Record, o David também reclamou sobre o “design-monstro” que é gerado ao tentar fazer teste de unidade no Controller, alegando que deixava o código nada legível.

Agora fica mais fácil para você entender a frustração do David ao abandonar o TDD. Longe de mim querer criticar o design do Rails, eu não sou só fã desse framework, assim como sou fã de todo trabalho do David. O Rails foi um divisor de águas, depois dele todos os web frameworks passaram a se basear no seu modelo. Muito difícil hoje em dia ter um web framework bom que não seja inspirado no Rails. Porém, tudo tem seu lado positivo e negativo. O Rails não é e nunca vai ser perfeito, assim como nenhum outro será.

Então qual seria a solução para o Rails, resolver o acoplamento e usar TDD ou manter assim e procurar outra prática?

## Devo sempre usar o TDD?

Nem todo sistema precisa de várias camadas de testes, pois cada sistema tem suas particularidades. Vamos imaginar a situação de uma startup que precisa ainda validar sua ideia. Do que adianta várias camadas de testes se você não sabe nem se seu sistema ou site vai ter cliente/usuário, seria desperdício de tempo e dinheiro.

Para projetos assim, o Rails, o Django (para Python), o Yii (para PHP), entre outros web frameworks são excelentes escolhas, pois são muito produtivos. E para os testes, eu sugiro o seguinte processo de desenvolvimento:

- Fazer o BDD. Crie pelo menos um teste de aceitação para cada funcionalidade.

- Fazer o TDD para códigos complexos e para caminhos críticos do seu negócio. Identifique as partes críticas do seu sistema ou site e isole essa parte do domínio do seu framework, na hora de criá-la utilize o TDD.

Parece dois passos simples, mas faz toda a diferença no desenvolvimento. Você estará garantido a qualidade do seu código e ainda estará sendo ágil para focar no negócio. **Mas cuidado!** Lembre-se que lá na frente, se sua ideia for validada e o sistema for para frente, você precisará rever o desenho atual do seu sistema.

Já para sistemas com propósitos mais certos, ou com uma complexidade maior, aí já é interessante o seguinte processo de desenvolvimento:

- Fazer o BDD. Crie testes de aceitação, testes de sistema e tudo que for necessário para garantir que seu sistema ou site está funcionando.

- Fazer o TDD para tudo. Isole toda a regra de negócio do domínio do framework, gaste um tempo definindo a arquitetura de uma forma que seu código fique totalmente independente da parte externa a ele. Desenvolva todo esse código utilizando TDD.

Parece chato e cansativo, mas eu lhe garanto que depois que você tiver o skeleton pronto, se você fizer um código limpo, vai ser divertido o desenvolvimento e manutenção do sistema.

## TDD no Brasil

Eu consigo contar nos dedos quantas empresas brasileiras que eu conheço que faça testes automatizados. Então acho muito engraçado essa galera no meio da discussão falando com propriedade do TDD.

Primeiro, o David em hora alguma falou mal de testes. No artigo mesmo ele cita o Capybara que ele utiliza para fazer os testes de sistema de seus projetos. Usar os argumentos do David como desculpas para não fazer testes é o mesmo que não tomar banho porque falta água no deserto, não faz sentido nenhum. Teste é importante e ponto final.

As empresas brasileiras tem um caminho ainda muito longo para chegar no nível do processo de desenvolvimento que é praticado a anos em outros países, então temos que ter muito cuidado ao tentar atacar uma prática que ninguém ao menos nem tentou validar seus benefícios citados.

Se você é contra o TDD, você deveria repensar se você realmente sabe o que é TDD e se você realmente desenha seu código de maneira correta. Como Kent falou, se você está andando de carro e descobre que está perdido, trocar de carro não vai resolver seu problema.

## Conclusão

TDD não faz você criar um mau desenho do seu código, você é que faz o desenho ruim sozinho, independente se você faz teste de unidade ou não, ou se você faz o teste antes ou depois.

Aqui eu falei dos casos que você poderia abrir mão dos testes de unidade para validar uma ideia ou ganhar tempo, mas quero que você entenda que isso tem um preço e será cobrado lá na frente. Então avalie bem as consequência de fazer ou não os testes de unidade.

Futuramente eu vou publicar mais sobre o assunto de testes, de TDD e BDD aqui no meu blog. São assuntos que eu estou estudando bastante e gostaria de trocar experiências com você. Então deixe seu comentário e diga o que achou.
