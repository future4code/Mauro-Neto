import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import Header from '../../common/Header'
import Footer from '../../common/Footer'

const CreateTripsPage = () => {
  document.title = "Criar Viagem"
  const history=useHistory();
  const token = localStorage.getItem("token");

  if(token===null)
    history.push('/login')

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default CreateTripsPage;