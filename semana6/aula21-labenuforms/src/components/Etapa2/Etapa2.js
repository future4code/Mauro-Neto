import React from 'react';
import './Etapa2.css'

class Etapa2 extends React.Component {
    state={
        curso: '',
        unidade: '',
    }

    onChangeCurso = (event) => {
		this.setState({
			curso: event.target.value
		})
    }
    
    onChangeUnidade = (event) => {
		this.setState({
			unidade: event.target.value
		})
    }
    

    render(){
        return(
            <div className="div-etapa2">
                <h3>ETAPA 2 - DADOS GERAIS</h3>
                <label for="curso">5. Qual curso?</label>
                <input 
                    type="text" 
                    placeholder="Curso" 
                    name="curso" 
                    value={this.state.curso}
                    onChange={this.onChangeCurso}
                />
                <label for="unidade">6. Qual a unidade de ensino?</label>
                <input 
                    type="text" 
                    placeholder="Unidade de ensino" 
                    name="unidade"
                    value={this.state.unidade}
                    onChange={this.onChangeUnidade}
                />
                
                <button onClick={this.props.onClickProximaEtapa}>Próxima etapa</button>
            </div>
        );
    }

}


export default Etapa2;