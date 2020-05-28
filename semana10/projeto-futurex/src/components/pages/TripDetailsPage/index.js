import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { useParams, useHistory } from 'react-router-dom';
import { baseUrl } from '../../common/baseUrl';

const DivApp = styled.div`
  text-align: center;
`

const TripDetailsPage = () => {
  document.title="Detalhes da viagem"
  const pathParams = useParams();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [viagem, setViagem] = useState('')

  if(token===null)
    history.push('/login')

  useEffect(()=>{
    axios
      .get(`${baseUrl}/trip/${pathParams.id}`, 
          {
            headers: {
              auth: token
            }
          })
      .then(response => {
        console.log(response.data.trip)
        setViagem(response.data.trip)
      })
      .catch(error => {
        console.log(error.response)
      })
  }, [setViagem, pathParams, token])

  return (viagem &&
    <DivApp>
      <Header />
      <div>
        <h2>{viagem.name}</h2>
        <h3>Data: {viagem.date}</h3>
        <div>
          <h3>Candidatos: </h3>
          <ul>
            {viagem.candidates.map(candidato=>{
              return <li key={candidato.id}>{candidato.name}</li>
            })}
          </ul>
        </div>
      </div>
      <Footer />
    </DivApp>
  );
}

export default TripDetailsPage;
