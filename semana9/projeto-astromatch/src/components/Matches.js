import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios';

const DivMatches = styled.div`
  height: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 5px;
  }
  &::-webkit-scrollbar-thumb{
    background: #8f8c8c;
    border-radius: 8px;
  }
`

const DivLista = styled.div`
  height: 50px;
  padding: 8px;
  display: flex;
  justify-content: left;
  :hover{
    background-color: #dedede;
  }
`

const FotoPerfil = styled.img`
  max-height: 100%;
  width: 50px;
  border-radius: 50%;
  margin-right: 8px;
`

const Matches = () => {
  const [lista, setLista] = useState([])

  useEffect(()=>{
    axios
      .get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mauro-neto-julian/matches")
      .then(resposta =>{
        return setLista(resposta.data.matches)
      })
      .catch(error => {
        return alert(`Erro ao carregar lista`)
      })
  }, [setLista])

  return (
      <DivMatches>
        {lista.map(perfil=>{
          return(
            <DivLista>
              <FotoPerfil src={perfil.photo} />
              <p>{perfil.name}</p>
            </DivLista>
          )
        })}
      </DivMatches>
  );
}

export default Matches;
