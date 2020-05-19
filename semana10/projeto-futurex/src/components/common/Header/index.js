import React from 'react';
import styled from 'styled-components'
import logo from '../../../img/futurexheader2.png'

const DivHeader = styled.header`
    width: 100vw;
    height: 60px;
    background-color: #ff6a0c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`

const Logo = styled.img`
    max-height: 100%;
`

const Header = () => {
  return (
    <DivHeader>
      <Logo src={logo} />
    </DivHeader>
  );
}

export default Header;
