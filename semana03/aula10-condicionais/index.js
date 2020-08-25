/* Exercícios de Interpretação

Exercício 1 
Primeiramente uma variável respostaDoUsuario recebe um valor do prompt
É criada outra variável utilizando o valor recebido na primeira variável convertida para tipo number
Em seguida, existe um condicional para testar a variável number.
A condição é verdadeira se o resto da divisão por 2 for igual a 0, ou seja, se o número for par,
imprimindo a mensagem "Passou no teste".
Se for ímpar, entra no else e imprime a mensagem "Não passou no teste."

Exercício 2
a. O código pede que o usuário digite uma fruta, em seguida passa por um condicional
e exibe uma mensagem com o preço da fruta escolhida

b. "O preço da fruta Maçã é R$ 2.25"

c. R$24,55

d. O código roda até encontrar o próximo break, ou seja, preco seria sobrescrito com o valor de 5
e sairía com esse valor, imprimindo "O preço da fruta  Pêra  é  R$  5"


Exercício 3
No console aparecerá um erro, pois a variável mensagem foi definida dentro do bloco if, 
sendo uma variávelde escopo local, que ao tentar acessar fora do if, é como se ela nunca tivesse
sido declarada.
*/

//Exercício 4
//a
let num1 = Number(prompt("Digite o primeiro número"))
let num2 = Number(prompt("Digite o segundo número"))
let temp

if(num2 > num1){
    temp=num1
    num1=num2
    num2=temp
}

console.log(num1, num2)

// Da maneira que está, se os números forem iguais, o código irá imprimir os números do mesmo jeito.

//b
num1 = Number(prompt("Digite o primeiro número"))
num2 = Number(prompt("Digite o segundo número"))
let num3 = Number(prompt("Digite o terceiro número"))

if(num3 > num2){
    temp=num3
    num3=num2
    num2=temp
}
if(num2 > num1){
    temp=num2
    num2=num1
    num1=temp
}
if(num3 < num2){
    temp=num3
    num3=num2
    num2=temp
}



console.log(num1, num2,num3)

//dessa forma ele também imprime os 3 números se forem iguais

num1 = Number(prompt("Digite o primeiro número"))
num2 = Number(prompt("Digite o segundo número"))
num3 = Number(prompt("Digite o terceiro número"))

if((num1===num2) &&  (num1===num3)){
    console.log("Digite ao menos um número diferente")
}

//Exercício 5

//a. https://drive.google.com/file/d/1E-7qsr7puZ_HT0oon_RK6BtleRxDaYtW/view?usp=sharing

//b.
const ossos = prompt("O animal tem ossos? [s/n]")
if(ossos === "s"){
    const pelos = prompt("O animal tem pelos? [s/n]")
    if(pelos === "s"){
        const racional = prompt("O animal é racional? [s/n]")
        if(racional === "s"){
            console.log("O animal é um ser humano")
        }
        else{
            console.log("O animal é um mamífero não humano")
        }
    }
    else{
        const penas = prompt("O animal tem penas? [s/n]")
        if(penas === "s"){
            console.log("O animal é uma ave")
        }
        else{
            const terreste = prompt("O animal é terreste? [s/n]")
            if(terreste === "s"){
                const anfibio = prompt("O animal passa parte da vida em ambiente aquático? [s/n]")
                if(anfibio==="s"){
                    console.log("O animal é um anfíbio")
                }
                else{
                    console.log("O animal é um réptil")
                }
            }
            else{
                console.log("O animal é um peixe")
            }
        }
    }
}
else{
    console.log("Animal invertebrado")
}


//Desafio

const nome = prompt("Nome completo")
const tipodejogo = prompt("IN indica internacional; e DO indica doméstico").toUpperCase()
let valor

