//a) utilizamos o process.argv[posicao] onde a posição é cada uma das strings ("comandos")
//separados por espaços passados na inicialização do arquivo

//b)
const nome: string = process.argv[2]
const idade: number = Number(process.argv[3]);

console.log(`Olá, ${nome}! Você tem ${idade} anos.`)

//c)
console.log(`Olá, ${nome}! Você tem ${idade} anos. Em sete anos você terá ${idade+7}`)