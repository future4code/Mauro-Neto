"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const arrayEventos = [
    {
        nome: "Um evento qualquer",
        descricao: "Olá, sou um evento",
        dataInicio: moment("01/06/2020 00:00", "DD/MM/YYYY HH:mm"),
        dataFim: moment("30/06/2020 23:59", "DD/MM/YYYY HH:mm")
    },
    {
        nome: "São João",
        descricao: "Dizem ser o melhor evento do ano",
        dataInicio: moment("24/06/2024 00:00", "DD/MM/YYYY HH:mm"),
        dataFim: moment("24/06/2020 23:59", "DD/MM/YYYY HH:mm")
    }
];
console.log(arrayEventos);
//# sourceMappingURL=exercicio1.js.map