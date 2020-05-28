import React from 'react';
import styled from 'styled-components'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {useForm} from '../../hooks/useForm'
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import {baseUrl} from '../../common/baseUrl';

const DivWrapper = styled.div`
  display: flex;
  width: 100vw;
  padding: 50px 0;
  justify-content: center;
`

const DivLogin = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`

const Campo = styled.div`
  display: flex;
  flex-direction: column;
`

const Botao = styled.button`
  margin: 10px auto;
`
  
const LoginPage = () => {
  const history = useHistory();
  const{form, changeValue} = useForm({email: '', password:''})

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    changeValue(name, value)
  }

  const logar = (event) => {
      event.preventDefault();
      const body = {
        email: form.email,
        password: form.password
      }
      axios
        .post(`${baseUrl}/login`, body)
        .then(response=>{
          localStorage.setItem("token", response.data.token);
          history.push('/trips/list');
        })
        .catch(error=>{
          alert("Falha ao logar");
        })
  }
  
  return (
    <div>
      <Header/>
      <DivWrapper>
        <DivLogin>
          <h3>Login</h3>
          <form onSubmit={logar}>
            <Campo>
              <label for="email">E-mail</label>
              <input type="email" name="email" value={form.email} onChange={onChangeInput} required />
            </Campo>
            <Campo>
              <label for="password">Senha</label>
              <input type="password" name="password" value={form.password} onChange={onChangeInput} required />
            </Campo>
            <Botao>Entrar</Botao>
          </form>
        </DivLogin>
      </DivWrapper>
      <Footer />
    </div>
  );
}

export default LoginPage;
