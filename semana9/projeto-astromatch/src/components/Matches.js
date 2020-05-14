import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios';

const DivMatches = styled.div`
  text-align: center;
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
  cursor: pointer;
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

const Matches = (props) => {
  return (
      <DivMatches>
        {!props.lista && <p>Carregando lista de matches</p>}
        {props.lista && props.lista.map(perfil=>{
          return(
            <DivLista onClick={()=>props.recebeInfo(perfil)}>
              <FotoPerfil src={perfil.photo} />
              <p>{perfil.name}</p>
            </DivLista>
          )
        })}
      </DivMatches>
  );
}

export default Matches;
