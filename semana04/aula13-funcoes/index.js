/* Exercícios de Interpretação

Exercício 1 
A função recebe um parametro quantidade. Em seguida declara uma array inicialmente vazia.
É criado um for que roda enquanto o valor de i for menor que quantidade, e a cada vez que esse laço 
roda, o valor de i é incrementado em 2. Dentro desse primeiro laço, é criado um segundo laço que 
vai rodar enquanto o valor de j for menor que i, e o valor de j é incrementado em uma unidade.

a. Ao rodar passando o parâmetro 2, o i vai rodar apenas a primeira vez, e o j não irá rodar,
pois nesse caso, j === i, e não menor. Logo, não adiciona nenhum valor a array, e a função retorna
a array vazia.

b. Ao rodar passando o parâmetro 5, a função se comporta da seguinte forma:
1ª iteração - i=0; j não roda
2ª iteração - i=2; j roda 2 vezes, adicionando o valor dele mesmo a array, ou seja, 0 e 1
3ª iteração - i=4; j roda 4 vezes, adicionando a array 0,1,2,3
A função termina, pois atendeu a condição inicial (i < quantidade), e retorna a array assim:
array[0,1,0,1,2,3]

c. Ao rodar passando o parâmetro 8, a função se comporta da seguinte forma:
1ª iteração - i=0; j não roda
2ª iteração - i=2; j roda 2 vezes, adicionando o valor dele mesmo a array, ou seja, 0 e 1
3ª iteração - i=4; j roda 4 vezes, adicionando a array 0,1,2,3
4ª iteração - i=6; j roda 6 vezes, adicionando a array 0,1,2,3,4,5
A função termina, pois atendeu a condição inicial (i < quantidade), e retorna a array assim:
array[0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 4, 5]


Exercício 2

a. 0 ("Darvas" existe na posição 0 do array)
2 ("João" existe na posição 2 do array)
undefined ("Paula" não existe nenhum elemento igual ao valor no array)

b. Sim, funcionaria, pois a função compara dois parâmetros, que são comparados, e se os valores
forem iguais, retornam o índice do array correspondente aos valores comparados


Exercício 3
A função recebe um array como parâmetro e declara 3 variáveis. O laço for vai varrer todo o array
somando e multiplicando cada um dos elementos e atribuindo em duas variáveis, sendo resultadoA para
o resultado das somas e resultadoB para o resultado dos produtos.
Ao terminar o laço, os resultados são adicionados a um array, utilizando push e a função encerra tendo
como retorno o arrayFinal, que tem os resultados da soma e produto.
Um nome para a função poderia ser somaProduto.

*/

//Exercício 4
//a
const anosCachorros = (anosHumanos) => anosHumanos*7;

//b
const mensagem = (nome, idade, endereco, estudante) => {
    if(estudante===true){
        return "Eu sou "+nome+", tenho idade "+idade+" anos, moro em "+endereco+" e sou estudante."
    }
    else{
        return "Eu sou "+nome+", tenho idade "+idade+" anos, moro em "+endereco+" e não sou estudante."
    }
}

//Exercício 5
const seculo = (ano) => {
    let result, romano="";

    const conversor = (numero) =>{
        let letras = ["M",  "CM",  "D",  "CD", "C",  "XC", "L",  "XL",  "X",  "IX", "V",  "IV", "I"];
        let numeros = [1000,  900,  500,  400,  100,   90,  50,   40,   10,    9,    5,    4,    1]
        let convertido=""
        let i=0;
        while(numero > 0){
            if(numero>=numeros[i]){
                convertido+=letras[i]
                numero-=numeros[i]
            }
            else{
                i++;
            }
        }
        return convertido;
    }

    if(ano % 100 !== 0){
        result = Math.round(Math.floor(ano/100)+1);
    }
    else{
        result = Math.round(Math.floor(ano/100));
    }
    romano=conversor(result);
    return romano;
}
//Exercício 6
const array = [10, 23, 45, 78, 90, 52, 35, 67, 84, 22]

//a
const tamanho = (array) => {
    let qtd=0
    for(i of lista){
        qtd+=1
    }
    return qtd
}

//b
const par = (numero) => {
    if(numero%2==0){
        return true
    }
    else{
        return false
    }
}

//c e d
const qtdpares = (array) =>{
    let qtd=0;
    for(let i of array){
        if(par(i)){
            qtd++;
        }
    }
    return qtd;
}