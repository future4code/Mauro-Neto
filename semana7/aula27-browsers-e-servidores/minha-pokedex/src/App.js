import React from 'react';
import styled from 'styled-components'
import axios from 'axios'

const DivApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 0 auto;
`
const UlPokemons = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 40%;
`

const LiItem = styled.li`
  margin: 3px;
  :hover{
    color: green;
    cursor: pointer;
    width: auto;
  }
`

const Botao = styled.button`
    margin-top: 20px;
    width: 30%;
    height: 30px;
    align-self: center;
    background-color: blue;
    color:white;
    border: none;
    :hover{
        opacity: 0.7;
        cursor: pointer;
    }
`

class App extends React.Component {
  state={
    listaDePokemons: undefined,
    secaoDetalhes: false,
    pokemonSelecionado: undefined
  }

  componentDidMount = () => {
    this.pegaPokedex();
  }

  pegaPokedex = () => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=964')
      .then(resposta =>{
        return(this.setState({listaDePokemons: resposta.data}))
      })
      .catch(erro => {
        return(console.log(erro))
      })
  }

  pegaDetalhes = (id) => {
    console.log(id);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(resposta=>{
        return(this.setState({pokemonSelecionado: resposta.data, secaoDetalhes: true}))
      })
      .catch(erro => {
        return(console.log(erro))
      })
  }

  voltaParaLista = () => {
    this.setState({secaoDetalhes: false, pokemonSelecionado: undefined})
  }

  render(){
    if(this.state.secaoDetalhes){
      return(
        <DivApp>
          <h1>Labedex - A Pokedex da Labenu</h1>
          <h3>#{this.state.pokemonSelecionado.id} - {this.state.pokemonSelecionado.name}</h3>
          <img alt={this.state.pokemonSelecionado.name} src={this.state.pokemonSelecionado.sprites.front_default} />
          <Botao onClick={this.voltaParaLista}>Voltar para lista</Botao>
        </DivApp>
      );
    }

    return (
      <DivApp>
        <h1>Labedex - A Pokedex da Labenu</h1>
        <h3>Temos {this.state.listaDePokemons && this.state.listaDePokemons.count} Pokémons cadastrados</h3>
        <p>Clique no nome do pokemón para ver detalhes ou use a pesquisa</p>
        <UlPokemons>
          {this.state.listaDePokemons && this.state.listaDePokemons.results.map((pokemon, index)=>{
            return <LiItem key={index} onClick={()=>this.pegaDetalhes(index+1)}>#{index+1} - {pokemon.name}</LiItem>
          })}
        </UlPokemons>
      </DivApp>
    );
  }
}

export default App;
