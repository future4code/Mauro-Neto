function operacoes(num1: number, num2: number): void{
    console.log("Soma: ", num1+num2)
    console.log("Subtração: ",num1-num2)
    console.log("Multiplicação: ", num1*num2)
    if(num1>num2){
        console.log("Maior número: ", num1)
    } else if(num2>num1){
        console.log("Maior número: ", num2)
    } else{
        console.log("Números iguais")
    }
}

operacoes(2,2)
operacoes(2,4)
operacoes(5,3)