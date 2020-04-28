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

const BotaoBuscar = styled.button`
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
    

    render(){
        return(
            <ContainerLista>
                <h2>Usuários Cadastrados:</h2>
                <CampoBuscar>
                    <input type="text" placeholder="Buscar" />
                    <BotaoBuscar>Buscar</BotaoBuscar>
                </CampoBuscar>
                <UlUsuarios>
                    {this.state.listaDeUsuarios.map(usuario =>{
                        return (
                            <DivItem>
                                <li onClick={()=>this.props.pegaId(usuario.id)}>{usuario.name}</li>
                                <XVermelho onClick={()=>this.deletaItem(usuario.id)}>X</XVermelho>
                            </DivItem>
                        )
                    })}
                </UlUsuarios>
            </ContainerLista>
        );
    }
}

export default Lista;