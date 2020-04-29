import React from 'react';
import styled from 'styled-components'
import Labedex from './components/Labedex';
import Entediado from './components/Entediado';

const DivApp = styled.div`
  text-align: center;
`

class App extends React.Component {
  state={
    aplicacao: ''
  }

  onChangeAplicacao = (event) => {
    this.setState({aplicacao: event.target.value})
  }

  render(){
    switch(this.state.aplicacao){
      case "entediado":
        return (
          <DivApp>
            <p>Selecione a aplicação desejada</p>
            <select value={this.state.aplicacao} onChange={this.onChangeAplicacao}>
              <option value=""></option>
              <option value="entediado">Entediado (Bored API)</option>
              <option value="labedex">Labedex (Poke API)</option>
            </select>
            <Entediado />
          </DivApp>
        );
      case "labedex":
        return(
          <DivApp>
            <p>Selecione a aplicação desejada</p>
            <select value={this.state.aplicacao} onChange={this.onChangeAplicacao}>
              <option value=""></option>
              <option value="entediado">Entediado (Bored API)</option>
              <option value="labedex">Labedex (Poke API)</option>
            </select>
            <Labedex />
          </DivApp>
        );
      default:
        return (
          <DivApp>
            <h3>Bem-vindo</h3>
            <p>Selecione a aplicação desejada</p>
            <select value={this.state.aplicacao} onChange={this.onChangeAplicacao}>
              <option value=""></option>
              <option value="entediado">Entediado (Bored API)</option>
              <option value="labedex">Labedex (Poke API)</option>
            </select>
          </DivApp>
        );
    }
  }
}

export default App;