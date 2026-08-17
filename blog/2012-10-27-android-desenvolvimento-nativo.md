---
slug: android-desenvolvimento-nativo
title: Android - Desenvolvimento Nativo
description: Desenvolvimento Nativo no Android
tags: [mobile]
---

Assim como outras plataformas para dispositivos móveis, o Android oferece a opção de desenvolver código em linguagem nativa em seus aplicativos, como as linguagens C e C++.

Neste artigo irei abordar o que é e como é feito o desenvolvimento nativo para Android, e quais são suas vantagens e desvantagens.

<!--truncate-->

## Android NDK e JNI

O NDK (Native Development Kit) é um conjunto de ferramentas que permite a implementação de código nativo no Android, como C e C++, disponível no próprio [site do Android](http://developer.android.com/tools/sdk/ndk/index.html), com versões para Windows, Mac OS e Linux. O Eclipse com o plugin ADT (Android Development Tools) fornece integração com o NDK.

No Google I/O de 2012 a Google anunciou que aumentou o investimento no desenvolvimento nativo para Android para incentivar a evolução dos aplicativos. Eles perceberam que a evolução do Android estaria nos jogos, que são os aplicativos que mais consomem recursos dos dispositivos, e o grande foco do desenvolvimento de jogos é no código nativo. Então podemos esperar grandes melhorias e recursos nessa área.

A integração do código nativo com o código em Java é feita do mesmo jeito que em qualquer outro lugar: através do JNI. Através do Java Native Interface (JNI) é possível chamar métodos em C++ do Java e vice versa, assim como a comunicação do Java com outras linguagens como C e Assembly.

## Vantagens

**Performance**. O código nativo possui esse nome pois é o código programado nas linguagens do próprio sistema operacional, por isso o nome nativo, eles falam a mesma língua. Com isso, sua performance é bem maior que em outras linguagens. No caso do Android, o código nativo possui mais um fator que lhe permite ser mais rápido, pois o Java é uma linguagem que precisa ser interpretada em tempo de execução pela JVM, já o código nativo é inteiramente compilado.

<center>
    <img src="/img/content/fast-android.jpg" />
</center>

**Reutilização de código**. Como as outras plataformas também oferece suporte para desenvolvimento de código C e C++, se for bem estruturado o código, o mesmo código pode ser usado para outras plataformas, sendo necessário mudar somente a parte do código que utiliza as APIs nativas. Vários aplicativos e jogos que estão disponíveis para Android e iOS utilizam grande parte do mesmo código através do código nativo. Não só códigos para dispositivos móveis, mas também podendo reutilizar o mesmo código para plataforma desktop e web.

**Segurança**. Todos sabem que para fazer engenharia reversa no Java não precisa ter nenhum conhecimento avançado, há vários aplicativos disponíveis na internet para isso. Ofuscar o código Java ajuda a dificultar o trabalho do seu inimigo desocupado, mas mesmo assim ele conseguirá obter a informação que precisa. Agora, fazer engenharia reversa em código nativo… aí já é brincadeira de gente grande.

**OpenGL**. Se você irá trabalhar com recursos visuais avançados, você irá chegar a um ponto que não terá como fugir do OpenGL, e o desenvolvimento nativo será a solução para seus problemas.

## Desvantagens

**Improdutivo**. Programação nativa não é simples e demanda mais tempo e conhecimento. No caso do Android, você terá que ter um bom conhecimento sobre NDK, a própria linguagem nativa e o JNI, todos os três demandam um bom tempo de estudo.

**Dispensável para a maioria**. A própria Google afirma que a maioria dos aplicativos não necessita de desenvolvimento nativo e que deve ser usado somente em caso de última necessidade. Se seu aplicativo não exige nenhuma das vantagens citadas no tópico anterior, mantenha seu código em Java mesmo.

**Instabilidade**. O Android não lida bem com as exceções lançadas no código nativo, fazendo o aplicativo fechar inesperadamente. Se você usar um código nativo, você irá ter que gastar um tempo extra na qualidade de seus códigos para evitar que seu aplicativo se torne instável.

**Pouca referência**. É muito difícil encontrar conteúdo na internet sobre o desenvolvimento nativo para Android, até mesmo no site do Android possui quase nada sobre o assunto. Será difícil achar ajuda para um problema caso você esteja usando código nativo.

## Conclusão

Se for vantajoso ou não usar código nativo, quem irá dizer isso é o seu projeto. Estude bem a necessidade do seu projeto, o planejamento é muito importante neste momento. Caso você tenha dúvida, eu sugiro que opte por não usar, caso você venha a precisar no meio do caminho ou posteriormente, vale a pena o retrabalho para reescrever o código para nativo. Se sua intenção é apenas aprender, aí vale muito a pena, pois quando você precisar já vai ter o conhecimento e experiência, além de se diferenciar dos outros profissionais da área.
