import React from 'react';
import styled from 'styled-components'
import logo from './logo.svg';
import './App.css';

const ListaTarefas = styled.ul`
  padding: 0;
  width: 200px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({status}) => (status ? 'line-through' : 'none')};
`

class App extends React.Component {
  state={
    valorInput: '',
    filtro: '',
    lista: [],
  }
  

  onChangeInput = (event) => {
    this.setState({valorInput: event.target.value})
  }

  onChangeFiltro = (event) => {
    this.setState({filtro: event.target.value})
  }

  atualizaLista = () => {
    const listaTarefas = (this.state.lista.filter((tarefa, index) =>{
        switch(this.state.filtro){
          case "pendentes":
            return !tarefa.status
          case "completas":
            return tarefa.status
          default:
            return true
        }
      }))
    return listaTarefas
  }

  mudaStatus = (id) => {
    const listaDeMensagens = this.state.lista;
    listaDeMensagens.forEach(tarefa => {
      if(tarefa.id === id){
        tarefa.status = !tarefa.status;
      }
    });
    this.setState({lista: listaDeMensagens})
  }

  adicionaTarefa = () => {
    if(!this.state.valorInput){
      return window.alert("Digite uma tarefa")
    }
    const listaTarefas = this.state.lista;
    const itemLista = {
      id: Date.now(),
      texto: this.state.valorInput,
      status: false
    }
    listaTarefas.push(itemLista)
    this.setState({lista: listaTarefas, valorInput: ''})
  }

  componentDidUpdate = () => {
    
  }

  render(){
    const listaDeTarefas = this.atualizaLista();
    return (
      <div className="App">
        <h1>Lista de Tarefas</h1>
        <div id="div-alinha">
          <input value={this.state.valorInput} onChange={this.onChangeInput} placeholder="Tarefa" />
          <button onClick={this.adicionaTarefa}>Adicionar</button>
        </div>
        <div id="div-alinha">
          <label for="filtro">Filtro</label>
          <select name="filtro" value={this.state.filtro} onChange={this.onChangeFiltro}>
            <option value="">Nenhum</option>
            <option value="pendentes">Pendentes</option>
            <option value="completas">Completas</option>
          </select>
        </div>
        <ListaTarefas>
          {listaDeTarefas.map((tarefa, index) => {
            return (
              <Tarefa key={index} status={tarefa.status} onClick={() => this.mudaStatus(tarefa.id)}>{tarefa.texto}</Tarefa>
            )
          })}
        </ListaTarefas>
      </div>
    );
  }
}

export default App;
