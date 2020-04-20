import React from 'react';
import logo from './logo.svg';
import './App.css';
import Etapa1 from './components/Etapa1/Etapa1';
import Etapa2 from './components/Etapa2/Etapa2';
import Etapa3 from './components/Etapa3/Etapa3';
import Fim from './components/Fim/Fim';



class App extends React.Component {
  state={
    etapa: 1,
    nome: '',
    idade: '',
    email: '',
    escolaridade: ''
  }

  onClickProximaEtapa = (event) =>{
    if(this.state.etapa === 1){
      this.setState({
        nome: event.nome,
        idade: event.idade,
        email: event.email,
        escolaridade: event.escolaridade
      })
    }
    this.setState({etapa: this.state.etapa + 1})
  }

  render (){
      switch(this.state.etapa){
        case 1:
          return <Etapa1 onClickProximaEtapa={this.onClickProximaEtapa} />
        case 2:
          return <Etapa2 onClickProximaEtapa={this.onClickProximaEtapa} />
        case 3:
          return <Etapa3 onClickProximaEtapa={this.onClickProximaEtapa} />
        case 4:
          return <Fim />
      }
  }
}

export default App;
