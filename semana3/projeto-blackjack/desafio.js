console.log ("Bem vindo ao jogo de BlackJack!");
if(confirm("Deseja iniciar uma nova rodada?")){
   let pontosUsuario=0, pontosPc=0, cartasUsuario=[], cartasPc=[], comparador=0;
   while(comparador===0){
      for(let i=0; i<2; i++){
            let carta = comprarCarta(); 
            cartasUsuario.push(carta.texto)
            pontosUsuario += carta.valor;
            carta = comprarCarta(); 
            cartasPc.push(carta.texto)
            pontosPc += carta.valor;
      }
      if(pontosUsuario <= 21 || pontosPc <= 21){
         comparador=1;
      }
      else{
         cartasUsuario=[];
         cartasPc=[];
         pontosUsuario=0;
         pontosPc=0;
      }
   }
   while((confirm("Suas cartas são "+ cartasUsuario +". A carta revelada do computador é "+ cartasPc[0]+ ".\nDeseja comprar mais uma carta?"))){
      let carta = comprarCarta(); 
      cartasUsuario.push(carta.texto)
      pontosUsuario += carta.valor;
      if(pontosUsuario>21){
         break;
      }
   }
   while(pontosPc <= pontosUsuario && pontosUsuario<=21){
      let carta = comprarCarta(); 
      cartasPc.push(carta.texto)
      pontosPc += carta.valor;
   }
   if(((pontosUsuario > pontosPc) && pontosUsuario <= 21) || (pontosPc>21 && pontosUsuario<21)){
      alert("Suas cartas são "+ cartasUsuario +". Sua pontuação é "+ pontosUsuario+ ".\nAs cartas do computador são "+ cartasPc+ ". A pontuação do computador é "+ pontosPc+ ".\nO usuário ganhou!");
   }
   else if(((pontosPc > pontosUsuario) && pontosPc <= 21) || (pontosUsuario>21 && pontosPc<21)){
      alert("Suas cartas são "+ cartasUsuario +". Sua pontuação é "+ pontosUsuario+ ".\nAs cartas do computador são "+ cartasPc+ ". A pontuação do computador é "+ pontosPc+ ".\nO computador ganhou!");
   }
   else{
      alert("Suas cartas são "+ cartasUsuario +". Sua pontuação é "+ pontosUsuario+ ".\nAs cartas do computador são "+ cartasPc+ ". A pontuação do computador é "+ pontosPc+ ".\nO jogo empatou!");
   }
}
else{
   console.log("O jogo acabou");
}
