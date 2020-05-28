import React from 'react';
import styled from 'styled-components'
import Header from '../../common/Header';
import Footer from '../../common/Footer';

const DivApp = styled.div`
  text-align: center;
`

const TripDetailsPage = (props) => {
  document.title="Detalhes da viagem"
  return (
    <DivApp>
      <Header />
      <Footer />
    </DivApp>
  );
}

export default TripDetailsPage;
