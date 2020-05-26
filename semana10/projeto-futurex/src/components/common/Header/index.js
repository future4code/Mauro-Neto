import React from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../img/futurexheader.png';

const DivHeader = styled.header`
    height: 60px;
    background-color: #ff5f00;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
`

const Logo = styled.img`
    max-height: 90%;
    width: 180px;
    cursor: pointer;
`

const Menu = styled.ul`
    list-style-type: none;
    margin: 0;
`

const ItemMenu = styled.li`
    display: inline;
    font-weight: bold;
    font-size: 1.2em;
    cursor: pointer;
    margin: 0 8px;
`

const Header = () => {
    const history = useHistory();

    return (
        <DivHeader>
        <Logo src={logo} onClick={()=>history.push("/")}/>
            <Menu>
                <ItemMenu onClick={()=>history.push("/application-form")}>Inscrições</ItemMenu>
                <ItemMenu onClick={()=>history.push("/login")}>Login</ItemMenu>
            </Menu>
        </DivHeader>
    );
}

export default Header;
