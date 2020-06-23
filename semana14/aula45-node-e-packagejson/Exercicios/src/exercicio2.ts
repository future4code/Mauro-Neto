const operacao: string = process.argv[2]
const num1: number = Number(process.argv[3])
const num2: number = Number(process.argv[4])

function calc(op: string, a: number, b: number): number{
    switch(op.toLowerCase()){
        case "add":
            return a+b;
        case "sub":
            return a-b;
        case "mult":
            return a*b;
        case "div":
            return a/b;
        case "mod":
            return a%b;
        default:
            break;
    }
}

console.log("Resposta: ",calc(operacao, num1, num2));