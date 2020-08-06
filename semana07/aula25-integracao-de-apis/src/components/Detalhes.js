import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const ContainerDetalhes = styled.div`
    text-align: center;
    margin: 0 auto;
    width: 40%;
`

const H3Estilizado = styled.h3`
    display: inline-block;
    margin-right: 5px;
`

const PEstilizado = styled.p`
    display: inline-block;
`

const Legenda = styled.label`
    display: block;
`

const BotoesDetalhes = styled.button`
    margin: 25px;
    width: 20%;
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


class Detalhes extends React.Component{
    state={
        usuario: {},
        edicao: false,
        inputNome: '',
        inputEmail: ''
    }

    componentDidMount(){
        this.mostraDetalhes(this.props.id)
    }

    mostraDetalhes = (id) =>{
        axios
            .get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
                {
                    headers:{
                        Authorization: "mauro-neto-julian"
                    }
                }
            )
            .then(resposta=>{
                return this.setState({usuario: resposta.data})
            })
            .catch(error=>{
                return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
            })
    }

    deletaItem = (id) => {
        if(window.confirm("Tem certeza de que dseja deletar?")){
            axios
                .delete(
                    `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
                    {
                        headers:{
                            Authorization: "mauro-neto-julian"
                        }
                    }
                )
                .then(resposta=>{
                    return(
                        alert("Usuário deletado com sucesso!"),
                        this.props.voltar()
                    )
                })
                .catch(error=>{
                    return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
                })
        }
    }

    abreEdicao = () => {
        this.setState({edicao: !this.state.edicao})
    }

    onChangeNome = (event) => {
        this.setState({inputNome: event.target.value})
    }

    onChangeEmail = (event) => {
        this.setState({inputEmail: event.target.value})
    }

    enviaComEnter = (event) =>{
        if(event.key === 'Enter'){
            this.salvaEdicao();
        }
    }

    salvaEdicao = () =>{
        if(!(this.state.inputNome) || (!this.state.inputEmail)){
            if(!this.state.inputNome){
                return alert("Digite um nome");
            }
            return alert("Digite um e-mail");
        }
        const body = {
            name: this.state.inputNome,
            email: this.state.inputEmail
        };

        axios
            .put(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${this.props.id}`, 
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
                    this.setState({name: '', email: '', edicao: false}),
                    this.mostraDetalhes(this.props.id)
                )
            })
            .catch(error =>{
                return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
            });
    }

    render(){
        if(!this.state.edicao){
            return(
                <ContainerDetalhes>
                    <h2>Detalhes do usuário</h2>
                    <div>
                        <H3Estilizado>Nome:</H3Estilizado>
                        <PEstilizado>{this.state.usuario.name}</PEstilizado>
                    </div>
                    <div>
                        <H3Estilizado>E-mail:</H3Estilizado>
                        <PEstilizado>{this.state.usuario.email}</PEstilizado>
                    </div>
                    <BotoesDetalhes onClick={this.abreEdicao}>Editar</BotoesDetalhes>
                    <BotoesDetalhes onClick={()=>this.deletaItem(this.props.id)}>Deletar item</BotoesDetalhes>
                    <BotoesDetalhes onClick={this.props.voltar}>Voltar para lista</BotoesDetalhes>
                </ContainerDetalhes>
            );
        }
        return(
            <ContainerDetalhes>
                    <h2>Detalhes do usuário</h2>
                    <div>
                        <Legenda for="nome">Nome:</Legenda>
                        <input type="text" name="nome" value={this.state.inputNome} onChange={this.onChangeNome} placeholder="Nome" />
                    </div>
                    <div>
                        <Legenda for="email">E-mail:</Legenda>
                        <input type="email" name="email" value={this.state.inputEmail} onChange={this.onChangeEmail} onKeyDown={this.editaComEnter} placeholder="Email" />
                    </div>
                    <BotoesDetalhes onClick={this.salvaEdicao}>Salvar</BotoesDetalhes>
                    <BotoesDetalhes onClick={this.abreEdicao}>Cancelar</BotoesDetalhes>
                </ContainerDetalhes>
        )
    }

}

export default Detalhes;