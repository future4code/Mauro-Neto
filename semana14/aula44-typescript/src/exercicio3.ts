function quantidadeNumeros(array: number[]): {qtd: any, qtdImpares:number, soma: number}{
    let impares:number = 0, somaArray:number = 0;

    for(let i=0; i<array.length; i++){
        if(array[i]%2==1){
            impares++;
        }
        somaArray+=array[i]
    }

    const objeto = {qtd: array.length, qtdImpares: impares, soma: somaArray}

    return objeto;
}

console.log(quantidadeNumeros([1,2,4,6,7,8,11]))