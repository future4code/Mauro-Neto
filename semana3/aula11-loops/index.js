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
console.log(novoArray);

//c
novoArray = [];

for(let numero of array){
    if(numero%2 === 0){
        novoArray.push(numero);
    }
}
console.log(novoArray);

//d
novoArray = [];

for(let i=0; i<array.length; i++){
    novoArray.push("O elemento do index "+ i+" é "+ array[i]);
}
console.log(novoArray);

//Desafio 2

let jogador1 = Number(prompt("Jogador 1, digite o número para o jogador 2 acertar"))
console.log("Vamos jogar!")

let jogador2, tentativas = 1;

while(jogador2 !== jogador1){
    jogador2 = Number(prompt("Adivinhe o número que o jogador 1 está pensando"));
    if(jogador2 > jogador1){
        console.log("Errrrrrrrou, é menor")
    }
    else if(jogador2 < jogador1){
        console.log("Errrrrrrrou, é maior")
    }
    else{
        console.log("Acertou!!\nO número de tentativas foi: ", tentativas);
    }
    tentativas++;
}

//Desafio 3

jogador1 = Math.floor((Math.random() * 100) + 1); 
console.log("Vamos jogar!")

jogador2=undefined, tentativas = 1;

while(jogador2 !== jogador1){
    jogador2 = Number(prompt("Adivinhe o número que o jogador 1 está pensando"));
    if(jogador2 > jogador1){
        console.log("Errrrrrrrou, é menor")
    }
    else if(jogador2 < jogador1){
        console.log("Errrrrrrrou, é maior")
    }
    else{
        console.log("Acertou!!\nO número de tentativas foi: ", tentativas);
    }
    tentativas++;
}

/*
A alteração foi fácil de fazer. A função Math.floor arredonda para baixo o número para o número 
inteiro mais próximo. A função Math.random só randomiza números entre 0 e 1, por isso tem que
multiplicar por 100 para gerar números entre 0 e 99 nesse caso, e o +1 seria para poder
de fato o 100 ser um número possível de se obter com a função.
*/