import axios, { AxiosPromise } from 'axios'

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labenews"

//Exercício 1
//a
//Deve ser utilziado o endpoint /subscribers/all, utilizando o método get

//b
//Para iniciar uma função assíncrona que retorna um array de qualquer coisa,
//primeiro temos que lembrar que o async retorna uma promise, e dentro dela,
//colocamos o tipo de dado de retorno. No caso, Promise<any[]>

//c
// async function pegarAssinantes(): Promise<any[]>{
//     try{
//         const assinantes = await axios.get(`${baseUrl}/subscribers/all`)
//         return assinantes.data;
//     }
//     catch(error){
//         console.log(error);
//     }
// }


//Exercício 2
//a
//Numa função nomeada, já é declarada a assincronicidade antes da própria função
//Numa arrow function, declaramos que ela é assíncrona antes dos parâmetros da função

//b
// const pegarAssinantes = async (): Promise<any[]> =>{
//     try{
//         const assinantes = await axios.get(`${baseUrl}/subscribers/all`)
//         return assinantes.data;
//     }
//     catch(error){
//         console.log(error);
//     }
// }

//Exercício 3
//a
//Não teremos problema de tipagem, pois o retorno da promise é justamente um array
//com o formato desse tipo criado

//b
//para garantir que o retorno da promisse é igual ao tipo esperado

//c
type Assinante = {
	id: string;
	name: string;
	email: string;
}

const pegarAssinantes = async (): Promise<Assinante[]> =>{
    try{
        const assinantes = await axios.get(`${baseUrl}/subscribers/all`)
        return assinantes.data.map((response: any) => {
            return {
                id: response.id,
                name: response.name,
                email: response.email
            }
        });
    }
    catch(error){
        console.log(error);
    }
}

//Exercício 4
//a
//Função assíncrona, porque o axios retorna uma promise, e precisamos esperar a resposta

//b
const criarNoticia = async (titulo: string, conteudo:string, data: number): Promise<void> => {
    try{
        const body = {
            title: titulo,
            content: conteudo,
            date: data
        }
        await axios.put(`${baseUrl}/news`, body);
        console.log("Notícia criada com sucesso")
    }
    catch(error){
        console.log(error)
    }
}

//Exercício 5
//a
//O comportamento é diferente do comportamento utilizando o for of
//Ao utilziar apenar o for of, a requisição é feita uma a uma, aguardando cada resposta
//enquanto  com funções de array, ele cria todas as requisições e volta todas as respostas

//b
// const enviarNotificacoes = async(assinantes: Assinante[], mensagem: string): Promise<void> =>{
//     try{
//         for(const assinante of assinantes){
//             console.log(`Iniciando notificação para assinante ${assinante.name}`)
//             await axios.post(`${baseUrl}/notifications/send`, {
//                 subscriberId: assinante.id,
//                 message: mensagem
//             })
//             console.log(`Assinante ${assinante.name} notificado`)
//         }
//         console.log(`Todos os assinantes notificados`);
//     }
//     catch(error){
//         console.log(error)
//     }
// }

//Exercício 6
//a
//O Promise.all junta todas as requisições, executa e retorna apenas com o retorno de todas

//b
//Porque enviamos todas as requisições juntas

//c
const enviarNotificacoes = async(assinantes: Assinante[], mensagem: string): Promise<void> =>{
    try{
        const arrayDePromises: Promise<any>[] = [];
        for(const assinante of assinantes){
            arrayDePromises.push(axios.post(`${baseUrl}/notifications/send`, {
                subscriberId: assinante.id,
                message: mensagem
            }))
        }
        await Promise.all(arrayDePromises);
        console.log("Todas as notificações enviadas")
    }
    catch(error){
        console.log(error)
    }
}

//Exercício 7
//a
const criarAssinante = async(nome: string, email: string): Promise<void> =>{
    try{
        const body = {
            name: nome,
            email
        }
        await axios.put(`${baseUrl}/subscribers`, body);
        console.log("Assinante criado com sucesso")
    }
    catch(error){
        console.log(error);
    }
}

const criarNoticiaENotificar = async (titulo: string, conteudo:string, data: number, assinantes: Assinante[], mensagem: string): Promise<void> => {
    try{
        await criarNoticia(titulo, conteudo, data);
        await enviarNotificacoes(assinantes, mensagem);
    }
    catch(error){
        console.log(error)
    }
}

const pegarNotificacoes = async (assinantes: Assinante[]): Promise<any>=>{
    try{
        const arrayDePromises: Promise<any>[] = []
        for(const assinante of assinantes){
            arrayDePromises.push(axios.get(`${baseUrl}/subscribers/${assinante.id}/notifications/all`))
        }

        const resposta = await Promise.all(arrayDePromises);

        const dados = resposta.map(resp => resp.data)

        return dados
    }
    catch(error){
        console.log(error);
    }
}


const main = async(): Promise<void> => {
    const assinantes: Assinante[] = await pegarAssinantes()
    console.log(assinantes);
    // await criarNoticia("Essa é uma nova notícia", "Sem conteúdo", Date.now())
    // await enviarNotificacoes(assinantes, "Notificando usuários")
    // await criarAssinante("Mauro", "jmauroneto@gmail.com")
    //await criarNoticiaENotificar("Essa é uma nova notícia", "Sem conteúdo", Date.now(), assinantes, "Notificando usuários")
    await pegarNotificacoes(assinantes)
}

main();