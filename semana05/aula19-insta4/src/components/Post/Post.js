import React from 'react'
import './Post.css'

import {IconeComContador} from '../IconeComContador/IconeComContador'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'
import iconeSalvarBranco from '../../img/bookmark_border.svg'
import iconeSalvarPreto from '../../img/bookmark.svg'
import iconeCompartilhar from '../../img/share.svg'
import {SecaoComentario} from '../SecaoComentario/SecaoComentario'
import {SecaoCompartilhar} from '../SecaoCompartilhar/SecaoCompartilhar'

class Post extends React.Component {
  state = {
    curtido: false,
    numeroCurtidas: 0,
    comentando: false,
    numeroComentarios: 0,
    salvo: false,
    compartilhando: false
  }

  onClickCurtida = () => {
    if(this.state.curtido){
      this.setState({
        curtido: !this.state.curtido,
        numeroCurtidas: this.state.numeroCurtidas - 1
      })
    }
    else{
      this.setState({
        curtido: !this.state.curtido,
        numeroCurtidas: this.state.numeroCurtidas + 1
      })
    }
  }

  onClickSalvar = () => {
    this.setState({
      salvo: !this.state.salvo
    })
  }

  onClickCompartilhar = () => {
    this.setState({
      compartilhando: !this.state.compartilhando
    })
  }

  onClickComentario = () => {
    this.setState({
      comentando: !this.state.comentando
    })
  }

  aoEnviarComentario = () => {
    this.setState({
      comentando: false,
      numeroComentarios: this.state.numeroComentarios + 1
    })
  }
  aoCompartilhar = () => {
    this.setState({
      compartilhando: false
    })
  }

  render() {
    let iconeCurtida, iconeSalvar
    
    if(this.state.curtido) {
      iconeCurtida = iconeCoracaoPreto
    } else {
      iconeCurtida = iconeCoracaoBranco
    }
    if(this.state.salvo){
      iconeSalvar = iconeSalvarPreto
    }
    else{
      iconeSalvar = iconeSalvarBranco
    }

    let componenteComentario, componenteCompartilhar

    if(this.state.comentando) {
      componenteComentario = <SecaoComentario aoEnviar={this.aoEnviarComentario}/>
    }
    if(this.state.compartilhando){
      componenteCompartilhar = <SecaoCompartilhar aoCompartilhar={this.aoCompartilhar} />
    }

    return <div className={'post-container'}>
      <div className={'post-header'}>
        <div className={'perfilEFoto'}>
          <img className={'user-photo'} src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
          <p>{this.props.nomeUsuario}</p>
        </div>
        <img alt={'Icone'} src={iconeCompartilhar} onClick={this.onClickCompartilhar} className={'share-icon'} className="iconesClicaveis" />
      </div>
      {componenteCompartilhar}
      <img className={'post-photo'} src={this.props.fotoPost} alt={'Imagem do post'}/>

      <div className={'post-footer'}>
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={this.onClickCurtida}
          valorContador={this.state.numeroCurtidas}
        />
        <div className={'icones-direita'}>
          <img alt={'Icone'} src={iconeSalvar} onClick={this.onClickSalvar} className="iconesClicaveis"/>
            <IconeComContador
              icone={iconeComentario}
              onClickIcone={this.onClickComentario}
              valorContador={this.state.numeroComentarios}
            />
        </div>
      </div>
      {componenteComentario}
    </div>
  }
}

export default Post