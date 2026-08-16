---
slug: como-testar-excecoes-no-java
title: Como testar exceções no Java
description: Como testar exceções no Java
tags: [web]
---

Há várias formas de testar se um método irá lançar um exceção que funcionam, porém, quando o teste não passa, o programador fica perdido e precisa utilizar do debug para ver onde está o problema. Isso não é uma boa prática, pois a mensagem do teste deve ser suficientemente clara. Mostrarei uma forma eficaz de se testar uma exceção no Java.

<!--truncate-->

Vamos direto ao ponto! Veja um exemplo de teste abaixo:

```java
public void testDivide() {
  try {
    Calculadora.divide(2, 0);
    fail("ArithmeticException expected");
  } catch (Exception e) {
    assertEquals(ArithmeticException.class, e.getClass());
  }
}
```

Vamos analisar os possíveis casos e como esse método atende todos:

- O método `divide()` lança a exceção correta, conforme o experado => Da linha 12 irá passar para a linha 15, e o assert irá passar com sucesso.

- O método `divide()` não lança nenhuma exceção => Neste caso, irá da linha 12 para a linha 13, onde é forçado uma falha para avisar que se espera uma exceção, mas ela não foi lançada. Quanto mais clara for a mensagem do `fail()`, mais fácil é de identificar o problema.

- O método `divide()` lança uma exceção errada => Da linha 12 irá passar para a linha 15, mas o assert irá falhar. Desta forma, o próprio `assertEquals()` irá exibir uma mensagem que é esperado um tipo de exceção e foi lançada outra.

Você pode colocar mais asserts dentro do `catch` caso queira validar outras informações da exceção, como a mensagem e o StackTrace.

Esse tipo de preocupação parecer exagerado, mas são detalhes assim que fazem a diferença na produtividade de um programador. Um bom teste é aquele que você olha a mensagem e vai direto no código arrumar o problema, se você teve que abrir o código do teste para ver qual foi o erro, pode ter certeza que seu teste precisa ser melhorado.
