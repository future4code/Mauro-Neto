function adicionarTarefa(){
    const atividade = document.getElementById("atividade").value;
    const dia = document.getElementById("dia").value;
    if(atividade !== ""){
        switch(dia){
            case "segunda":
                document.getElementById("segunda").innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
                break;
            case "terca":
                document.getElementById("terca").innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
                break;
            case "quarta":
                document.getElementById("quarta").innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
                break;
            case "quinta":
                document.getElementById("quinta").innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
                break;
            case "sexta":
                document.getElementById("sexta").innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
                break;
            case "sabado":
                document.getElementById("sabado").innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
                break;
            case "domingo":
                document.getElementById("domingo").innerHTML += "<li onclick='riscar(this)'>"+atividade+"</li>"
                break;
        }
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