import { primeiraLetraMaiuscula } from "./desafio2"

describe("Muda primeira letra de cada palavra para maiúscula", () => {
    test("Retorna 'Ola' para 'ola'", ()=>{
        const verifica = primeiraLetraMaiuscula("ola");
        expect(verifica).toEqual("Ola");
    })
    test("Retorna 'Ola, Mundo' para 'ola, mundo'", ()=>{
        const verifica = primeiraLetraMaiuscula("ola, mundo");
        expect(verifica).toEqual("Ola, Mundo");
    })
    test("Retorna 'Eu Sou O Bob, Aluno Da Labenu' para 'eu sou o bob, aluno da labenu'", ()=>{
        const verifica = primeiraLetraMaiuscula("eu sou o bob, aluno da labenu");
        expect(verifica).toEqual("Eu Sou O Bob, Aluno Da Labenu");
    })
})