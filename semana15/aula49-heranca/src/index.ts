import {User} from './classes/User'
import {Customer} from './classes/Customer'
import { Employee } from './classes/Employee';
import * as moment from 'moment'
import { Seller } from './classes/Seller';

//Exercício 1
const usuario = new User("1", "astrodev@gmail.com", "Astrodev", "123456");

//console.log(usuario.id)
//console.log(usuario.name)
//console.log(usuario.email)
//console.log(usuario.password)
//desse bloco, não conseguimos imprimir nada, pois todas
//as informações são privadas

console.log(usuario.getId())
console.log(usuario.getName())
console.log(usuario.getEmail())


//a
//Pelos métodos criados na classe, não tem nenhum método getter 
//para imprimir a senha (password)

//b
//O construtor é chamado uma vez a cada instância criada.


//Exercício 2
const consumidor = new Customer("2", "jmauroneto@gmail.com", "Mauro Neto", "123456", "1234 1234 1234 1234")

//a
//O construtor da classe Customer foi impressa uma vez, já que só tem uma
//instância do customer

//b
//O construtor da classe User foi impressa 2 vezes, uma vez com a const usuario
//e outra vez com a const consumidor, porque o construtor do Cosnumer chama
//o construtor do User através do super


//Exercício 3

// console.log(consumidor.id)
// console.log(consumidor.name)
// console.log(consumidor.email)
// console.log(consumidor.password)
// console.log(consumidor.purchaseTotal)
// console.log(consumidor.creditCard)
//Desses consoles.logs, conseguimos imprimir diretamente apenas o
//purchaseTotal, que é público

console.log(consumidor.getId())
console.log(consumidor.getName())
console.log(consumidor.getEmail())
console.log(consumidor.purchaseTotal)
console.log(consumidor.getCreditCard())

//a
//Não podemos imprimir a senha pelo mesmo motivo do exercício 1-a


//Exercício 4/5
console.log(consumidor.introduceYourself())


//Exercício 6
const empregado = new Employee("3", "estagiario@teste.com", "estagiario", "654321", moment(), 1000);

//a
//3, uma de cada instância criada

//b

// console.log(empregado.id)
// console.log(empregado.name)
// console.log(empregado.email)
// console.log(empregado.password)
//console.log(empregado.admissionDate)
//console.log(empregado.baseSalary)
//Desses consoles.logs, não conseguimos imprimir diretamente as
//informações, por serem protecteds

console.log(empregado.getId())
console.log(empregado.getName())
console.log(empregado.getEmail())
console.log(empregado.getAdmissionDate())
console.log(empregado.getBaseSalary())

//Com os getters conseguimos imprimir todas as informações que tem métodos criados


//Exercício 7
console.log(empregado.calculateTotalSalary());


//Exercício 8
const vendedor = new Seller("4", "a@a.com", "vendedor", "456123", moment(), 1400)

//a
//é necessário passar os mesmos parâmetros utilizados para criar 
//uma instância da classe pai (Employee)

//b
// console.log(vendedor.id)
// console.log(vendedor.name)
// console.log(vendedor.email)
// console.log(vendedor.password)
//console.log(vendedoradmissionDate)
//console.log(vendedorbaseSalary)
//Desses consoles.logs, não conseguimos imprimir diretamente as
//informações, por serem protecteds, assim como as do empregado, 
//já que é uma classe herdada

console.log(vendedor.getId())
console.log(vendedor.getName())
console.log(vendedor.getEmail())
console.log(vendedor.getAdmissionDate())
console.log(vendedor.getBaseSalary())
console.log(vendedor.calculateTotalSalary());

//Basicamente conseguimos imprimir as mesmas coisas que conseguíamos
//imprimir no empregado, já que é uma classe herdada


//Exercício 9
vendedor.setSalesQuantity(10);

//a
//não conseguimos acessar a salesQuantity diretamente,
//por ela ser private. Precisamos de um getter para acessar.

console.log(vendedor.getSalesQuantity());


//Exercício 10
console.log(vendedor.calculateTotalSalary());


//Exercício 11
//Implementações nas classes Seller e Employee