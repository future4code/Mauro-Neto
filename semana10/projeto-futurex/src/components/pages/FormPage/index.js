import React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { useLista } from '../../hooks/useLista';
import {useForm} from '../../hooks/useForm'
import {listaDePaises} from './listaDePaises'
import {baseUrl} from '../../common/baseUrl';

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

const FormPage = () => {
  document.title="Formulário de Inscrição"
  const {form, changeValue, clearForm} = useForm({name:'', age:'', trip:'', applicationText:'', profession:'', country: 'Brasil'})
  const lista = useLista();

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    changeValue(name, value)
  }

  const enviarInscricao = (event) => {
    event.preventDefault();
    const body = {
      name: form.name,
      age: form.age,
      applicationText: form.applicationText,
      profession: form.profession,
      country: form.country
    }
    axios
      .post(`${baseUrl}/trips/${form.trip}/apply`, body)
      .then(response=>{
        alert("Inscrição realizada com sucesso!")
        clearForm();
      })
      .catch(error=>{
        alert("Erro ao enviar lista, tente novamente")
      })
  }
  
  return ( lista &&
    <div>
      <Header />
      <DivConteudo>
        <h2>Formulário de Inscrição</h2>
        <Formulario onSubmit={enviarInscricao}>
          <Legenda for="name">Nome</Legenda>
          <Input name="name" value={form.name} onChange={onChangeInput} type="text" required />
          <Legenda for="age">Idade</Legenda>
          <Input name="age" value={form.age} onChange={onChangeInput} type="number" required />
          <Legenda for="trip">Viagem</Legenda>
          <select name="trip" value={form.trip} onChange={onChangeInput} required>
            <option>Selecione a viagem</option>
            {lista.map(viagem=>{
              return <option key={viagem.id} value={viagem.id}>{viagem.name}</option>
            })}
          </select>
          <Legenda for="applicationText">Sobre você</Legenda>
          <TextArea name="applicationText" value={form.applicationText} onChange={onChangeInput} required />
          <Legenda for="profession">Profissão</Legenda>
          <Input name="profession" value={form.profession} onChange={onChangeInput} type="text" required />
          <Legenda for="country">País</Legenda>
          <select name="country" value={form.country} onChange={onChangeInput} required>
            <option value="Brasil">Brasil</option>
            {listaDePaises}
          </select>
          <Botao>Enviar</Botao>
        </Formulario>
      </DivConteudo>
      <Footer />
    </div>
  );
}

export default FormPage;
