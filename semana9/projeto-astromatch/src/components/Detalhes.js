import React from 'react';
import styled from 'styled-components'

const DivDetalhes = styled.div`
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
    margin: 8px;
    text-align: left;
    align-self: start;
    justify-self: left;
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

const Detalhes = (props) => {
  return (
    <DivDetalhes>
        <DivPerfil>
            <Blur imagem={props.perfil.photo} />
            <FotoPerfil src={props.perfil.photo} />
        </DivPerfil>
        <DivDados>
            <NomePerfil>{props.perfil.name},</NomePerfil>
            <IdadePerfil>{props.perfil.age}</IdadePerfil>
            <Descricao>{props.perfil.bio}</Descricao>
        </DivDados>
    </DivDetalhes>
  );
}

export default Detalhes;
