"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labenews";
const pegarAssinantes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assinantes = yield axios_1.default.get(`${baseUrl}/subscribers/all`);
        return assinantes.data.map((response) => {
            return {
                id: response.id,
                name: response.name,
                email: response.email
            };
        });
    }
    catch (error) {
        console.log(error);
    }
});
const criarNoticia = (titulo, conteudo, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = {
            title: titulo,
            content: conteudo,
            date: data
        };
        yield axios_1.default.put(`${baseUrl}/news`, body);
        console.log("Notícia criada com sucesso");
    }
    catch (error) {
        console.log(error);
    }
});
const enviarNotificacoes = (assinantes, mensagem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arrayDePromises = [];
        for (const assinante of assinantes) {
            arrayDePromises.push(axios_1.default.post(`${baseUrl}/notifications/send`, {
                subscriberId: assinante.id,
                message: mensagem
            }));
        }
        yield Promise.all(arrayDePromises);
        console.log("Todas as notificações enviadas");
    }
    catch (error) {
        console.log(error);
    }
});
const criarAssinante = (nome, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = {
            name: nome,
            email
        };
        yield axios_1.default.put(`${baseUrl}/subscribers`, body);
        console.log("Assinante criado com sucesso");
    }
    catch (error) {
        console.log(error);
    }
});
const criarNoticiaENotificar = (titulo, conteudo, data, assinantes, mensagem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield criarNoticia(titulo, conteudo, data);
        yield enviarNotificacoes(assinantes, mensagem);
    }
    catch (error) {
        console.log(error);
    }
});
const pegarNotificacoes = (assinantes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arrayDePromises = [];
        for (const assinante of assinantes) {
            arrayDePromises.push(axios_1.default.get(`${baseUrl}/subscribers/${assinante.id}/notifications/all`));
        }
        const resposta = yield Promise.all(arrayDePromises);
        const dados = resposta.map(resp => resp.data);
        return dados;
    }
    catch (error) {
        console.log(error);
    }
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const assinantes = yield pegarAssinantes();
    console.log(assinantes);
    yield pegarNotificacoes(assinantes);
});
main();
//# sourceMappingURL=index.js.map