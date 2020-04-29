import React from 'react';
import styled from 'styled-components'
import Cadastro from './components/Cadastro';
import Lista from './components/Lista';
import Detalhes from './components/Detalhes';

const DivApp = styled.div`
  margin: 8px;
`

const BotaoMudar = styled.button`
  display: inline-block;
`

class App extends React.Component {
  state = {
    secao: '',
    id: ''
  }

  mudaSecao = (event) => {
    this.setState({secao: event.target.getAttribute("value")})
  }

  recebeId = (idClicado) => {
    this.setState({secao: "detalhes", id: idClicado})
  }

  voltaParaLista = () => {
    this.setState({secao: "lista", id: ''})
  }

  render(){
    switch(this.state.secao){
      case "lista":
        return(
          <DivApp>
              <BotaoMudar onClick={this.mudaSecao} value="cadastro">Ir para página de registro</BotaoMudar>
              <Lista pegaId={this.recebeId} />
            </DivApp>
        );
      case "detalhes":
        return(
          <DivApp>
            <Detalhes id={this.state.id} voltar={this.voltaParaLista} />
          </DivApp>
        );
      default:
        return(
          <DivApp>
            <BotaoMudar onClick={this.mudaSecao} value="lista">Ir para página de lista</BotaoMudar>
            <Cadastro />
          </DivApp>
        );
    }
  }
}

export default App;
