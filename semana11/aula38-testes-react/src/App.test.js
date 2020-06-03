import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const criarPost = () => {
    const post = render(<App />);
    const input = post.getByPlaceholderText("Novo post");
    const botao = post.getByText("Adicionar");

    fireEvent.change(input, {
        target: {
            value: 'test post'
        }
    })
    
    fireEvent.click(botao)

    return post;

}

test("Criar novo post", () => {
    const {getByText} = criarPost();

    expect(getByText("test post")).toBeInTheDocument();
})

test("Curtir post", () => {
    const {getByText} = criarPost();
    const botao = getByText("Curtir");

    fireEvent.click(botao);

    expect(botao).toHaveTextContent("Descurtir")
})

test("Apagar post", () => {
    const {getByText, queryByText} = criarPost();
    const botaoApagar = getByText("Apagar");
    fireEvent.click(botaoApagar);

    expect(queryByText("test post")).toEqual(null);
})

test("Verificar se o input foi limpo", () => {
    const {getByPlaceholderText} = criarPost();
    expect(getByPlaceholderText("Novo post")).toHaveValue('');
})

test(("Mensagem 'Nenhum post' quando lista estiver vazia"),()=>{
    const {getByText} = render(<App/>)
    expect(getByText("Nenhum post")).toBeInTheDocument();
})

test(("Mensagem 'Quantidade de posts: 1' quando a lista tiver um post"), () =>{
    const {getByText} = criarPost();
    expect(getByText("Quantidade de posts: 1")).toBeInTheDocument();
})

test(("Verificar se aparece mensagem de erro ao criar post vazio"), () => {
    const {getByText} = render(<App />);
    const botao = getByText("Adicionar");

    fireEvent.click(botao);

    expect(getByText("Você não pode criar um post vazio!")).toBeInTheDocument();
})

test(("Verificar se não aparece mensagem de erro ao criar post válido"), () => {
    const {queryByText} = criarPost();
    expect(queryByText("Você não pode criar um post vazio!")).toEqual(null)
})