let arrayDeObjetos=[], arrayFiltrado=[];

function cadastraDespesa(){
    const valor = document.getElementById("valor").value
    const tipo = document.getElementById("tipoCadastro").value
    const descricao = document.getElementById("descricao").value
    if(valor===""){
        alert("Digite o valor!")
        return;
    }
    else if(tipo===""){
        alert("Digite o tipo!")
        return;
    }
    else if(descricao===""){
        alert("Digite a descrição!")
        return;
    }
    else{
        const objeto={
            valor: Number(valor),
            tipo: tipo,
            descricao: descricao
        }
        arrayDeObjetos.push(objeto);
        document.getElementById("valor").value=""
        document.getElementById("tipoCadastro").value=""
        document.getElementById("descricao").value=""
        return filtraDespesas();
    }
}

function filtraDespesas(){
    let filtroTipo=document.getElementById("tipoDetalhes").value
    let filtroValorMinimo=document.getElementById("valorMinimo").value
    let filtroValorMaximo = document.getElementById("valorMaximo").value
    if(filtroValorMinimo===""){
        filtroValorMinimo=-Infinity;
    }
    if(filtroValorMaximo===""){
        filtroValorMaximo=Infinity;
    }
    arrayFiltrado = arrayDeObjetos.filter(filtro =>{
        if(filtroTipo!=="")
            return filtro.valor>=filtroValorMinimo && filtro.valor<=filtroValorMaximo && filtro.tipo===filtroTipo
        else
            return filtro.valor>=filtroValorMinimo && filtro.valor<=filtroValorMaximo
    })
    mostraDespesas();
}

function limpaFiltros(){
    document.getElementById("tipoDetalhes").value=""
    document.getElementById("valorMinimo").value=""
    document.getElementById("valorMaximo").value=""
    filtraDespesas();
}

function mostraDespesas(){
    document.getElementById("listaDeDespesas").innerHTML=""
    for(despesa of arrayFiltrado){
        document.getElementById("listaDeDespesas").innerHTML+="<li>R$"+despesa.valor.toFixed(2)+" - "+despesa.tipo+" - "+despesa.descricao+"</li>"
    }
    mostraExtrato()
}

function mostraExtrato(){
    let valor=0;
    for(despesa of arrayFiltrado){
        valor+=despesa.valor;
    }
    document.getElementById("valorTotal").innerHTML="Valor total: R$"+valor.toFixed(2)
}