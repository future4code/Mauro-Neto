const array = [
    { autor: "Algum", texto: "Qualquer" },
    { autor: "Autor", texto: "Um texto" },
    { autor: "Mais um autor", texto: "Olá, sou um texto" },
    { autor: "Outro autor", texto: "Mais um texto" },
    { autor: "Autor", texto: "texto" }
];
function filtraPosts(arr, aut) {
    const novoArray = arr.filter(item => (item.autor === aut));
    return novoArray;
}
console.log(filtraPosts(array, "Autor"));
//# sourceMappingURL=exercicio4.js.map