import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import Header from '../../common/Header'
import Footer from '../../common/Footer'

const DivApp = styled.div`
  text-align: center;
`

const CreateTripsPage = (props) => {
  const history=useHistory();
  if(props.token===null)
    history.push('/login')

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default CreateTripsPage;