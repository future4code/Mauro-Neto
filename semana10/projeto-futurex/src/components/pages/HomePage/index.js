import React from 'react';
import styled from 'styled-components'
import logo from '../../../img/futurex.png'
import Header from '../../common/Header'
import Footer from '../../common/Footer'

const DivApp = styled.div`
    width: 100vw;
`

const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
`

const HomePage = () => {
  document.title="Future X"
  return (
    <DivApp>
      <Header />
      <Main>
        <img src={logo} alt="FutureX" />
      </Main>
      <Footer />
    </DivApp>
  );
}

export default HomePage;
