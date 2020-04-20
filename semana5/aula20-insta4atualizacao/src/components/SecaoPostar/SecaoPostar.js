import React, {Component} from 'react'
import './SecaoPostar.css'

export class SecaoPostar extends Component {
	state = {
        nomeUsuario: "",
        fotoUsuario: "",
        fotoPost: ""
	}

	onChangeUsuario = (event) => {
		this.setState({
			nomeUsuario: event.target.value
		})
	}
    onChangeFotoPerfil = (event) => {
		this.setState({
			fotoUsuario: event.target.value
		})
    }
    onChangeFotoPost = (event) => {
		this.setState({
			fotoPost: event.target.value
		})
    }
    
	postar = (event) =>{
        this.props.callbackPai(this.state);
        this.setState({
            nomeUsuario: "",
            fotoUsuario: "",
            fotoPost: ""
        })
	}

	render() {
		return <div className={'form-post-container'}>
			<input
				className={'input-usuario'}
				placeholder={'Digite o usuario'}
				value={this.state.nomeUsuario}
				onChange={this.onChangeUsuario}
			/>
            <input
				className={'input-foto-perfil'}
				placeholder={'Digite a url da foto do perfil'}
				value={this.state.fotoUsuario}
				onChange={this.onChangeFotoPerfil}
			/>
            <input
				className={'input-foto-post'}
				placeholder={'Digite a url da foto do post'}
				value={this.state.fotoPost}
				onChange={this.onChangeFotoPost}
			/>
			
			<button onClick={this.postar} className={'botao-postar'}>Postar</button>
			
		</div>
	}
}
