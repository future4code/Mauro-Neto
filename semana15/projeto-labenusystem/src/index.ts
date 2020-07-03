import * as moment from 'moment'
import { JSONFileManager } from "./classes/JSONFileManager";
import { Docent, Skill } from "./classes/Docent";
import { Student } from "./classes/Student";
import {CurrentModule} from './classes/Mission'
import { FullTimeMission } from "./classes/FullTimeMission";
import {NightMission} from './classes/NightMission'

const docentsFileManager = new JSONFileManager('./docents.json')
const studentsFileManager = new JSONFileManager('./students.json')
const missionFileManager = new JSONFileManager('./missions.json')

const prof1 = new Docent(
    "1", 
    "Professor 1", 
    "prof1@lbn.com", 
    moment(),
    [Skill.BACKEND, Skill.CSS, Skill.OOP, Skill.REACT, Skill.REDUX, Skill.TESTS, Skill.TYPESCRIPT]
)

const prof2 = new Docent(
    "2",
    "Professor 2",
    "prof1@lbn.com",
    moment(),
    [Skill.BACKEND, Skill.CSS, Skill.OOP, Skill.TYPESCRIPT]
)

docentsFileManager.writeFile([prof1, prof2])

const aluno1 = new Student(
    "3",
    "Aluno 1",
    "aluno1@lbn.com",
    moment(),
    ["Coding", "Studies", "Watch movies"]
)

const aluno2 = new Student(
    "4",
    "Aluno 2",
    "aluno2@lbn.com",
    moment(),
    ["Reading", "Play RPG"]
)

studentsFileManager.writeFile([aluno1, aluno2])

const turma1 = new FullTimeMission(
    "5", 
    moment('16/03/2020', 'DD/MM/YYYY'), 
    moment('16/09/2020', 'DD/MM/YYYY'),
    [], 
    [],
    CurrentModule.POO
)

const turma2 = new NightMission(
    "6",
    moment('16/07/2020', 'DD/MM/YYYY'),
    moment('16/01/2021', 'DD/MM/YYYY'),
    [],
    [],
    undefined
)

turma1.setName("julian");
turma1.addStudent(aluno1)
turma1.addStudent(aluno2);
turma1.addDocent(prof1);

turma2.setName("tesla-na-night");
console.log(turma2.getName())

missionFileManager.writeFile([turma1, turma2])