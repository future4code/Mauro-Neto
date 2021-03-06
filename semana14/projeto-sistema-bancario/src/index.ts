import * as moment from 'moment'
import * as fs from 'fs'

moment.locale("pt-br");

type Conta = {
    nome: string,
    cpf: string,
    nascimento: moment.Moment,
    saldo: number,
    extrato: Transacoes[]
}

type Transacoes = {
    descricao: string,
    valor: number,
    data: moment.Moment
}

const pegarContas = (): Conta[]=>{
    const contas: Conta[] = JSON.parse(fs.readFileSync('contas.json', 'utf-8'))
    
    return contas;
}

const criarConta = (contas: Conta[], nome: string, cpf:string, nascimento: moment.Moment):  void=>{
    if(contas.find(conta => conta.cpf === cpf) || cpf.length !==11){
        if(cpf.length !== 11){
            console.log("CPF precisa ter 11 numeros")
            return;
        }
        console.log("CPF já cadastrado em outra conta")
        return;
    }

    const diaDeHoje = moment();
    const idade = diaDeHoje.diff(nascimento, "years");
    
    if(idade<18){
        console.log("Menores de 18 anos não podem abrir contas");
        return;
    }
    

    const novaConta: Conta = {
        nome, 
        cpf, 
        nascimento, 
        saldo: 0,
        extrato: []
    }

    contas.push(novaConta)
    fs.writeFileSync('contas.json', JSON.stringify(contas, null, 2))
}

const verificarSaldo = (contas: Conta[], nome: string, cpf: string): void =>{
    const conta:Conta = contas.find(conta=>conta.cpf===cpf && conta.nome===nome);
    if(!conta){
        console.log("Conta não encontrada para esse nome e cpf")
        return;
    }
    console.log("Saldo: ",conta.saldo);
}

const adicionarSaldo = (contas: Conta[], nome:string, cpf: string, valor: number): void => {
    const conta:number = contas.findIndex(conta=>conta.cpf===cpf && conta.nome===nome);
    
    if(conta===-1){
        console.log("Conta não encontrada para esse nome e cpf")
        return;
    }

    contas[conta].saldo+=valor;
    contas[conta].extrato.push({descricao: "Depósito", valor, data: moment()})

    fs.writeFileSync('contas.json', JSON.stringify(contas, null, 2))
}

const pagarConta = (contas: Conta[], nome: string, cpf: string, valor: number, descricao: string, data?: moment.Moment): void =>{
    const conta:number = contas.findIndex(conta=>conta.cpf===cpf && conta.nome===nome);
    
    if(conta===-1){
        console.log("Conta não encontrada para esse nome e cpf")
        return;
    }

    const diaDeHoje = moment();
    if(!data){
        data = diaDeHoje;
    }

    const diferencaDataEHoje = data.diff(diaDeHoje, "days")

    if(diferencaDataEHoje < 0){
        console.log("Operação não pode ser anterior ao dia atual");
        return;
    }

    if(contas[conta].saldo<valor){
        console.log("Saldo insuficiente")
        return;
    }

    contas[conta].saldo-=valor;
    contas[conta].extrato.push({descricao, valor: -valor, data});
    fs.writeFileSync('contas.json', JSON.stringify(contas, null, 2));

    console.log("Conta paga com sucesso!");
}

const transferencia = (contas: Conta[], nome: string, cpf: string, nomeDestino: string, cpfDestino: string, valor: number): void => {
    const contaOrigem:number = contas.findIndex(conta=>conta.cpf===cpf && conta.nome===nome);
    const contaDestino:number = contas.findIndex(conta=>conta.cpf===cpfDestino && conta.nome===nomeDestino);

    if(contaOrigem===-1){
        console.log("Conta origem não encontrada para esse nome e cpf")
        return;
    }

    if(contaDestino===-1){
        console.log("Conta destino não encontrada para esse nome e cpf")
        return;
    }

    if(contas[contaOrigem].saldo<valor){
        console.log("Saldo insuficiente")
        return;
    }

    contas[contaOrigem].saldo-=valor;
    contas[contaOrigem].extrato.push({descricao: `Transferência para ${contas[contaDestino].nome}`, valor: -valor, data: moment()})
    contas[contaDestino].saldo+=valor;
    contas[contaDestino].extrato.push({descricao: `Transferência de ${contas[contaOrigem].nome}`, valor, data: moment()});

    fs.writeFileSync('contas.json', JSON.stringify(contas, null, 2));

    console.log("Transferência realizada com sucesso!")
}

const verificarExtrato = (contas: Conta[], nome: string, cpf: string): void => {
    const conta:Conta = contas.find(conta=>conta.cpf===cpf && conta.nome===nome);
    if(!conta){
        console.log("Conta não encontrada para esse nome e cpf")
        return;
    }
    console.log("Extrato: ",conta.extrato);
}

const main = () => {
    const contas = pegarContas();
    //criarConta(contas, "teste", "05434412569", moment("05/11/2001", "DD/MM/YYYY"));

    verificarSaldo(contas, "teste", "05434412569");
    
    //adicionarSaldo(contas, "teste", "05434412569", 300)

    //pagarConta(contas, "teste", "05434412569", 25, "uma conta qualquer", moment("26/06/2020", "DD/MM/YY"));

    //transferencia(contas, "teste", "05434412569", "teste", "71650703777", 25)

    //verificarExtrato(contas, "teste", "05434412569");
}

main();