import React from 'react';
import styled from 'styled-components'
import GitHubIcon from '@material-ui/icons/GitHub';

const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 60px;
    background-color: #ff5f00;
    color: white;
    box-sizing: border-box;
    padding: 0 15px;
`

const Link = styled.a`
  text-decoration: none;
  color: white;
  :hover{
    color: #dedede;
    transition: 0.4s;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <p>© 2020 FutureX</p>
      <Link href="https://github.com/JMauroNeto" target="_blank"><GitHubIcon /></Link>
      <Link href="mailto:admin@futurex.com.br">admin@futurex.com.br</Link>
    </StyledFooter>
  );
}

export default Footer;
