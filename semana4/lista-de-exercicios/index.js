/* Exercícios de leitura de código

Exercício 1 
Função:
A função recebe um parametro de valorEmDolar. Dentro da função é criada uma variável
que recebe do usuário um numeral informando a cotação do dolar. A função retorna a multiplicação do
valorEmDolar(passado no início da função) multiplicada pela cotação definida pelo usuário.
Global:
É declarada uma variável que chama a função passando 100 como parâmetro. O esperado é que
apareça um prompt para digitar o valor da cotação atual. Após receber a cotação, faz-se o cálculo e 
a variável meuDinheiro recebe o valor retornado da função.
Em seguida, deve-se printar no console o valor da variável meuDinheiro.


Exercício 2
Função:
A função recebe dois parâmetros, sendo tipoDeInvestimento e valor.  Dentro dela, é criada uma variável
valorAposInvestimento. Em seguida, o switch usa como base o tipoDeInvestimento, tendo cases dentro dela.
Dependendo do tipoDeInvestimento, um cálculo é feito multiplicando o valor passado como parâmetro por
um indice e o resultado é colocado na variável valorAposInvestimento. Tem também um caso default, que
cria um alert ao usuario se o tipoDeInvestimento for inválido. No final, a função retorna o valorAposInvestimento.
Global:
São declaradas duas variáveis, que chamam a função com valores diferentes. 
A primeira variável entra no case Ações, e tem o valor multiplicado por 1.1, ou seja, a variável 
fica com o valor de 165.
A segunda variável entra no case Default, que vai gerar um alert com "TIPO DE INVESTIMENTO INFORMADO 
INCORRETO", e recebe o valor de undefined, já que não recebeu nenhum valor na função.
O console vai printar "165" e "undefined"(sem aspas e em linhas distintas)


Exercício 3
São definidas 3 arrays, sendo uma com alguns valores e 2 vazias.
O laço for varre a array numeros, e a cada vez que roda, é feita uma operação com o numero(valor atual
dentro do array) comparando se o resto é igual a zero(ou seja, se é par ou ímpar). Se par, o elemento
é adicionado a array1. Caso contrário(ímpar), o elemento é adicionado na array2.
Em seguida é printado no console uma mensagem com "Quantidade total de números14"(tamanho da array numeros).
Em outra "linha" printa "6"(tamanho da array1, quantidade de pares) e na outra "linha" printa "8"(tamanho da 
array2, quantidade de ímpares).


Exercício 4
É declarada uma array com alguns valores. Em seguida, são declaradas 2 variáveis, uma com valor de Infinity
e outra com valor de 0.
O laço for varre a array numeros, e a cada vez que roda, é feita uma operação com o numero(valor atual
dentro do array) comparando se o numero é menor que numero1. Se for menor, numero1 recebe o valor de numero.
Em seguida é feita outra comparação, comparando se numero é maior que numero2, e se a condição for satisfeita,
numero2 recebe o valor de numero.
Ao sair do laço são printados no console o numero1 e numero2, que serão o menor e o maior número da array,
respectivamente, nesse caso, -10 e 1590.

*/

//Exercícios de escrita de código

/*
Exercício 1
booleano1 = true
booleano2 = false
booleano3 = !booleano2 = true
booleano 4 = !booleano3 = false

a) true && false && false 
false
b) (true && false) || !true
false || false
false
c)(false || true) && (false || true)
true && true
true
d)!(false && true) || !(true && true)
!false || !true
true || false
true
e)!(true) && !(true) || (!false && true && true)
false && false || (true && true && true)
false || true
true


Respostas:
a - false
b - false
c - true
d - true
e - true
*/

//Exercício 2
