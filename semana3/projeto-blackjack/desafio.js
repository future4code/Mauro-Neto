/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */

function desafio(){
   console.log ("Bem vindo ao jogo de BlackJack!");
   if(confirm("Deseja iniciar uma nova rodada?")){
      let pontosUsuario=0, pontosPc=0, cartasUsuario=[], cartasPc=[];

      while(pontosPc<=21 || pontosUsuario <=21){
         for(let i=0; i<2; i++){
            let carta = comprarCarta(); 
            cartasUsuario.push(carta.texto)
            pontosUsuario += carta.valor;
            carta = comprarCarta(); 
            cartasPc.push(carta.texto)
            pontosPc += carta.valor;
         }
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
}