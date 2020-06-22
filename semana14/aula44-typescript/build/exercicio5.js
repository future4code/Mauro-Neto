var periodos;
(function (periodos) {
    periodos["PREHISTORIA"] = "Pr\u00E9-Hist\u00F3ria";
    periodos["IDADEANTIGA"] = "Idade Antiga";
    periodos["IDADEMEDIA"] = "Idade M\u00E9dia";
    periodos["IDADEMODERNA"] = "Idade Moderna";
    periodos["IDADECONTEMPORANEA"] = "Idade Contempor\u00E2nea";
})(periodos || (periodos = {}));
function idadeHistorica(ano, acdc) {
    if (acdc && acdc.toUpperCase() === "AC") {
        if (ano > 4000) {
            return periodos.PREHISTORIA;
        }
        else {
            return periodos.IDADEANTIGA;
        }
    }
    else {
        if (ano < 476) {
            return periodos.IDADEANTIGA;
        }
        else if (ano >= 476 && ano < 1453) {
            return periodos.IDADEMEDIA;
        }
        else if (ano >= 1453 && ano < 1789) {
            return periodos.IDADEMODERNA;
        }
        return periodos.IDADECONTEMPORANEA;
    }
}
console.log(idadeHistorica(4500, "ac"));
console.log(idadeHistorica(3000, "ac"));
console.log(idadeHistorica(450, "dc"));
console.log(idadeHistorica(600, "dc"));
console.log(idadeHistorica(1500));
console.log(idadeHistorica(2020));
//# sourceMappingURL=exercicio5.js.map