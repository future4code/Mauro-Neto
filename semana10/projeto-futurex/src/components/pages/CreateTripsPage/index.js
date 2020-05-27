import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

const DivApp = styled.div`
  text-align: center;
`

const CreateTripsPage = (props) => {
  const history=useHistory();
  if(props.token===null)
    history.push('/login')

  return (
    <DivApp>
      testegdsgsd
    </DivApp>
  );
}

export default CreateTripsPage;