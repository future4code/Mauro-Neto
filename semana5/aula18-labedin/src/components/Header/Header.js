import React from 'react';
import './Header.css'

function Header() {
    return (
        <div className="header">
            <h3>LabedIn</h3>
            <div className="menu">
                <ul>
                    <li><a href="#inicio">Início</a></li>
                    <li><a href="#contato">Contato</a></li>
                    <li><a href="#formacao">Formação Acadêmica</a></li>
                    <li><a href="#experiencias">Experiências profissionais</a></li>
                    <li><a href="#redes">Minhas redes sociais</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;