"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
moment.locale("pt-br");
const arrayEventos = [
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
];
for (let ev of arrayEventos) {
    console.log(`Nome: ${ev.nome}`);
    console.log(`Horário de início: ${ev.dataInicio.format("dddd, DD [de] MMMM [de] YYYY, HH:mm")}`);
    console.log(`Horário de início: ${ev.dataFim.format("DD [de] MMMM [de] YYYY, HH:mm")}`);
    console.log(`Descrição: ${ev.descricao}\n`);
}
for (let ev of arrayEventos) {
    const duracao = ev.dataFim.diff(ev.dataInicio, "minutes");
    const diaDeHoje = moment();
    const diasAteEvento = ev.dataInicio.diff(diaDeHoje, "days");
    console.log(`Nome: ${ev.nome}`);
    console.log(`Horário de início: ${ev.dataInicio.format("dddd, DD [de] MMMM [de] YYYY, HH:mm")}`);
    console.log(`Horário de início: ${ev.dataFim.format("DD [de] MMMM [de] YYYY, HH:mm")}`);
    console.log(`Descrição: ${ev.descricao}`);
    console.log(`Duração: ${duracao} minutos`);
    console.log(`Dias até o evento: ${diasAteEvento}\n`);
}
function criarEvento(dataInicio, dataFim, nome, descricao) {
    const diaDeHoje = moment();
    if (!dataInicio || !dataFim || !nome || !descricao) {
        console.log("Erro ao criar evento, algum argumento faltando");
    }
    else if (dataInicio.diff(diaDeHoje, "days") < 0) {
        console.log("Data do evento não pode ser antes do dia atual");
    }
    else if (dataFim.diff(dataInicio, "minutes") < 0) {
        console.log("Horário de início não pode ser menor que o horário fim");
    }
    else {
        arrayEventos.push({
            nome,
            descricao,
            dataInicio,
            dataFim
        });
    }
    console.log(arrayEventos);
}
criarEvento(moment(process.argv[2], "DD/MM/YYYY HH:mm"), moment(process.argv[3], "DD/MM/YYYY HH:mm"), process.argv[3], process.argv[4]);
//# sourceMappingURL=index.js.map