import React, {useState} from 'react';
import styled from 'styled-components'
import {useForm} from '../hooks/useForm'
import axios from 'axios'

const Select = styled.select`
  margin: 0 6px;
`

const Botao = styled.button`
  margin: 0 6px;
`

const Planner = styled.div`
  display: grid;
  margin: 10px 0;
  grid-template-columns: repeat(7, 1fr);
`

const DiaDaSemana = styled.div`
  border: 1px solid black;
  :first-of-type{
    border-right: none;
  }
`

const Formulario = (props) => {
  const {form, changeValue, clearForm} = useForm({atividade:'', dia:'segunda', hora:'0'});

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    changeValue(name, value);
  }

  const criarAtividade = (event) => {
    event.preventDefault();
    const body = {
      text: form.atividade,
      day: form.dia,
      hour: form.hora,
      complete: false
    }

    axios
      .post(`https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-julian-mauro`, body)
      .then(response=>{
        clearForm()
        props.atualizaLista();
      })
      .catch(error=>{
        alert("Erro ao criar atividade, tente novamente");
      })
  }

  return (
      <form onSubmit={criarAtividade}>
        <input placeholder="Atividade" name="atividade" value={form.atividade} onChange={onChangeInput} required />
        <Select name="dia" value={form.dia} onChange={onChangeInput} data-testid={'selectDia'} required >
          <option value="segunda">Segunda-feira</option>
          <option value="terca">Terça-feira</option>
          <option value="quarta">Quarta-feira</option>
          <option value="quinta">Quinta-feira</option>
          <option value="sexta">Sexta-feira</option>
          <option value="sabado">Sábado</option>
          <option value="domingo">Domingo</option>
        </Select>
        <Select name="hora" value={form.hora} onChange={onChangeInput} data-testid={'selectHora'} required >
          <option value="0">0h</option>
          <option value="1">1h</option>
          <option value="2">2h</option>
          <option value="3">3h</option>
          <option value="4">4h</option>
          <option value="5">5h</option>
          <option value="6">6h</option>
          <option value="7">7h</option>
          <option value="8">8h</option>
          <option value="9">9h</option>
          <option value="10">10h</option>
          <option value="11">11h</option>
          <option value="12">12h</option>
          <option value="13">13h</option>
          <option value="14">14h</option>
          <option value="15">15h</option>
          <option value="16">16h</option>
          <option value="17">17h</option>
          <option value="18">18h</option>
          <option value="19">19h</option>
          <option value="20">20h</option>
          <option value="21">21h</option>
          <option value="22">22h</option>
          <option value="23">23h</option>
        </Select>
        <Botao>Adicionar</Botao>
      </form>
  );
}

export default Formulario;
