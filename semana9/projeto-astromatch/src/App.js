import React, { useState, useEffect } from 'react';
import logo from './img/logo.png';
import styled from 'styled-components'
import Inicio from './components/Inicio';
import Matches from './components/Matches';
import Detalhes from './components/Detalhes';
import axios from 'axios';
import PeopleIcon from '@material-ui/icons/People';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Badge from '@material-ui/core/Badge';

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
  display: flex;
`

const Logo = styled.img`
  height: 100%;
`

const IconeCurtidas = styled(PeopleIcon)`
  cursor: pointer;
  color: #820095;
`

const IconeVoltar = styled(ArrowBackIcon)`
  cursor: pointer;
  color: #34AAA9;
`

const App = () => {
  const [secao, setSecao] = useState("inicio")
  const [perfilCarregado, setPerfilCarregado] = useState(undefined)
  const [listaDeMatches, setListaDeMatches] = useState(undefined)
  const [perfilSelecionado, setPerfilSelecionado] = useState(undefined)

  const mudaSecao = (event) => {
    setSecao(event.currentTarget.getAttribute("value"))
  }

  useEffect(()=>{
    carregaPerfil();
    carregaLista();
  }, [])

  const carregaPerfil = () => {
    setPerfilCarregado(undefined);
    axios
    .get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mauro-neto-julian/person")
    .then(resposta=>{
      return setPerfilCarregado(resposta.data.profile)
    })
    .catch(error => {
      return alert("Erro ao carregar perfil")
    })
  }

  const carregaLista = () =>{
    axios
    .get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mauro-neto-julian/matches")
    .then(resposta =>{
      return setListaDeMatches(resposta.data.matches)
    })
    .catch(error => {
      return alert(`Erro ao carregar lista`)
    })
  }

  const recarrega = () => {
    carregaPerfil();
    carregaLista();
  }

  const recebeInfo = (perfil) => {
    setPerfilSelecionado(perfil)
    setSecao("detalhes")
  }

  const limparSwipes = () => {
    axios
      .put("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mauro-neto-julian/clear")
      .then(resposta =>{
        return (alert("Lista de swipes apagada com sucesso!"), carregaLista(), carregaPerfil())
      })
      .catch(error => {
        return alert("Erro ao apagar lista, tente novamente")
      })
  }

  let secaoCarregada = undefined;

  switch(secao){
    case "matches":
      secaoCarregada = (
        <DivInterna>
            <Header>
              <IconeVoltar onClick={mudaSecao} value="inicio" />
              <Logo src={logo} />
              <DivEspaco />
            </Header>
            <Matches recebeInfo={recebeInfo} lista={listaDeMatches} />
          </DivInterna>
      )
      break;
    case "detalhes":
        secaoCarregada = (
          <DivInterna>
            <Header>
              <IconeVoltar onClick={mudaSecao} value="matches" />
              <Logo src={logo} />
              <DivEspaco />
            </Header>
            <Detalhes perfil={perfilSelecionado} />
          </DivInterna>
        )
      break;
    default:
      secaoCarregada = (
        <DivInterna>
            <Header>
              <DivEspaco />
              <Logo src={logo} />
              {listaDeMatches 
                ? <Badge badgeContent={listaDeMatches.length} color="secondary">
                      <IconeCurtidas onClick={mudaSecao} value="matches" />
                  </Badge>
                : <IconeCurtidas onClick={mudaSecao} value="matches" />
              }
            </Header>
            <Inicio perfil={perfilCarregado} recarrega={recarrega} />
          </DivInterna>
        )
    break;
  }

  return (
    <DivApp>
      <button onClick={limparSwipes}>Limpar swipes e matches</button>
      {secaoCarregada}
    </DivApp>
  );
}

export default App;
