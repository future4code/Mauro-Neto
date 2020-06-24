import * as moment from 'moment'
moment.locale("pt-br");

//Exercício 1
//a
type evento = {
    nome: string,
    descricao: string,
    dataInicio: moment.Moment,
    dataFim: moment.Moment
}

//b
const arrayEventos: evento[] = [
    {
        nome: "Um evento qualquer",
        descricao: "Olá, sou um evento",
        dataInicio: moment("01/06/2020 00:00", "DD/MM/YYYY HH:mm"),
        dataFim: moment("30/06/2020 23:59", "DD/MM/YYYY HH:mm"),
    },
    {
        nome: "São João",
        descricao: "Dizem ser o melhor evento do ano",
        dataInicio: moment("24/06/2020 00:00", "DD/MM/YYYY HH:mm"),
        dataFim: moment("24/06/2020 23:59", "DD/MM/YYYY HH:mm"),
    }
]


//Exercício 2
//a
for(let ev of arrayEventos){
    console.log(`Nome: ${ev.nome}`)
    console.log(`Horário de início: ${ev.dataInicio.format("dddd, DD [de] MMMM [de] YYYY, HH:mm")}`)
    console.log(`Horário de início: ${ev.dataFim.format("DD [de] MMMM [de] YYYY, HH:mm")}`)
    console.log(`Descrição: ${ev.descricao}\n`)
}

//b
//setar o moment.locale para "en-gb" e adicionar 3 horas a cada um dos horários, 
//com o método .add(3,"hours")

//Exercício 3
for(let ev of arrayEventos){
    const duracao:number = ev.dataFim.diff(ev.dataInicio, "minutes");
    const diaDeHoje:moment.Moment = moment();
    const diasAteEvento:number = ev.dataInicio.diff(diaDeHoje, "days");

    console.log(`Nome: ${ev.nome}`)
    console.log(`Horário de início: ${ev.dataInicio.format("dddd, DD [de] MMMM [de] YYYY, HH:mm")}`)
    console.log(`Horário de início: ${ev.dataFim.format("DD [de] MMMM [de] YYYY, HH:mm")}`)
    console.log(`Descrição: ${ev.descricao}`)
    console.log(`Duração: ${duracao} minutos`)
    console.log(`Dias até o evento: ${diasAteEvento}\n`)
}

//Exercício 4
function criarEvento(dataInicio?: moment.Moment, dataFim?: moment.Moment, nome?: string, descricao?: string): void{
    const diaDeHoje:moment.Moment = moment();
    
    if(!dataInicio || !dataFim || !nome || !descricao){
        console.log("Erro ao criar evento, algum argumento faltando")
        return;
    }

    const diferencaDiaAtual = dataInicio.diff(diaDeHoje, "days");
    const diferencaHoraInicio = dataFim.diff(dataInicio, "minutes"); 

    if(diferencaDiaAtual<0){
        console.log("Data do evento não pode ser antes do dia atual")
        return;
    }
    else if(diferencaHoraInicio<0){
        console.log("Horário de início não pode ser antes que o horário do fim")
        return;
    }
    
    arrayEventos.push({
        nome,
        descricao,
        dataInicio,
        dataFim
    })
    
    console.log(arrayEventos);
}

criarEvento(moment(process.argv[2], "DD/MM/YYYY HH:mm"), moment(process.argv[3], "DD/MM/YYYY HH:mm"), process.argv[3], process.argv[4])