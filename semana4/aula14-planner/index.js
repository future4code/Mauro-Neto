function adicionarTarefa(){
    const atividade = document.getElementById("atividade").value;
    const dia = document.getElementById("dia").value;
    const hora = document.getElementById("hora").value;
    const diaEHora = dia+hora;
    console.log(diaEHora);
    if(atividade !== ""){
        document.getElementById(diaEHora).innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
        document.getElementById("atividade").value="";
    }
    else{
        alert("A tarefa não pode ser vazia!")
    }
}

function riscar(risca){
    if(risca.style.textDecoration === "line-through"){
        risca.style.textDecoration="";
    }
    else{
        risca.style.textDecoration="line-through";
    }
}

function excluirTarefas(){
    const apagar = document.getElementsByTagName("ul");
    for(i=0; i<apagar.length; i++){
        apagar[i].innerHTML="";
    }
}