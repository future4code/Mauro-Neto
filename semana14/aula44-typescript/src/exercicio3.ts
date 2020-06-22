function quantidadeNumeros(array: number[]): {qtd: number, qtdimpares:number, soma: number}{
    let tamanho, impares=0, somaArray=0;
    
    for(let i=0; i<array.length; i++){
        if(array[i]%2==1){
            impares++;
        }
        somaArray+=array[i]
    }
    
    return {
        array.length,
        impares,
        somaArray
    }
}