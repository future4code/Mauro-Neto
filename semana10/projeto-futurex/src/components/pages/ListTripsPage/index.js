import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { useLista } from '../../hooks/useLista';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const DivTitulo = styled.div`
  text-align: center;
`

const DivViagens=styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(${props => props.linhas}, 1fr);
  gap: 15px;
  column-gap: 15px;
  justify-content: center;
  padding: 15px;
`

const CardViagem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid black;
  cursor: pointer;
  :first-of-type{
    justify-content: center;
  }
  :hover{
    opacity: 0.7;
    transition: 1s;
  }
`

const DivImagem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const Blur = styled.div`
  height: 200px;
  width: 100%;
  background-image: url(${props => props.imagem});
  filter: blur(2px);
  z-index: 1;
  position: absolute;
  top: 0%;
`

const Imagem = styled.img`
  max-width: 100%;
  z-index: 2;
`

const DivDescricao = styled.div`
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: left;
`

const TextoTitulo = styled.h3`
  margin-bottom: 3px;
`

const TextoData = styled.p`
  font-style: italic;
  font-size: 0.9em;
  margin: 0;
`

const ListTripsPage = () => {
  document.title="Lista de Viagens"
  const history=useHistory();
  const token = localStorage.getItem("token");
  const lista = useLista();
  
  if(token===null)
    history.push('/login')

  return (
    <div>
      <Header />
      <DivTitulo>
        <h2>Nossas Viagens</h2>
        <p>Clique no card para ver detalhes</p>
      </DivTitulo>
      <DivViagens linhas={Math.ceil(lista.length/4)}>
        <CardViagem  onClick={()=>history.push("/trips/create")}>
          <AddCircleIcon />
          <p>Adicionar viagem</p>
        </CardViagem>
        {lista.map((viagem, index)=>{
          const url = `https://picsum.photos/200/200?a=${index}`
          return <CardViagem key={viagem.id}>
            <DivImagem>
              <Blur imagem={url} />
              <Imagem src={url} alt={viagem.name} />
            </DivImagem>
            <DivDescricao>
              <TextoTitulo>{viagem.name}</TextoTitulo>
              <TextoData>Data: {viagem.date}</TextoData>
              <p>{viagem.description}</p>
              <p><strong>Dias terrestres: </strong>{viagem.durationInDays}</p>
              <p><strong>Planeta: </strong>{viagem.planet}</p>
            </DivDescricao>
          </CardViagem>
        })}
      </DivViagens>
      <Footer />
    </div>
  );
}

export default ListTripsPage;
