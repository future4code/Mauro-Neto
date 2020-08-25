import React, {Component} from 'react'
import './SecaoCompartilhar.css'

export class SecaoCompartilhar extends Component {
	state = {
		valorMensagem: ""
	}

	onChangeMensagem = (event) => {
		this.setState({
			valorMensagem: event.target.value
		})
	}

	printarCompartilhamento = (event) =>{
		if(this.state.valorMensagem!==''){
			console.log("Post compartilhado no "+ event.target.value + " com a mensagem: " + this.state.valorMensagem)
		}
		else{
			console.log("Post compartilhado no "+ event.target.value);
		}
		this.props.aoCompartilhar()
	}

	render() {
		return <div className={'share-container'}>
			<input
				className={'input-mensagem'}
				placeholder={'Digite alguma mensagem para postar'}
				value={this.state.valorMensagem}
				onChange={this.onChangeMensagem}
			/>
			<div className="botoes-rede">
				<button onClick={this.printarCompartilhamento} value="Instagram">Instagram</button>
				<button onClick={this.printarCompartilhamento} value="Facebook">Facebook</button>
				<button onClick={this.printarCompartilhamento} value="Twitter">Twitter</button>
			</div>
		</div>
	}
}
