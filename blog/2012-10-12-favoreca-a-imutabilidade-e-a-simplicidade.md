---
slug: favoreca-a-imutabilidade-e-a-simplicidade
title: Favoreça a imutabilidade e a simplicidade
description: Favoreça a imutabilidade e a simplicidade
tags: [web, architecture]
---

Existem várias vantagens em utilizar a imutabilidade. Uma vantagem muito forte é a otimização de memória, a própria API da linguagem Java usa a imutabilidade como uma vantagem para fazer cache e reaproveitamento de instâncias.

<!--truncate-->

Neste artigo irei abordar este padrão utilizando a linguagem Java como exemplo.

## O que é imutabilidade?

A **imutabilidade** é a característica de um objeto permanecer o mesmo sempre, ou seja, nunca mudar. Um exemplo de imutabilidade é a classe _String_ do Java. Veja um exemplo:

```java
String nome = "Bruno Nardini";
nome.toUpperCase();
System.out.println(nome);
```

Este código, que aparece com frequência em provas de certificação Java, irá imprimir o valor nome da mesma forma que foi definida na primeira linha. Isso acontece porque todo método da classe _String_ sempre devolve uma nova instância com a alteração requisitada, mas nunca altera a instância original.

O mesmo já não acontece com a classe Calendar, que é uma classe mutável. Vamos analisar o exemplo abaixo:

```java
Calendar data = new GregorianCalendar(2012, 5, 16);
validaDataNascimento(data);
System.out.println(data.get(Calendar.YEAR));
```

Por mais intuitivo que seja o método `validaDataNascimento()`, não é possível afirmar, com apenas este trecho de código, qual é a saída no console, pois este método pode ter alterado algum dado da instância de Calendar.

Os próprios engenheiros da Sun admitiram alguns erros de design das APIs antigas, como a classe `java.util.Calendar` ser mutável.

## Simplicidade

Os objetos imutáveis são muito mais simples de manipular, eles não sofrem efeitos colaterais, pois têm comportamento previsível em relação ao seu estado.

Trabalhar com objetos mutáveis acaba sendo trabalhoso, eventualmente você irá ter que proteger o objeto para que ele não mude, como iterfacear o objeto e emburlhá-lo de tal forma que os métodos expostos não possibilitem modificá-lo. Outra solução seria criar cópias defensivas do objeto, ou seja, em vez de devolver o objeto original que se deseja preservar, é feito uma cópia e essa copia é devolvida.

## Encadeamento de métodos

Uma vantagem da imutabilidade que eu uso muito é o encadeamento de métodos, viabilizando um código mais legível. Veja um exemplo:

```java
String valor = "Imutabilidade rocks!";
String resultado = valor.toUpperCase().trim().substring(13);
```

Encadear invocações de métodos (method chaining) só é viável em um objeto imutável, pois só assim é garantido que cada método irá devolver a instância de um novo objeto, não possuindo efeito colateral.

Method chaining é uma prática simples que permite a criação de interfaces fluentes (fluent interfaces) que permite a criação de DSLs.

## Definição

Para se criar uma classe imutável, ela precisa atender as seguintes características:

- Nenhum método pode modificar seu estado.
- Ela deve ser final, para evitar que a herança mude sua imutabilidade.
- Os atributos devem ser privados e final.
- Caso sua classe tenha composições com objetos mutáveis, eles devem ter acesso exclusivo pela sua classe, devolvendo cópias defensivas quando necessário.

## Conclusão

Foi demonstrado as vantagens de criar uma classe como imutável e suas particularidades. Muitos desenvolvedores já trabalham com classes imutáveis (de terceiros) e entendem seu funcionamento, mas não nunca pararam para analisar que isto é um padrão e que deveria ser fortemente usado em seus projetos.

Este texto foi adaptado do livro Introdução à arquitetura e design de software, além de várias pesquisas em sites da área.
