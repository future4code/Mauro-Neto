import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const ContainerCadastro = styled.div`
    display: flex;
    flex-direction: column;
    padding: 35px;
    box-sizing: border-box;
    margin: 30px auto;
    width: 30%;
    border: 1px solid black;
`

const Legenda = styled.label`
    display: block;
`

const BotaoSalvar = styled.button`
    margin-top: 20px;
    width: 30%;
    height: 30px;
    align-self: center;
    background-color: blue;
    color:white;
    border: none;
    :hover{
        opacity: 0.7;
        cursor: pointer;
    }
`

class Cadastro extends React.Component{
    state={
        nome: '',
        email: ''
    }

    onChangeNome = (event) => {
        this.setState({nome: event.target.value})
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    enviaComEnter = (event) =>{
        if(event.key === 'Enter'){
            this.salvaCadastro();
        }
    }

    salvaCadastro = () => {
        if(!(this.state.nome) || (!this.state.email)){
            if(!this.state.nome){
                return alert("Digite um nome");
            }
            return alert("Digite um e-mail");
        }
        const body = {
            name: this.state.nome,
            email: this.state.email
        };

        axios
            .post(
                "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", 
                body,
                {
                    headers:{
                        Authorization: "mauro-neto-julian"
                    }
                }
            )
            .then(resposta =>{
                return (
                    alert("Cadastro realizado com sucesso!"),
                    this.setState({nome: '', email: ''})
                )
            })
            .catch(error =>{
                return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
            });
    }

    render(){
        return(
            <ContainerCadastro>
                <Legenda for="nome">Nome:</Legenda>     
                <input type="text" name="nome" value={this.state.nome} onChange={this.onChangeNome} placeholder="Nome" />
                <Legenda for="email">E-mail:</Legenda>     
                <input type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} onKeyDown={this.enviaComEnter} placeholder="Email"/>
                <BotaoSalvar onClick={this.salvaCadastro}>Salvar</BotaoSalvar>
            </ContainerCadastro>
        );
    }
}

export default Cadastro;