import React, {useState, useEffect} from 'react';
import axios from 'axios'
import styled from 'styled-components'
import Header from '../../common/Header'
import Footer from '../../common/Footer'

const DivConteudo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const DivForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`

const Input = styled.input`
  width: 90%;
`

const Legenda=styled.label`
  margin: 5px;
  font-size: 1.1em;
`


const FormPage = () => {
  const [lista, setLista] = useState([]);

  useEffect(()=>{
    pegaListaDeViagens();
  }, [])

  const pegaListaDeViagens = () => {
    axios
      .get("https://us-central1-labenu-apis.cloudfunctions.net/labeX/mauro-neto-julian/trips")
      .then(response=>{
        setLista(response.data.trips)
      })
      .catch(error=>alert("Erro ao pegar lista de viagens"))
  }
  return ( lista &&
    <div>
      <Header />
      <DivConteudo>
      <DivForm>
        <h2>Formulário de Inscrição</h2>
        <Legenda for="nome">Nome</Legenda>
        <Input name="nome" />
        <Legenda for="idade">Idade</Legenda>
        <Input name="idade" type="number" />
        <Legenda for="viagem">Viagem</Legenda>
        <select name="viagem">
          <option></option>
          {lista.map(viagem=>{
            return <option key={viagem.id} value={viagem.id}>{viagem.name}</option>
          })}
        </select>
        <Legenda for="sobre">Sobre você</Legenda>
        <textarea name="sobre" />
        <Legenda for="profissao">Profissão</Legenda>
        <Input name="profissao" />
        <Legenda for="pais">País</Legenda>
        <select name="pais">
        </select>
        <button>Enviar</button>
      </DivForm>
      </DivConteudo>
      <Footer />
    </div>
  );
}

export default FormPage;
