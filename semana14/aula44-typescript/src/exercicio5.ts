enum periodos{
    PREHISTORIA = "Pré-História",
    IDADEANTIGA = "Idade Antiga",
    IDADEMEDIA = "Idade Média",
    IDADEMODERNA = "Idade Moderna",
    IDADECONTEMPORANEA = "Idade Contemporânea"
}

function idadeHistorica(ano: number, acdc?: string): periodos{
    if(acdc && acdc.toUpperCase() === "AC"){
        if(ano>4000){
            return periodos.PREHISTORIA
        }
        else{
            return periodos.IDADEANTIGA
        }
    }
    else{
        if(ano<476){
            return periodos.IDADEANTIGA
        }
        else if(ano>=476 && ano<1453){
            return periodos.IDADEMEDIA
        }
        else if(ano>=1453 && ano<1789){
            return periodos.IDADEMODERNA
        }
        return periodos.IDADECONTEMPORANEA
    }
}

console.log(idadeHistorica(4500, "ac"))
console.log(idadeHistorica(3000, "ac"))
console.log(idadeHistorica(450, "dc"))
console.log(idadeHistorica(600, "dc"))
console.log(idadeHistorica(1500))
console.log(idadeHistorica(2020))