import React from 'react';
import logo from './logo.svg';
import './App.css';
import Etapa1 from './components/Etapa1/Etapa1';



class App extends React.Component {
  state={
    etapa: 1
  }

  onClickProximaEtapa = (event) =>{
    console.log(event)
    this.setState({etapa: this.state.etapa + 1})
  }

  render (){
      switch(this.state.etapa){
        case 1:
          return <Etapa1 onClickProximaEtapa={this.onClickProximaEtapa} />
        case 2:
          return <p>TESTE</p>
        case 3:
          break;
      }
  }
}

export default App;
