import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import Formulario from './components/Formulario';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const DivApp = styled.div`
  margin: 8px;
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

const Atividade = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`

const TextoAtividade = styled.span`
  text-decoration: ${({ complete }) => (complete ? 'line-through' : 'none')};
`

const Deletar = styled(DeleteIcon)`
  cursor: pointer;
  color: #d0d0d0;
  :hover{
    color: #000;
  }
`

const App = () => {
  document.title="Planner";
  const [lista, setLista] = useState([])

  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-julian-mauro"

  useEffect(()=>{
    pegaLista();
  }, [])

  const pegaLista = () => {
    axios
      .get(`${baseUrl}`)
      .then(response=>{
        setLista(response.data);
      })
      .catch(error=>{
        alert("Erro ao carregar lista de atividades");
      })
  }

  const mudaCompleta = (id, completa) => {
    const body={
      complete: !completa
    }

    axios
      .put(`${baseUrl}/${id}`, body)
      .then(response=>{
        pegaLista();
      })
      .catch(error=>{
        alert("Erro ao mudar status da atividade");
      })
  }

  const apagaAtividade = (id) => {
    if(window.confirm("Deseja excluir atividade?")){
      axios
        .delete(`${baseUrl}/${id}`)
        .then(response=>{
          pegaLista();
        })
        .catch(error=>{
          alert("Erro ao excluir, tente novamente!");
        })
    }
  }

  const filtraLista = (dia) =>{
    return lista.filter(atividade=>{
      return atividade.day===dia;
    }).sort((a,b) => {
      return a.hour - b.hour
    }).map(atividade=>{
      return <Atividade key={atividade.id}>
        <TextoAtividade onClick={()=>mudaCompleta(atividade.id, atividade.complete)} complete={atividade.complete}>
          {atividade.hour}h - {atividade.text}
        </TextoAtividade>
        <Deletar onClick={()=>apagaAtividade(atividade.id)}>Apagar</Deletar>
      </Atividade>
    })
  }

  return (
    <DivApp>
      <h2>Planejamento Semanal</h2>
      <Formulario atualizaLista={pegaLista} />
      <Planner>
        <DiaDaSemana>
          <h2>Segunda-feira</h2>
          <ul>{filtraLista("segunda")}</ul>
        </DiaDaSemana>
        <DiaDaSemana>
          <h2>Terça-feira</h2>
          <ul>{filtraLista("terca")}</ul>
        </DiaDaSemana>
        <DiaDaSemana>
          <h2>Quarta-feira</h2>
          <ul>{filtraLista("quarta")}</ul>
          </DiaDaSemana>
        <DiaDaSemana>
          <h2>Quinta-feira</h2>
          <ul>{filtraLista("quinta")}</ul>
        </DiaDaSemana>
        <DiaDaSemana>
          <h2>Sexta-feira</h2>
          <ul>{filtraLista("sexta")}</ul>
        </DiaDaSemana>
        <DiaDaSemana>
          <h2>Sábado</h2>
          <ul>{filtraLista("sabado")}</ul>
        </DiaDaSemana>
        <DiaDaSemana>
          <h2>Domingo</h2>
          <ul>{filtraLista("domingo")}</ul>
        </DiaDaSemana>
      </Planner>
    </DivApp>
  );
}

export default App;
