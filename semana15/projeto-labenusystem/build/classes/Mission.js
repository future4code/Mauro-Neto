"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentModule = exports.Mission = void 0;
class Mission {
    constructor(id, startDate, endDate, docents = [], students = [], currentModule) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.docents = docents;
        this.students = students;
        this.currentModule = currentModule;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    getCurrentModule() {
        return this.currentModule;
    }
    addDocent(docent) {
        this.docents.push(docent);
    }
    addStudent(student) {
        this.students.push(student);
    }
    setName(name) {
        this.name = name;
    }
}
exports.Mission = Mission;
var CurrentModule;
(function (CurrentModule) {
    CurrentModule[CurrentModule["FUNDAMENTOS"] = 1] = "FUNDAMENTOS";
    CurrentModule[CurrentModule["REACT"] = 2] = "REACT";
    CurrentModule[CurrentModule["REACT_AVANCADO"] = 3] = "REACT_AVANCADO";
    CurrentModule[CurrentModule["POO"] = 4] = "POO";
    CurrentModule[CurrentModule["BACKEND"] = 5] = "BACKEND";
    CurrentModule[CurrentModule["INFRA_DEVOPS"] = 6] = "INFRA_DEVOPS";
    CurrentModule[CurrentModule["REAL"] = 7] = "REAL";
})(CurrentModule = exports.CurrentModule || (exports.CurrentModule = {}));
//# sourceMappingURL=Mission.js.map