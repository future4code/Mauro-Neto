/* Exercícios de Interpretação

Exercício 1 
O código define uma variável soma e em seguida entra num laço do tipo for, que roda 15 vezes,
adicionando i a soma. Em seguida imprime a soma de 0+1+2+...+14 = 105

Exercício 2
a. Adiciona um elemento ao fim de uma array. Nesse caso, adiciona ao array novaLista

b. O console vai imprimir a array novaLista, que nesse caso, foi incrementado a partir do for com os
elementos múltiplos de 5 da array lista

c. Vão ser impressos os elementos múltiplos de 3 e múltiplos de 4 da array lista.

Desafio 1
quantidadeTotal (fornecido pelo usuário) é a quantidade de vezes que o laço while vai rodar.
A cada vez que o laço while roda, a string linha é reiniciada, e o laço for incrementa "0"s 
a string linha, sendo essa quantidade de "0" igual a quantidadeAtual+1
*/


//Exercício 3
//a
const array = [80, 30, 130, 40, 60, 21, 70, 120, 90, 103, 110, 55];
let maior=array[0], menor=array[0];

for(let numero of array){
    if(numero>maior){
        maior=numero;
    }
    if(numero<menor){
        menor=numero;
    }
}
console.log("O maior número é ", maior," e o menor é ", menor);

//b

let novoArray = [];

for(let numero of array){
    novoArray.push(numero/10);
}
console.log(novoArray)

//c
novoArray = [];

for(let numero of array){
    if(numero%2 === 0){
        novoArray.push(numero);
    }
}
console.log(novoArray)

//d
novoArray = [];

for(let i=0; i<array.length; i++){
    novoArray.push("O elemento do index "+ i+" é "+ array[i])
}
console.log(novoArray);