import React, {useState} from 'react';
import styled from 'styled-components'
import axios from 'axios'

const DivApp = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #dedede;
  display: flex;
  align-items: center;
  justify-content: center;
`

const InternalDiv = styled.div`
  width: 40%;
  min-width: 300px;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: #ffffff;
  align-items: center;
  padding-bottom: 20px;
`

const LoginForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
`

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 12px 0;
`

const Input = styled.input`
  height: 32px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.2em;
  :focus{
    outline: none;
    border: 1px solid #4D90FE;
    box-shadow: 0px 0px 3px  #4D90FE;
  }
`

const Button = styled.button`
  width: 60%;
  height: 32px;
  align-self: center;
  font-size: 16px;
  font-weight: 500;
  border: none;
  :hover{
    background-color: #d0d0d0;
    transition: 0.1s all;
    cursor: pointer;
  }
  margin: 12px;
`

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async (event) =>{
    event.preventDefault();

    const body = {email, password}

    console.log(body)
  
    try {
        const token = await axios.post("localhost:3300/user/login", body)
        console.log(token)
    } catch (error) {
        console.log(error)
    }
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  return (
    <DivApp>
      <InternalDiv>
        <h2>Login</h2>
        <LoginForm onSubmit={Login}>
          <InputDiv>
            <label for="email">E-mail:</label>
            <Input type="email" id="email" placeholder="E-mail" value={email} onChange={onChangeEmail} required />
          </InputDiv>
          <InputDiv>
            <label for="password">Password:</label>
            <Input type="password" id="password" placeholder="Password" value={password} onChange={onChangePassword} required />
          </InputDiv>
          <Button>Enter</Button>
        </LoginForm>
      </InternalDiv>
    </DivApp>
  );
}

export default Login;
