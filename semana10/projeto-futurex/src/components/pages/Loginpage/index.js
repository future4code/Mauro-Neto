import React, {useState} from 'react';
import styled from 'styled-components'
import Header from '../../common/Header';
import Footer from '../../common/Footer';

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
  return (
    <div>
      <Header />
      <DivWrapper>
        <DivLogin>
          <h3>Login</h3>
          <Campo>
            <label for="email">E-mail</label>
            <input type="text" name="email" />
          </Campo>
          <Campo>
            <label for="senha">Senha</label>
            <input type="password" name="senha" />
          </Campo>
          <Botao>Entrar</Botao>
        </DivLogin>
      </DivWrapper>
      <Footer />
    </div>
  );
}

export default LoginPage;
