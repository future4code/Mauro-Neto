import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import axios from 'axios'


const DivInicio = styled.div`
  text-align: center;
  padding: 15px;
  display: grid;
  grid-template-rows: 400px 1fr;
`

const DivPerfil = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Blur = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.imagem});
  filter: blur(10px);
  z-index: 1;
  position: absolute;
  top: 0;
`

const FotoPerfil = styled.img`
  max-width: 100%;
  max-height: 100%;
  z-index: 2;
`

const DivDados = styled.div`
  position: absolute;
  bottom: 5px;
  left: 12px;
  z-index: 3;
  color: #fff;
  text-align: left;
`

const NomePerfil = styled.h2`
  margin: 0;
  display: inline-block;
`

const IdadePerfil = styled.p`
  margin: 0 8px;
  font-size: 1.5em;
  display: inline-block;
`

const Descricao = styled.p`
  margin: 8px 0;
  font-size: 1.2em;
`

const DivEscolhas = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const Botao = styled.button`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #ff0000;
  font-size: 1.4em;
  font-weight: bold;
  color: #ff0000;
  :hover{
    background-color: #ff0000;
    color: #ffffff;
    transform: scale(1.1);
    transition: all 0.7s;
  }
  :last-child{
    border: 1px solid #34AAA9;
    color: #34AAA9;
    :hover{
      background-color: #34AAA9;
      color: #ffffff;
    }
  }
`

const Inicio = () => {
  const [perfil, setPerfil] = useState({})

  useEffect(()=>{
    axios
      .get("https://us-central1-missao-newton.cloudfunctions.net/astroMatch/mauro-neto-julian/person")
      .then(resposta=>{
        setPerfil(resposta.data.profile)
        console.log(resposta.data.profile)
      })
      .catch(error => {
        return alert(`Status do erro: ${error.response.status}\nMensagem: ${error.response.data.message}`)
      })
  }, [setPerfil])

  return (
      <DivInicio>
        <DivPerfil>
          <Blur imagem={perfil.photo} />
          <FotoPerfil src={perfil.photo} alt={perfil.name} />
          <DivDados>
            <NomePerfil>{perfil.name},</NomePerfil>
            <IdadePerfil>{perfil.age}</IdadePerfil>
            <Descricao>{perfil.bio}</Descricao>
          </DivDados>
        </DivPerfil>
        <DivEscolhas>
          <Botao>X</Botao>
          <Botao><i class="fas fa-heart"></i></Botao>
        </DivEscolhas>
      </DivInicio>
  );
}

export default Inicio;
