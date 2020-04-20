import React, {Component} from 'react'
import './SecaoComentario.css'

export class SecaoComentario extends Component {
	state = {
		valorComentario: ""
	}

	onChangeComentario = (event) => {
		this.setState({
			valorComentario: event.target.value
		})
	}

	comentar = (event) =>{
        this.props.aoEnviar(this.state);
	}

	render() {
		return <div className={'comment-container'}>
			<input
				className={'input-comentario'}
				placeholder={'Comentário'}
				value={this.state.valorComentario}
				onChange={this.onChangeComentario}
			/>
			<button onClick={this.comentar}>Enviar</button>
		</div>
	}
}
