const operacao = process.argv[2];
const num1 = Number(process.argv[3]);
const num2 = Number(process.argv[4]);
function calc(op, a, b) {
    switch (op.toLowerCase()) {
        case "add":
            return a + b;
        case "sub":
            return a - b;
        case "mult":
            return a * b;
        case "div":
            return a / b;
        case "mod":
            return a % b;
        default:
            break;
    }
}
console.log("Resposta: ", calc(operacao, num1, num2));
//# sourceMappingURL=exercicio2.js.map