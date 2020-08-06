import React from 'react';
import './Etapa3.css'

class Etapa3 extends React.Component {
    state={
        motivo: '',
        cursoComplementar: ''
    }

    onChangeMotivo = (event) => {
		this.setState({
			motivo: event.target.value
		})
    }
    
    onChangeCursoComplementar = (event) => {
		this.setState({
			cursoComplementar: event.target.value
		})
    }

    render(){
        return(
            <div className="div-etapa3">
                <h3>ETAPA 1 - DADOS GERAIS</h3>
                <label for="motivo">5. Por que você não terminou um curso de graduação?</label>
                <input 
                    type="text" 
                    placeholder="Motivo" 
                    name="motivo" 
                    value={this.state.motivo}
                    onChange={this.onChangeMotivo}
                />
                <label for="cursocomplementar">6. Você fez algum curso complementar?</label>
                <select name="cursocomplementar" value={this.state.cursoComplementar} onChange={this.onChangeCursoComplementar}>
                    <option></option>
                    <option value="nenhum">Nenhum</option>
                    <option value="técnico">Curso técnico</option>
                    <option value="inglês">Inglês</option>
                </select>
                <button onClick={this.props.onClickProximaEtapa}>Próxima etapa</button>
            </div>
        );
    }

}


export default Etapa3;