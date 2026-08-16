---
slug: 5-boas-praticas-para-deixar-o-codigo-otimizado
title: 5 boas práticas para deixar o código otimizado
description: 5 boas práticas para deixar o código otimizado
tags: [web]
---

Seu programa é lento? Seu código demora a ser executado? Seu aplicativo ocasiona estouro de memória? Então acabaram seus problemas!

Neste artigo irei citar 5 boas práticas simples para otimizar seu código, mas que fazem toda a diferença quando não se a praticam. Você poderá usar essas dicas em qualquer linguagem orientada a objeto, como Java, C#, C++, PHP, Ruby, entre outras.

<!--truncate-->

Importante Esse artigo se baseia em um conceito amplo utilizado pela maioria das linguagens, mas as afirmações aqui apresentadas podem variar de uma linguagem para outra, pois cada compilador ou interpretador tem seu próprio comportamento. Mas, pela experiência que tenho, essas dicas são eficazes dentro de seus cenários.

## 1. Use métodos estáticos

Você criou um método e ele é totalmente independente da classe onde ele está, o que você está esperando para tornar seu método estático?

Tornando um método estático você está dizendo para o compilador, ou interpretador, que o conteúdo do método só precisa estar na memória durante sua execução, não enquanto a classe estiver instanciada, ou seja, você libera a memória das variáveis locais após a execução do método. Além dessa maravilha, você não necessita de uma instância para executar um método estático, você invoca o método direto de sua classe, livrando sua memória de ter que armazenar atributos da classe que você não irá utilizar.

Use com moderação, não troque todos seus métodos para estático só para ganhar performance, senão o feitiço pode virar contra o feiticeiro. Métodos não estáticos tem o privilégio de compartilhar atributos, evitando de armazenar mais de uma vez a mesma informação.

## 2. Evite atributos estáticos

Quando você cria um atributo estático, você está criando uma variável Highlander imortal, ou seja, o endereço de memória que ela possui estará sempre ocupada, mesmo quando você não estiver usando-a.

Em algumas situações bem específicas você irá precisar de um atributo estático, pois você precisa daquela variável viva durante a execução do seu programa, mas lembre-se que com grande poderes vem grandes responsabilidades, então quantos mais você evitar esse tipo de situação, melhor.

Muita das vezes o conteúdo de um atributo estático pode ser armazenado em um arquivo ou banco de dados, eles continuarão com o mesmo comportamento e só serão usados quando necessários. Tudo isso vai depender da regra de negócio do programa.

## 3. Não declare variáveis dentro de um loop

Qual o motivo de ficar realocando memória a cada loop se você pode fazer isso apenas uma vez?

Vamos analisar o exemplo a seguir:

```java
for (int i = 0; i < total; i++) {
    Produto produto = new Produto();
    produto.save(item[i]);
}
```

Se você não viu nenhuma falha no código acima, então olhe como deveria ficar:

```java
Produto produto = null;
for (int i = 0; i < total; i++) {
    produto = new Produto();
    produto.save(item[i]);
}
```

Note que no primeiro exemplo é declarado uma variável produto para cada loop que ele for executado, se a variável total estiver com o valor mil, será declarado mil vezes. Já no segundo exemplo é declarado uma vez só e reutilizado dentro do loop, assim ele poderá ser instanciado várias vezes utilizando o mesmo endereço.

Bônus Com essa dica você ganha inteiramente grátis uma dica bônus, veja o exemplo a seguir:

```java
for (int i = 0; i < total; i++) {
    (new Produto()).save(item[i]);
}
```

No exemplo acima é feito a mesma coisa que nos outros exemplos, só que sem precisar criar uma variável. Algumas linguagens, como o Java e C#, permitem você invocar um método utilizando uma instância temporária, economizando memória.

## 4. Evite a preguiça do for

Veja que triste o código que fizemos em um dia de preguiça:

```java
for (int i = 0; i < pedido.getTotal(); i++) {
    // Código misterioso
}
```

Vamos deixar essa preguiça de lado e arrumar nosso código:

```java
int total = pedido.getTotal();
for (int i = 0; i < total; i++) {
    // Código misterioso
}
```

No segundo exemplo você criou uma variável a mais, só que você evitou que ele processasse o método `getTotal()` para cada interação do loop. Só olhando o código acima não é possível saber qual a complexidade do método `getTotal()`, e mesmo que a complexidade seja mínima, é um processamento que é desnecessário repetir neste código.

Programando como no exemplo dois, você também terá a chance de validar a variável antes que entre no loop.

Atenção Se o método `getTotal()` tiver a possibilidade de variar com o código interno do for, ou você está fazendo algo errado, ou você deveria estar usando o while no lugar do for.

## 5. Evite de reinventar a roda

Se você já possui um método a sua disposição, qual o motivo de você escrever um código do seu jeito?

Existem diversos algoritmos já otimizados para fazer operações comuns, já testado e estudado por vários profissionais da área. Além do mais, o código também já está otimizado para o compilador ou interpretador da linguagem em questão. Então não perca tempo escrevendo um código que já está otimizado, há uma grande chance do seu código ficar mais lento e suscetível à falha.

## Conclusão

Não deixe seu programa, sistema ou aplicativo começar a ficar lento para você se preocupar com performance, inicie a programação já pensando no melhor algoritmo, se preocupe sempre em fazer um código limpo e otimizado para que ele evite dar problemas no futuro.

O código que você escreve hoje pode ser usado contra você no futuro. Fique esperto!
