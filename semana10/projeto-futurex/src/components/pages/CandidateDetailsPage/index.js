import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { useParams, useHistory } from 'react-router-dom';
import { baseUrl } from '../../common/baseUrl';

const DivConteudo = styled.div`
  width: 100%;
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DivAjustaTamanho = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`
const DivCandidatos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`

const ItemCandidato = styled.span`
  display: flex;
  justify-content: left;
  height: 50px;
  padding: 8px;
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

const CandidateDetailsPage = () => {
  document.title="Detalhes da viagem"
  const pathParams = useParams();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [viagem, setViagem] = useState('')

  if(token===null)
    history.push('/login')

  useEffect(()=>{
    axios
      .get(`${baseUrl}/trip/${pathParams.idviagem}`, 
          {
            headers: {
              auth: token
            }
          })
      .then(response => {
        setViagem(response.data.trip)
      })
      .catch(error => {
        alert("Erro ao carregar detalhes do usuário")
      })
  }, [setViagem, pathParams, token])

  return (viagem &&
    <div>
      <Header />
      <DivConteudo>
        <DivAjustaTamanho>
        <h2>{viagem.name}</h2>
        <h3>Data: {viagem.date}</h3>
          <h3>Candidatos: </h3>
          <DivCandidatos>
            {viagem.candidates.map((candidato, index)=>{
              const url = `https://picsum.photos/200/200?a=${index}`
              return <ItemCandidato key={candidato.id}>
                  <FotoPerfil src={url} alt={candidato.name} />
                  <p>{candidato.name}</p>
                </ItemCandidato>
            })}
          </DivCandidatos>
        </DivAjustaTamanho>
      </DivConteudo>
      <Footer />
    </div>
  );
}

export default CandidateDetailsPage;
