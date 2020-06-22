let minhaString = "teste";
let meuNumero = 12;
meuNumero = "teste";
var arcoiris;
(function (arcoiris) {
    arcoiris["VERMELHO"] = "Vermelho";
    arcoiris["LARANJA"] = "Laranja";
    arcoiris["AMARELO"] = "Amarelo";
    arcoiris["VERDE"] = "Verde";
    arcoiris["AZUL"] = "Azul";
    arcoiris["ANIL"] = "Anil";
    arcoiris["VIOLETA"] = "Violeta";
})(arcoiris || (arcoiris = {}));
const objeto1 = {
    nome: "Alguém",
    idade: 23,
    corFavorita: arcoiris.AMARELO
};
const objeto2 = {
    nome: "Um outro alguém",
    idade: 31,
    corFavorita: arcoiris.AZUL
};
const objeto3 = {
    nome: "Outra pessoa aleatória",
    idade: 46,
    corFavorita: arcoiris.LARANJA
};
const objeto4 = {
    nome: "Astrodev",
    idade: 666,
    corFavorita: arcoiris.VERDE
};
//# sourceMappingURL=exercicio1.js.map