let arrayDeObjetos=[]

function adicionarConteudo(evento){
    evento.preventDefault();
    const titulo = document.getElementById("titulo").value
    const autor = document.getElementById("autor").value 
    const conteudo = document.getElementById("conteudo").value
    const imagem = document.getElementById("imagem").value

    if(imagem !== ""){
        
    }

    const objeto = {
        titulo: titulo,
        autor: autor,
        conteudo: conteudo
    }
    arrayDeObjetos.push(objeto);
    document.getElementById("titulo").value  = "";
    document.getElementById("autor").value  = "";
    document.getElementById("conteudo").value = "";
    console.log(arrayDeObjetos);

    inserePost(objeto)
}

function inserePost(objeto){
    const temp = document.getElementById("posts").innerHTML;
    document.getElementById("posts").innerHTML = "<article><h2>"+objeto.titulo+"</h2><h3>"+objeto.autor+"</h3><p>"+objeto.conteudo+"</p><hr>"+temp;
}