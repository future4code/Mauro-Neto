"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = exports.Docent = void 0;
class Docent {
    constructor(id, name, email, birthDate, skills) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.skills = skills;
    }
}
exports.Docent = Docent;
var Skill;
(function (Skill) {
    Skill["REACT"] = "React";
    Skill["REDUX"] = "Redux";
    Skill["CSS"] = "CSS";
    Skill["TESTS"] = "Testes";
    Skill["TYPESCRIPT"] = "Typescript";
    Skill["OOP"] = "Programa\u00E7\u00E3o Orientada a Objetos";
    Skill["BACKEND"] = "Backend";
})(Skill = exports.Skill || (exports.Skill = {}));
//# sourceMappingURL=Docent.js.map