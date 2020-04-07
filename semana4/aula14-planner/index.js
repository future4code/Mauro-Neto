function adicionarTarefa(){
    const atividade = document.getElementById("atividade").value;
    const dia = document.getElementById("dia").value;
    if(atividade !== ""){
        switch(dia){
            case "segunda":
                document.getElementById("segunda").innerHTML += "<li>"+atividade+"</li>"
                break;
            case "terca":
                document.getElementById("terca").innerHTML += "<li>"+atividade+"</li>"
                break;
            case "quarta":
                document.getElementById("quarta").innerHTML += "<li>"+atividade+"</li>"
                break;
            case "quinta":
                document.getElementById("quinta").innerHTML += "<li>"+atividade+"</li>"
                break;
            case "sexta":
                document.getElementById("sexta").innerHTML += "<li>"+atividade+"</li>"
                break;
            case "sabado":
                document.getElementById("sabado").innerHTML += "<li>"+atividade+"</li>"
                break;
            case "domingo":
                document.getElementById("domingo").innerHTML += "<li>"+atividade+"</li>"
                break;
        }
        document.getElementById("atividade").value="";
    }
    else{
        alert("A tarefa não pode ser vazia!")
    }
    const teste =  document.getElementsByTagName("li");
        console.log(teste)
}