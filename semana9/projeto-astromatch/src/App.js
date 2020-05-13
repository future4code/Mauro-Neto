import React, { useState } from 'react';
import logo from './img/logo.png';
import './Icons.css';
import styled from 'styled-components'
import Inicio from './components/Inicio';
import Matches from './components/Matches';
import axios from 'axios';


const DivApp = styled.div`
  margin: 0;
  padding: 0%;
  background-color: #d0d0d0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DivInterna = styled.div`
  width: 400px;
  height: 90vh;
  margin-top: 5px;
  border: 1px solid black;
  background-color: #fff;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 400px;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dedede;
  padding: 0 12px;
`

const DivEspaco = styled.div`
  width: 1.4em;
`

const Logo = styled.img`
  height: 100%;
`

const App = () => {
  const [inicio, setInicio] = useState(true)

  const mudaParaMatches = () => {
    setInicio(!inicio)
  }

  const limparSwipes = () => {
    axios
      .put("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mauro-neto-julian/clear")
      .then(resposta =>{
        return alert("Lista de swipes apagada com sucesso!")
      })
      .catch(error => {
        return alert("Erro ao apagar lista, tente novamente")
      })
  }

  return (
    <DivApp>
      <button onClick={limparSwipes}>Limpar swipes e matches</button>
      
      {inicio 
        ? <DivInterna>
            <Header>
              <DivEspaco />
              <Logo src={logo} />
              <i class="fas fa-user-friends" onClick={mudaParaMatches}></i>
            </Header>
            <Inicio />
          </DivInterna>
        : <DivInterna>
            <Header>
              <i class="fas fa-arrow-left" onClick={mudaParaMatches}></i>
              <Logo src={logo} />
              <DivEspaco />
            </Header>
            <Matches />
          </DivInterna>
      }
    </DivApp>
  );
}

export default App;
