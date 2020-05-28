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
    let token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token")
        token=null;
        history.push("/")
    }

    return (
        <DivHeader>
        <Logo src={logo} onClick={()=>history.push("/")}/>
            {!token &&
                <Menu>
                    <ItemMenu onClick={()=>history.push("/")}>Home</ItemMenu>
                    <ItemMenu onClick={()=>history.push("/application-form")}>Inscrições</ItemMenu>
                    <ItemMenu onClick={()=>history.push("/login")}>Login</ItemMenu>
                </Menu>
            }
            {token &&
                <Menu>
                    <ItemMenu onClick={()=>history.push("/")}>Home</ItemMenu>
                    <ItemMenu onClick={()=>history.push("/trips/list")}>Listar Viagens</ItemMenu>
                    <ItemMenu onClick={()=>history.push("/trips/create")}>Criar Viagem</ItemMenu>
                    <ItemMenu onClick={logout}>Sair</ItemMenu>
                </Menu>
            }
        </DivHeader>
    );
}

export default Header;
