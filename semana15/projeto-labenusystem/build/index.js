"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const JSONFileManager_1 = require("./classes/JSONFileManager");
const Docent_1 = require("./classes/Docent");
const Student_1 = require("./classes/Student");
const Mission_1 = require("./classes/Mission");
const FullTimeMission_1 = require("./classes/FullTimeMission");
const NightMission_1 = require("./classes/NightMission");
const docentsFileManager = new JSONFileManager_1.JSONFileManager('./docents.json');
const studentsFileManager = new JSONFileManager_1.JSONFileManager('./students.json');
const missionFileManager = new JSONFileManager_1.JSONFileManager('./missions.json');
const prof1 = new Docent_1.Docent("1", "Professor 1", "prof1@lbn.com", moment(), [Docent_1.Skill.BACKEND, Docent_1.Skill.CSS, Docent_1.Skill.OOP, Docent_1.Skill.REACT, Docent_1.Skill.REDUX, Docent_1.Skill.TESTS, Docent_1.Skill.TYPESCRIPT]);
const prof2 = new Docent_1.Docent("2", "Professor 2", "prof1@lbn.com", moment(), [Docent_1.Skill.BACKEND, Docent_1.Skill.CSS, Docent_1.Skill.OOP, Docent_1.Skill.TYPESCRIPT]);
docentsFileManager.writeFile([prof1, prof2]);
const aluno1 = new Student_1.Student("3", "Aluno 1", "aluno1@lbn.com", moment("22/04/1998", "DD/MM/YYYY"), ["Coding", "Studies", "Watch movies"]);
const aluno2 = new Student_1.Student("4", "Aluno 2", "aluno2@lbn.com", moment("05/11/1996", "DD/MM/YYYY"), ["Reading", "Play RPG"]);
studentsFileManager.writeFile([aluno1, aluno2]);
const turma1 = new FullTimeMission_1.FullTimeMission("5", moment('16/03/2020', 'DD/MM/YYYY'), moment('16/09/2020', 'DD/MM/YYYY'), [], [], Mission_1.CurrentModule.POO);
const turma2 = new NightMission_1.NightMission("6", moment('16/07/2020', 'DD/MM/YYYY'), moment('16/01/2021', 'DD/MM/YYYY'), [], [], undefined);
const getStudentBirthDateById = (id) => {
    const dados = studentsFileManager.readFile().map((aluno) => {
        return new Student_1.Student(aluno.id, aluno.name, aluno.email, aluno.birthDate, aluno.hobbies);
    });
    const alunoEncontrado = dados.find((aluno) => {
        return aluno.id === id;
    });
    return alunoEncontrado.birthDate;
};
turma1.setName("julian");
turma1.addStudent(aluno1);
turma1.addStudent(aluno2);
turma1.addDocent(prof1);
turma2.setName("tesla-na-night");
missionFileManager.writeFile([turma1, turma2]);
console.log(getStudentBirthDateById("3"));
console.log(getStudentBirthDateById("4"));
//# sourceMappingURL=index.js.map