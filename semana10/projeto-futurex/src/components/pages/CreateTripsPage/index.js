import React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {baseUrl} from '../../common/baseUrl';
import {useForm} from '../../hooks/useForm'
import Header from '../../common/Header'
import Footer from '../../common/Footer'

const DivConteudo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`

const Input = styled.input`
  width: 90%;
`

const TextArea = styled.textarea`
  width: 90%;
`

const Legenda=styled.label`
  margin: 5px;
  font-size: 1.1em;
`

const Botao = styled.button`
  margin: 15px;
`

const CreateTripsPage = () => {
  document.title = "Criar Viagem"
  const {form, changeValue, clearForm} = useForm({name:'', planet:'', date:'', description:'', durationInDays:''})
  const history=useHistory();
  const token = localStorage.getItem("token");

  if(token===null)
    history.push('/login')

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    changeValue(name, value)
  }

  const criarViagem = (event) => {
    event.preventDefault();
    const body = {
      name: form.name,
      planet: form.planet,
      date: form.date,
      description: form.description,
      durationInDays: form.durationInDays
    }
    axios
      .post(`${baseUrl}/trips`, 
        body, 
        {
          headers:{
            auth: token
          }
        }
      )
      .then(response=>{
        alert("Viagem criada com sucesso!")
        clearForm();
      })
      .catch(error=>{
        alert("Erro ao criar viagem, tente novamente")
      })
  }
  
  return (
    <div>
      <Header />
      <DivConteudo>
        <h2>Formulário de Criação de Viagem</h2>
        <Formulario onSubmit={criarViagem}>
          <Legenda for="name">Nome da viagem</Legenda>
          <Input name="name" value={form.name} onChange={onChangeInput} type="text" required />
          <Legenda for="planet">Planeta</Legenda>
          <select name="planet" value={form.planet} onChange={onChangeInput} required>
            <option>Selecione o planeta</option>
            <option value="Mercúrio">Mercúrio</option>
            <option value="Vênus">Vênus</option>
            <option value="Marte">Marte</option>
            <option value="Júpiter">Júpiter</option>
            <option value="Saturno">Saturno</option>
            <option value="Urano">Urano</option>
            <option value="Netuno">Netuno</option>
            <option value="Plutão">Plutão</option>
          </select>
          <Legenda for="date">Data</Legenda>
          <Input name="date" value={form.date} onChange={onChangeInput} type="text" required />
          <Legenda for="description">Descrição</Legenda>
          <TextArea name="description" value={form.description} onChange={onChangeInput} required />
          <Legenda for="durationInDays">Duração (em dias terrestres)</Legenda>
          <Input name="durationInDays" value={form.durationInDays} onChange={onChangeInput} type="number" required />
          <Botao>Criar</Botao>
        </Formulario>
      </DivConteudo>
      <Footer />
    </div>
  );
}

export default CreateTripsPage;