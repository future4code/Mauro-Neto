import React from 'react';
import styled from 'styled-components'
import axios from 'axios'

const DivEntediado = styled.div`
  text-align: center;
`
const Titulo = styled.h3`
  display: inline-block;
  margin: 5px;
`

const Descricao = styled.p`
  display: inline-block;
  margin: 0;
`


class Entediado extends React.Component {
  state={
    atividade: undefined
  }

  descobrir = () => {
    axios
      .get('http://www.boredapi.com/api/activity/')
      .then(resposta =>{
        return(this.setState({atividade: resposta.data}))
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  render(){
    return (
      <DivEntediado>
        <h1>Está entediado?</h1>
        <h3>Aperte o botão e descubra sugestões do que fazer</h3>
        <button onClick={this.descobrir}>Descobrir o que fazer</button>
        {this.state.atividade && (
          <div>
            <div>
              <Titulo>Atividade:</Titulo>
              <Descricao>{this.state.atividade.activity}</Descricao>
            </div>
            <div>
              <Titulo>Tipo: </Titulo>
              <Descricao>{this.state.atividade.type}</Descricao>
            </div>
            <div>
              <Titulo>Acessibilidade:</Titulo>
              <Descricao>{this.state.atividade.accessibility}</Descricao>
            </div>
            <div>
              <Titulo>Participantes:</Titulo>
              <Descricao>{this.state.atividade.participants}</Descricao>
            </div>
            <div>
              <Titulo>Preço:</Titulo>
              <Descricao>{this.state.atividade.price}</Descricao>
            </div>
          </div>
        )}
      </DivEntediado>
    );
  }
}

export default Entediado;
