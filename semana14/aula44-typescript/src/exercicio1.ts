//Exercício 1
/* 
a) Ao tentar atribuir um número a variável minhaString, o próprio editor reclama 
que a variável só deve receber do tipo string (linha 9, comentei para compilar)
*/

let minhaString: string = "teste"

//minhaString = 12;

/*
b) Podemos usar o |(pipe) para dizermos que a variável pode receber mais de um tipo
de variável
*/

let meuNumero: number | string = 12

meuNumero = "teste"

//e)
enum arcoiris {
    VERMELHO = "Vermelho",
    LARANJA = "Laranja",
    AMARELO = "Amarelo",
    VERDE = "Verde",
    AZUL = "Azul",
    ANIL = "Anil",
    VIOLETA = "Violeta"
}

//c)
type pessoa = {
    nome: string,
    idade: number,
    corFavorita: arcoiris
}

const objeto1: pessoa = {
    nome:"Alguém",
    idade: 23,
    corFavorita: arcoiris.AMARELO
}

//d)

const objeto2: pessoa = {
    nome: "Um outro alguém",
    idade: 31,
    corFavorita: arcoiris.AZUL
}

const objeto3: pessoa = {
    nome: "Outra pessoa aleatória",
    idade: 46,
    corFavorita: arcoiris.LARANJA
}

const objeto4: pessoa = {
    nome: "Astrodev",
    idade: 666,
    corFavorita: arcoiris.VERDE
}
