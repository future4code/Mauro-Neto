import React from 'react';
import './App.css';
import Post from './components/Post/Post';
import {SecaoPostar} from './components/SecaoPostar/SecaoPostar';

class App extends React.Component {
  state ={
    posts: [
      {
        nomeUsuario: "paulinha",
        fotoUsuario: "https://picsum.photos/50/50?a=1",
        fotoPost: "https://picsum.photos/200/150?a=1"
      },
      {
        nomeUsuario: "future4",
        fotoUsuario: "https://picsum.photos/50/50?a=2",
        fotoPost: "https://picsum.photos/200/150?a=2"
      },
      {
        nomeUsuario: "labenu",
        fotoUsuario: "https://picsum.photos/50/50?a=3",
        fotoPost: "https://picsum.photos/200/150?a=3"
      }
    ]
  }

  atualizaPosts = () => {
    console.log(this.state.posts)
    const listaDePosts = this.state.posts.map((post, index) =>{
      return <Post 
                key={index}
                nomeUsuario ={post.nomeUsuario} 
                fotoUsuario={post.fotoUsuario} 
                fotoPost = {post.fotoPost}
              />
    })
    return listaDePosts
  }

  callbackDoFilho = (recebePost) =>{
    const listaPosts=this.state.posts;
    listaPosts.push(recebePost)
    this.setState({ posts: listaPosts})
  }

  render() {
    const listaAtualizada = this.atualizaPosts();
    return (
      <div className={'app-container'}>
        <SecaoPostar callbackPai={this.callbackDoFilho} />
        {listaAtualizada}
      </div>
    );
  }
}

export default App;
