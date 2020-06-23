function quantidadeNumeros(array) {
    let impares = 0, somaArray = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 == 1) {
            impares++;
        }
        somaArray += array[i];
    }
    const objeto = { qtd: array.length, qtdImpares: impares, soma: somaArray };
    return objeto;
}
console.log(quantidadeNumeros([1, 2, 4, 6, 7, 8, 11]));
//# sourceMappingURL=exercicio3.js.map