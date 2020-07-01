import {Client} from './classes/Client'
import {Place} from './classes/Place'
import { Residence } from './classes/Residence';
import { Commerce } from './classes/Commerce';
import { Industry } from './classes/Industry';
import { ResidentialClient } from './classes/ResidentialClient';
import { ClientManager } from './classes/ClientManager';
import { ComercialClient } from './classes/CommercialClient';
import { IndustrialClient } from './classes/IndustrialClient';

//Exercício 1
const client: Client = {
    name: "Mauro",
    registrationNumber: 1,
    consumedEnergy: 230,

    calculateBill(): number {
        return this.consumedEnergy * 0.75
    }
}

console.log(client.name);
console.log(client.registrationNumber);
console.log(client.consumedEnergy);
console.log(client.calculateBill());

//a
//Conseguimos imprimir todas as propriedades, uma vez que não temos
//encapsulamento em interfaces


//Exercício 2
//a
//const place = new Place()
//"Cannot create an instance of an abstract class"

//b
//Poderia ser transformando ela em uma classe não abstrata ou
//criando uma outra classe que utilize a classe Place como superclasse(pai)


//Exercício 3
const residencia = new Residence(3, "48600-000");
const comercio = new Commerce(2, "48601-000");
const industria = new Industry(2, "51030-000");

console.log(residencia.getCep())
console.log(comercio.getCep())
console.log(industria.getCep())


//Exercício 4
//a
//Ela deve possuir os métodos e propriedades dela, da classe pai e da interface


//Exercício 5
//a
//Ela é semelhante na maneira em que é contruída, tendo uma classe pai e uma interface

//b
//As diferenças são as propriedades do Commerce, que são diferentes das propriedades 
//de Residence, o valor da tarifa e o cnpj, que no Residential era cpf


//Exercício 6
//a
//Ela deve ser filha de Industry, porque tem propriedades específicas de indústria

//b
//Ela deve implementar a interface Client, pois ela é um cliente do mesmo jeito

//c
//Porque o cálculo da energia dela é feita utilizando 2 propriedades


//Exercícios 7 e 8
//Implementação

const gerenciador = new ClientManager;

const clienteResidencial = new ResidentialClient("Goli", 2, 100, "11111111111", 1, "01001-000")
gerenciador.registerClient(clienteResidencial);

const clienteComercial = new ComercialClient("Pequeno comércio", 3, 180, "01001001000101", 2, "00110000")
gerenciador.registerClient(clienteComercial);

const clienteIndustrial = new IndustrialClient("Uma indústria qualquer", 4, 1300, "1", 5, "10011100")
gerenciador.registerClient(clienteIndustrial);

console.log(gerenciador.getClientsQuantity())