import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { useParams, useHistory } from 'react-router-dom';
import { baseUrl } from '../../common/baseUrl';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: left;
`

const ItemCandidato = styled.span`
  display: flex;
  justify-content: space-between;
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

const ListaCandidatos = styled.div`
  display: flex;
  justify-content: space-between;
`

const Icones = styled.span`
  ${props => (props.mostrar==='aguardando') ? ({display: 'flex'}): ({display: 'none'})} 
  align-items: center;
`

const Aprovar = styled(CheckIcon)`
  color: #34AAA9;
  cursor: pointer;
  margin: 5px;
`

const Recusar = styled(CloseIcon)`
  color: #FF0000;
  cursor: pointer;
  margin: 5px;
`

const TripDetailsPage = () => {
  document.title="Detalhes da viagem"
  const pathParams = useParams();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [viagem, setViagem] = useState('')
  const [mostraCandidato, setMostraCandidato] = useState(false);
  const [candidatoDetalhes, setCandidatoDetalhes] = useState(undefined)
  const [filtraCandidatos, setFiltraCandidatos] = useState("aguardando")
  const [listaDeCandidatos, setListaDeCandidatos] = useState(undefined)

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
        setListaDeCandidatos(response.data.trip.candidates)
      })
      .catch(error => {
        console.log(error.response)
      })
  }, [setViagem, pathParams, token, setListaDeCandidatos])

  const decidirAprovacao = (aceito, idCandidato) => {
    const body = {
      approve: aceito
    }
    axios
      .put(`${baseUrl}/trips/${pathParams.idviagem}/candidates/${idCandidato}/decide`, 
        body, 
        {
          headers:{
            auth: token
          }
        }
      )
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.log(error.response);
      })
  }

  const detalhesCandidato = (id, url) => {
    const cand = listaDeCandidatos.find(candidato => candidato.id === id)
    cand.foto = url;
    setCandidatoDetalhes(cand)
    setMostraCandidato(true);
  }

  const onChangeFiltro = (event) => {
    setFiltraCandidatos(event.target.value);
    event.target.value === "aprovados" ? setListaDeCandidatos(viagem.approved) : setListaDeCandidatos(viagem.candidates)
  }

  return (viagem &&
    <div>
      <Header />
      <DivConteudo>
        <DivAjustaTamanho>
        <button onClick={()=>{history.push('/trips/list')}}>Voltar para a lista de viagens</button>
        <h2>{viagem.name}</h2>
        <h3>Data: {viagem.date}</h3>
        {!mostraCandidato && listaDeCandidatos && <>
          <h3>Candidatos: </h3>
          <label for="filtro" />
          <select name="filtro" value={filtraCandidatos} onChange={onChangeFiltro}>
            <option value="aguardando">Aguardando</option>
            <option value="aprovados">Aprovados</option>
          </select>
          <DivCandidatos>
            {listaDeCandidatos.map((candidato, index)=>{
              const url = `https://picsum.photos/200/200?a=${index}`
              return <ListaCandidatos>
                <ItemCandidato key={candidato.id} onClick ={()=>{detalhesCandidato(candidato.id, url)}}>
                  <FotoPerfil src={url} alt={candidato.name} />
                  <p>{candidato.name}</p>
                </ItemCandidato>
                <Icones mostrar={filtraCandidatos}>
                  <Aprovar onClick = {()=>{decidirAprovacao(true, candidato.id)}} />
                  <Recusar onClick = {()=>{decidirAprovacao(false, candidato.id)}} />
                </Icones>
              </ListaCandidatos>
            })}
          </DivCandidatos>
        </>
        }
        {candidatoDetalhes && <>
          <img src={candidatoDetalhes.foto} />
          <DivCandidatos>
            <p>Nome: {candidatoDetalhes.name}</p>
            <p>Texto de aplicação: {candidatoDetalhes.applicationText}</p>
            <p>Profissão: {candidatoDetalhes.profession}</p>
            <p>País: {candidatoDetalhes.country}</p>
          </DivCandidatos>
          <button onClick={()=>{setCandidatoDetalhes(undefined); setMostraCandidato(false);}}>Voltar para detalhes da viagem</button>
        </>
        }
        </DivAjustaTamanho>
      </DivConteudo>
      <Footer />
    </div>
  );
}

export default TripDetailsPage;
