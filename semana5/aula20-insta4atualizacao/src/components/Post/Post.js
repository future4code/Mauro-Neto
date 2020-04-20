import React from 'react'
import styled from "styled-components"

import {IconeComContador} from '../IconeComContador/IconeComContador'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'
import iconeSalvarBranco from '../../img/bookmark_border.svg'
import iconeSalvarPreto from '../../img/bookmark.svg'
import iconeCompartilhar from '../../img/share.svg'
import {SecaoComentario} from '../SecaoComentario/SecaoComentario'
import {SecaoCompartilhar} from '../SecaoCompartilhar/SecaoCompartilhar'

const PostContainer = styled.div`
  border: 1px solid gray;
  width: 300px;
  margin-bottom: 10px;
`
const PostHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  justify-content: space-between;
`
const PostFooter = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`

const PerfilEFoto = styled.div`
  display: flex;
  align-items: center;
`

const UserPhoto = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50%;
`

const ShareIcon = styled.img`
  margin-right: 5px;
  cursor:pointer;
`

const PostPhoto = styled.img`
  width: 100%;
`

const IconesDireita = styled.div`
  display: flex;
  align-items: center;
`

const IconeSalvar = styled.img`
  cursor:pointer;
`


class Post extends React.Component {
  state = {
    curtido: false,
    numeroCurtidas: 0,
    comentando: false,
    numeroComentarios: 0,
    salvo: false,
    compartilhando: false,
    comentarios: []
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

  onClickComentario = (recebeComentario) => {
    this.setState({
      comentando: !this.state.comentando
    })
  }

  aoEnviarComentario = (recebeComentario) => {
    const listaComentarios=this.state.comentarios;
    listaComentarios.push(recebeComentario)
    this.setState({ comentarios: listaComentarios})

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

  atualizaComentarios = () => {
    const listaDePosts = this.state.comentarios.map((post, index) =>{
      return <p key={index}>{post.valorComentario}</p>
    })
    return listaDePosts
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


    const listaAtualizada = this.atualizaComentarios();
    return <PostContainer>
      <PostHeader>
        <PerfilEFoto>
          <UserPhoto src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
          <p>{this.props.nomeUsuario}</p>
        </PerfilEFoto>
        <ShareIcon alt={'Icone'} src={iconeCompartilhar} onClick={this.onClickCompartilhar}/>
      </PostHeader>
      {componenteCompartilhar}
      <PostPhoto src={this.props.fotoPost} alt={'Imagem do post'}/>
      <PostFooter>
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={this.onClickCurtida}
          valorContador={this.state.numeroCurtidas}
        />
        <IconesDireita>
          <IconeSalvar alt={'Icone'} src={iconeSalvar} onClick={this.onClickSalvar} />
            <IconeComContador
              icone={iconeComentario}
              onClickIcone={this.onClickComentario}
              valorContador={this.state.numeroComentarios}
            />
        </IconesDireita>
      </PostFooter>
      {componenteComentario}
      {listaAtualizada}
    </PostContainer>
  }
}

export default Post