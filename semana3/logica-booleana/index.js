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
II.  null
III.  11
IV.  3  e  4
V.  19  e  9
VI.  3
VII.  1

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
let porcentagem = prompt("Qual a porcentagem de desconto? (apenas numeros. Ex: se 15%, colocar apenas 15")
consumo *= 0.05;
console.log("Valor a ser pago sem desconto: R$" + consumo.toFixed(2))
consumo = consumo - (consumo*(porcentagem/100));
console.log("Valor a ser pago com desconto: R$" +consumo.toFixed(2));


console.log("Consumo de 280kWh e 15% de desconto")
consumo = 280 * 0.05;
console.log("a. Valor a ser pago sem desconto: R$" + consumo.toFixed(2))
consumo = consumo - (consumo*(15/100));
console.log("Valor a ser pago com desconto: R$" +consumo.toFixed(2));



console.log("Desafio:")
let lbParaKg = 20*0.453592
console.log("a. 20lb equivalem a "+lbParaKg+"kg");
let ozParaKg = 10*0.0283495
console.log("b. 10oz equivalem a "+ozParaKg.toFixed(5)+"kg");
let miParaM = 100*1609.34
console.log("c. 100mi equivalem a "+miParaM+"m");
let ftParaM = 50*0.3048
console.log("d. 50ft equivalem a "+ftParaM+"m");
let galParaL = 103.56*3.78541
console.log("e. 103,56gal equivalem a "+galParaL.toFixed(3)+"l");
let xicParaL = 450*0.24
console.log("f. 450xic equivalem a "+xicParaL+"l");

console.log("g.")
let lb = prompt("Digite o valor em lb para converter para kg")
lbParaKg = lb*0.453592
console.log("I. "+lb+"lb equivalem a "+lbParaKg+"kg");
let oz = prompt("Digite o valor em oz para converter para kg")
ozParaKg = oz*0.0283495
console.log("II. "+ oz +"oz equivalem a "+ozParaKg.toFixed(5)+"kg");
let mi = prompt("Digite o valor em mi para converter para m")
miParaM = mi*1609.34
console.log("III. "+mi+"mi equivalem a "+miParaM+"m");
let ft = prompt("Digite o valor em ft para converter para m")
ftParaM = ft*0.3048
console.log("IV. "+ft+"ft equivalem a "+ftParaM+"m");
let gal = prompt("Digite o valor em gal para converter para l")
galParaL = gal*3.78541
console.log("V. "+gal+"gal equivalem a "+galParaL.toFixed(3)+"l");
let xic = prompt("Digite o valor em xic para converter para kg")
xicParaL = xic*0.24
console.log("VI. "+xic+"xic equivalem a "+xicParaL+"l");