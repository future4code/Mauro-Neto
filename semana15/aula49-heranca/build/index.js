"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./classes/User");
const Customer_1 = require("./classes/Customer");
const Employee_1 = require("./classes/Employee");
const moment = require("moment");
const Seller_1 = require("./classes/Seller");
const usuario = new User_1.User("1", "astrodev@gmail.com", "Astrodev", "123456");
console.log(usuario.getId());
console.log(usuario.getName());
console.log(usuario.getEmail());
const consumidor = new Customer_1.Customer("2", "jmauroneto@gmail.com", "Mauro Neto", "123456", "1234 1234 1234 1234");
console.log(consumidor.getId());
console.log(consumidor.getName());
console.log(consumidor.getEmail());
console.log(consumidor.purchaseTotal);
console.log(consumidor.getCreditCard());
console.log(consumidor.introduceYourself());
const empregado = new Employee_1.Employee("3", "estagiario@teste.com", "estagiario", "654321", moment(), 1000);
console.log(empregado.getId());
console.log(empregado.getName());
console.log(empregado.getEmail());
console.log(empregado.getAdmissionDate());
console.log(empregado.getBaseSalary());
console.log(empregado.calculateTotalSalary());
const vendedor = new Seller_1.Seller("4", "a@a.com", "vendedor", "456123", moment(), 1400);
console.log(vendedor.getId());
console.log(vendedor.getName());
console.log(vendedor.getEmail());
console.log(vendedor.getAdmissionDate());
console.log(vendedor.getBaseSalary());
console.log(vendedor.calculateTotalSalary());
vendedor.setSalesQuantity(10);
console.log(vendedor.getSalesQuantity());
console.log(vendedor.calculateTotalSalary());
//# sourceMappingURL=index.js.map