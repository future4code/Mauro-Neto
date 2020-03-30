const bool1 = true
const bool2 = false
const bool3 = !bool2

let resultado = bool1 && bool2 && bool3
console.log("a. ", resultado)

resultado = (bool2 || bool1) && !bool3
console.log("b. ", resultado)

resultado = !resultado && (bool1 || bool1)
console.log("c. ", resultado)

resultado = (resultado && (!bool1 || bool2)) && !bool3
console.log("d. ", resultado)

console.log("e. ", typeof resultado)


/* Questão 1
a.  false
b.  false
c.  true
d.  false
e.  boolean
*/

let array
console.log('I. ', array)

array = null
console.log('II. ', array)


array = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
console.log('III. ', array.length)

let i = 0
console.log('IV. ', array[i], " e ", array[i+1])

array[i+1] = 19
const valor = array[i+6]
console.log('V. ', array[i+1], " e ", valor)

i+=1
array[i] = array[i-1]
console.log('VI. ', array[i])

i = array.length - 1
array[i] = array[i-3]
const resultadoC = array[i]%array[1]
console.log('VII. ', resultadoC)


/* Questão 2

Respostas
a. declara-se o tipo de variável, nome da variável e tamanho entre colchetes. Ex:
let array[5]

b. 0

c. array.length

d. I.  undefined
index.js:31 II.  null
index.js:35 III.  11
index.js:38 IV.  3  e  4
index.js:42 V.  19  e  9
index.js:46 VI.  3
index.js:51 VII.  1

*/

console.log("Questões de escrita de código:")

console.log("Questão 1:")

let grausK = (77 - 32)*5/9 + 273.15;
console.log("a. 77°F = " + grausK + "K")

let grausF = 80*9/5 + 32
console.log("b. 80°C = " + grausF + "°F")

grausF = 30*9/5 + 32
grausK = (grausF - 32)*5/9 + 273.15
console.log("c. 30°C = " + grausF + "°F = " +grausK + "K")

let grausC = prompt("Digite os graus (em Celsius) que quer converter (apenas números)")
grausF = grausC*9/5 + 32
grausK = (grausF - 32)*5/9 + 273.15
console.log("d. " + grausC + "°C = " + grausF + "°F = " +grausK + "K")



console.log("Questão 2:")
let nome = prompt("Qual o seu nome?")
console.log("Resposta: " + nome)
let idade = prompt("Qual a sua idade?")
console.log("Resposta: " + idade)
let endereco = prompt("Qual o seu endereço?")
console.log("Resposta: " + endereco)
let cor = prompt("Qual a sua cor favorita?")
console.log("Resposta: " + cor)
let email = prompt("Qual o seu email?")
console.log("Resposta: " + email)


console.log("Questão 3:")
let consumo = prompt("Qual o seu consumo mensal em kwh? (apenas números)")
let porcentagem = prompt("Qual a porcentagem de desconto?")
consumo *= 0.05;
console.log("Valor a ser pago sem desconto: R$" + consumo.toFixed(2))
consumo = consumo - (consumo*(porcentagem/100));
console.log("Valor a ser pago com desconto: R$" +consumo.toFixed(2));

consumo = 280 * 0.05;
console.log("a. Valor a ser pago sem desconto: R$" + consumo.toFixed(2))
consumo = consumo - (consumo*(15/100));
console.log("Valor a ser pago com desconto: R$" +consumo.toFixed(2));