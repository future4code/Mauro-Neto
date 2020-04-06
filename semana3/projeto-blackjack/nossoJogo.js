console.log ("Bem vindo ao jogo de BlackJack!");
if(confirm("Deseja iniciar uma nova rodada?")){
   let pontosUsuario=0, pontosPc=0, cartasUsuario="Usuário - cartas: ", cartasPc="Computador - cartas: ";

   for(let i=0; i<2; i++){
      let carta = comprarCarta(); 
      cartasUsuario += carta.texto+" "
      pontosUsuario += carta.valor;
      carta = comprarCarta(); 
      cartasPc += carta.texto+" "
      pontosPc += carta.valor;
   }
   console.log(cartasUsuario+" - pontuação ", pontosUsuario)
   console.log(cartasPc+" - pontuação ", pontosPc)
   if(((pontosUsuario > pontosPc) && pontosUsuario <= 21) || (pontosPc>21 && pontosUsuario<21)){
      console.log("O usuário ganhou!");
   }
   else if(((pontosPc > pontosUsuario) && pontosPc <= 21) || (pontosUsuario>21 && pontosPc<21)){
      console.log("O computador ganhou!")
   }
   else{
      console.log("Empate!")
   }

}
else{
   console.log("O jogo acabou");
}