import React from 'react';
import './Etapa1.css'

class Etapa1 extends React.Component {
    state={
        nome: '',
        idade: '',
        email: '',
        escolaridade: ''
    }

    onChangeNome = (event) => {
		this.setState({
			nome: event.target.value
		})
    }
    
    onChangeIdade = (event) => {
		this.setState({
			idade: event.target.value
		})
    }
    
    onChangeEmail = (event) => {
		this.setState({
			email: event.target.value
		})
    }
    
    onChangeEscolaridade = (event) => {
		this.setState({
			escolaridade: event.target.value
		})
    }
    
    testa = (event) =>{
        console.log(this.state);
    }

    render(){
        return(
            <div className="div-etapa1">
                <h3>ETAPA 1 - DADOS GERAIS</h3>
                <label for="nome">1. Qual o seu nome?</label>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    name="nome" 
                    value={this.state.nome}
                    onChange={this.onChangeNome}
                />
                <label for="idade">2. Qual a sua idade?</label>
                <input 
                    type="number" 
                    placeholder="Idade" 
                    name="idade"
                    value={this.state.idade}
                    onChange={this.onChangeIdade}
                />
                <label for="email">3. Qual o seu e-mail?</label>
                <input 
                    type="email"
                    placeholder= "E-mail"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                />
                <p>4. Qual a sua escolaridade?</p>
                <select value={this.state.escolaridade} onChange={this.onChangeEscolaridade}>
                    <option></option>
                    <option value="EMI">Ensino médio incompleto</option>
                    <option value="EMC">Ensino médio completo</option>
                    <option value="ESI">Ensino superior incompleto</option>
                    <option value="ESC">Ensino superior completo</option>
                </select>
                <button onClick={this.props.onClickProximaEtapa}>Próxima etapa</button>
            </div>
        );
    }

}


export default Etapa1;