import React from 'react';
import './App.css';
import CardGrande from './components/CardGrande/CardGrande';
import ImagemButton from './components/ImagemButton/ImagemButton';
import CardPequeno from './components/CardPequeno/CardPequeno'
import Header from './components/Header/Header'


function App() {
  return (
    <div className="App">
      <Header />
      <div className="page-section-container" id="inicio">
        <h2>Dados pessoais</h2>
        <a href="https://linkedin.com/in/jmauroneto" target="_blank">
          <CardGrande 
            imagem="https://avatars2.githubusercontent.com/u/16311902?s=460&u=5e36fe1c73117ac3622370fb80a31e4ca39c35c7&v=4" 
            nome="Mauro Neto" 
            descricao="Oi, eu sou Mauro Neto. Sou estudante da turma Julian da Labenu."
          />
        </a>
        <ImagemButton 
          imagem="https://image.flaticon.com/icons/png/512/117/117472.png" 
          texto="Ver mais"
        />
      </div>
      <div className="page-section-container" id="contato">
        <CardPequeno 
          imagem="https://www.traum.com.br/wp-content/uploads/2018/06/email-icon-121-400x400.png" 
          nome="E-mail: " 
          descricao="a@a.com" 
        />
        <CardPequeno 
          imagem="https://image.flaticon.com/icons/svg/1239/1239525.svg" 
          nome="Endereço: " 
          descricao="Rua A, s/n" 
        />
      </div>
      <div className="page-section-container" id="formacao">
        <h2>Formação Acadêmica</h2>
        <CardGrande 
          imagem="https://portal.ifba.edu.br/banner/banner-capa/Logon.jpg" 
          nome="Instituto Federal da Bahia" 
          descricao="Estudante de Engenharia Elétrica, início em 2018 com previsão de término em 2022" 
        />
        <CardGrande 
          imagem="https://s3.amazonaws.com/future4.com.br/static/headf4-c492117ca2373dc85ca81bf715b3dc2a.png" 
          nome="Labenu" 
          descricao="Estudante de Desenvolvimento Web Full Stack" 
        />
      </div>
      <div className="page-section-container" id="experiencias">
        <h2>Experiências Profissionais</h2>
        <CardGrande 
          imagem="https://instagram.fpav1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/20986789_337732726680837_3969111039240306688_a.jpg?_nc_ht=instagram.fpav1-1.fna.fbcdn.net&_nc_ohc=wiQOeNHUBgEAX8SmkLC&oh=13714994d95a052f69c801f840e0b308&oe=5EBEBE8B" 
          nome="Maria Bonita Turismo" 
          descricao="Proprietário de outubro de 2016 a janeiro de 2020" 
        />
        
        <CardGrande 
          imagem="https://instagram.fpav1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/18889082_1418695038174272_543533845090140160_a.jpg?_nc_ht=instagram.fpav1-1.fna.fbcdn.net&_nc_ohc=zMO2xMoDFZgAX9CSEoj&oh=63712bf79cc687b57a650459e4ac3c87&oe=5EC06F45" 
          nome="San Marino Hotel" 
          descricao="Supervisor de dezembro de 2016 a maio de 2019" 
        />
      </div>

      <div className="page-section-container" id="redes">
        <h2>Minhas redes sociais</h2>
        <a href="https://www.facebook.com/jmauroneto" target="_blank">
          <ImagemButton 
            imagem="https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png" 
            texto="Facebook" 
          />        
        </a>
        <a href="https://www.linkedin.com/in/jmauroneto" targer="_blank">
          <ImagemButton 
            imagem="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-linkedin-circle-512.png" 
            texto="LinkedIn" 
          />        
        </a>
        <a href="https://www.github.com/jmauroneto" targer="_blank">
          <ImagemButton 
            imagem="https://image.flaticon.com/icons/png/512/25/25231.png" 
            texto="GitHub" 
          />        
        </a>
      </div>
    </div>
  );
}

export default App;