if(tipodejogo === "IN" || tipodejogo === "DO"){
    const etapa = prompt("SF indica semi-final; DT indica decisão de terceiro lugar; e FI indica final").toUpperCase()
    if(etapa === "SF" || etapa === "DT" || etapa === "FI"){
        const categoria = Number(prompt("Opções 1, 2, 3 ou 4;"))
        if(categoria === 1 || categoria === 2 || categoria === 3 || categoria === 4){
            const qtd = Number(prompt("Quantidade de ingressos"))
            if(qtd>=0){
                if(etapa==="SF"){
                    switch(categoria){
                        case 1:
                            valor=1320;
                            break;
                        case 2:
                            valor=880;
                            break;
                        case 3:
                            valor=550;
                            break;
                        case 4:
                            valor=220;
                            break;
                    }
                    if(tipodejogo==="IN"){
                        valor/=4.1;
                        console.log("---Dados da compra---");
                        console.log("Nome do cliente: "+nome);
                        console.log("Tipo do jogo: Internacional");
                        console.log("Etapa do jogo: Semifinal");
                        console.log("Categoria: ", categoria);
                        console.log("Quantidade de Ingressos: ", qtd +" ingressos");
                        console.log("---Valores--- ");
                        console.log("Valor do ingresso: US$",valor.toFixed(2));
                        console.log("Valor total: US$", (valor*qtd).toFixed(2));
                    }
                    else{
                        console.log("---Dados da compra---");
                        console.log("Nome do cliente: "+nome);
                        console.log("Tipo do jogo: Nacional");
                        console.log("Etapa do jogo: Semifinal");
                        console.log("Categoria: ", categoria);
                        console.log("Quantidade de Ingressos: ", qtd +" ingressos");
                        console.log("---Valores--- ");
                        console.log("Valor do ingresso: R$",valor.toFixed(2));
                        console.log("Valor total: R$", (valor*qtd).toFixed(2));
                    }
                }
                if(etapa==="DT"){
                    switch(categoria){
                        case 1:
                            valor=660;
                            break;
                        case 2:
                            valor=440;
                            break;
                        case 3:
                            valor=330;
                            break;
                        case 4:
                            valor=170;
                            break;
                    }
                    if(tipodejogo==="IN"){
                        valor/=4.1;
                        console.log("---Dados da compra---");
                        console.log("Nome do cliente: "+nome);
                        console.log("Tipo do jogo: Internacional");
                        console.log("Etapa do jogo: Semifinal");
                        console.log("Categoria: ", categoria);
                        console.log("Quantidade de Ingressos: ", qtd +" ingressos");
                        console.log("---Valores--- ");
                        console.log("Valor do ingresso: US$",valor.toFixed(2));
                        console.log("Valor total: US$", (valor*qtd).toFixed(2));
                    }
                    else{
                        console.log("---Dados da compra---");
                        console.log("Nome do cliente: "+nome);
                        console.log("Tipo do jogo: Nacional");
                        console.log("Etapa do jogo: Semifinal");
                        console.log("Categoria: ", categoria);
                        console.log("Quantidade de Ingressos: ", qtd +" ingressos");
                        console.log("---Valores--- ");
                        console.log("Valor do ingresso: R$",valor.toFixed(2));
                        console.log("Valor total: R$", (valor*qtd).toFixed(2));
                    }
                }
                else{
                    switch(categoria){
                        case 1:
                            valor=1980;
                            break;
                        case 2:
                            valor=1320;
                            break;
                        case 3:
                            valor=880;
                            break;
                        case 4:
                            valor=330;
                            break;
                    }
                    if(tipodejogo==="IN"){
                        valor/=4.1;
                        console.log("---Dados da compra---");
                        console.log("Nome do cliente: "+nome);
                        console.log("Tipo do jogo: Internacional");
                        console.log("Etapa do jogo: Semifinal");
                        console.log("Categoria: ", categoria);
                        console.log("Quantidade de Ingressos: ", qtd +" ingressos");
                        console.log("---Valores--- ");
                        console.log("Valor do ingresso: US$",valor.toFixed(2));
                        console.log("Valor total: US$", (valor*qtd).toFixed(2));
                    }
                    else{
                        console.log("---Dados da compra---");
                        console.log("Nome do cliente: "+nome);
                        console.log("Tipo do jogo: Nacional");
                        console.log("Etapa do jogo: Semifinal");
                        console.log("Categoria: ", categoria);
                        console.log("Quantidade de Ingressos: ", qtd +" ingressos");
                        console.log("---Valores--- ");
                        console.log("Valor do ingresso: R$",valor.toFixed(2));
                        console.log("Valor total: R$", (valor*qtd).toFixed(2));
                    }
                }
            }
            else{
                console.log("Quantidade de ingressos inválida")
            }
        }
        else{
            console.log("Categoria inválida")
        }
    }
    else{
        console.log("Etapa inválida")
    }
}
else{
    console.log("Tipo de jogo inválido")
}