import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { useLista } from '../../hooks/useLista';

const DivViagens=styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(${props => props.linhas}, 1fr);
  gap: 10px;
  column-gap: 10px;
  justify-content: center;
  padding: 10px;
`

const CardViagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid black;
`

const ListTripsPage = () => {
  const history=useHistory();
  const token = localStorage.getItem("token");
  const lista = useLista();
  
  if(token===null)
    history.push('/login')

  return (
    <div>
      <Header />
      <DivViagens linhas={Math.ceil(lista.length/4)}>
        <CardViagem>
          Adicionar viagem
        </CardViagem>
        {lista.map(viagem=>{
          return <CardViagem>
            teste
          </CardViagem>
        })}
      </DivViagens>
      <Footer />
    </div>
  );
}

export default ListTripsPage;
