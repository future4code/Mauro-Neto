import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const ContainerLista = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px;
    box-sizing: border-box;
    margin: 30px auto;
    width: 40%;
`

const UlUsuarios = styled.ul`
    list-style-type: none;
    padding: 0;
    width: 80%;
`

const DivItem = styled.li`
    display:flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    margin: 10px;
`

const XVermelho = styled.span`
    color: red;
    cursor: pointer;
`

const CampoBuscar = styled.div`
    display: flex;
`

const BotaoLista = styled.button`
    margin-left: 8px;
    height: 30px;
    width: 25%;
    align-self: center;
    background-color: blue;
    color:white;
    border: none;
    :hover{
        opacity: 0.7;
        cursor: pointer;
    }
`

class Lista extends React.Component{
    state={
        listaDeUsuarios: [],
        inputBuscaPorNome: '',
        usuarioBuscado: ''
    }

    componentDidMount(){
        this.carregaLista();
    }

    carregaLista = () => {
        axios
            .get(
                "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
                {
                    headers:{
                        Authorization: "mauro-neto-julian"
                    }
                }
            )
            .then(resposta => {
                this.setState({listaDeUsuarios: resposta.data})
            })
            .catch(error => {
                return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
            });
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
                        this.carregaLista()
                    )
                })
                .catch(error=>{
                    return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
                })
        }
    }

    onChangeBuscaPorNome = (event) => {
        this.setState({inputBuscaPorNome: event.target.value})
    }

    buscaComEnter = (event) =>{
        if(event.key === 'Enter'){
            this.buscaNaLista();
        }
    }
    
    buscaNaLista = () => {
        if(!this.state.inputBuscaPorNome){
            return alert("Digite alguma coisa para buscar")
        }

        axios
            .get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/search?name=${this.state.inputBuscaPorNome}`,
                {
                    headers: {
                        Authorization: "mauro-neto-julian"
                    }
                }
            )
            .then(resposta =>{
                return this.setState({usuarioBuscado: resposta.data[0]})
            })
            .catch(error => {
                return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
            });
    }

    mostraLista = () =>{
        this.setState({usuarioBuscado: '', inputBuscaPorNome:''});
    }

    render(){
        if(!this.state.usuarioBuscado){
            return(
                <ContainerLista>
                    <h2>Usuários Cadastrados:</h2>
                    <CampoBuscar>
                        <input type="text" placeholder="Buscar por nome" value={this.state.inputBuscaPorNome} onChange={this.onChangeBuscaPorNome} onKeyDown={this.buscaComEnter}/>
                        <BotaoLista onClick={this.buscaNaLista}>Buscar</BotaoLista>
                    </CampoBuscar>
                    <UlUsuarios>
                        {this.state.listaDeUsuarios.map((usuario, index) =>{
                            return (
                                <DivItem>
                                    <li key={index} onClick={()=>this.props.pegaId(usuario.id)}>{usuario.name}</li>
                                    <XVermelho onClick={()=>this.deletaItem(usuario.id)}>X</XVermelho>
                                </DivItem>
                            )
                        })}
                    </UlUsuarios>
                </ContainerLista>
            );
        }
        return(
            <ContainerLista>
            <h2>Usuários Cadastrados:</h2>
            <CampoBuscar>
                <input type="text" placeholder="Buscar por nome" value={this.state.inputBuscaPorNome} onChange={this.onChangeBuscaPorNome} onKeyDown={this.buscaComEnter}/>
                <BotaoLista onClick={this.buscaNaLista}>Buscar</BotaoLista>
            </CampoBuscar>
            <UlUsuarios>
                <DivItem>
                    <li onClick={()=>this.props.pegaId(this.state.usuarioBuscado.id)}>{this.state.usuarioBuscado.name}</li>
                    <XVermelho onClick={()=>this.deletaItem(this.state.usuarioBuscado.id)}>X</XVermelho>
                </DivItem>
            </UlUsuarios>
            <BotaoLista onClick={this.mostraLista}>Retorna para lista</BotaoLista>
        </ContainerLista>
        );
    }
}

export default Lista;