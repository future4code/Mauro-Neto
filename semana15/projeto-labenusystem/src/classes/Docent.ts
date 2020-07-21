import { Person } from "./Person";
import * as moment from 'moment'

export class Docent implements Person{
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public birthDate: moment.Moment,
        public skills: Skill[]
    ){}
}

export enum Skill{
    REACT = 'React',
    REDUX = 'Redux',
    CSS = 'CSS',
    TESTS = 'Testes',
    TYPESCRIPT = 'Typescript',
    OOP = 'Programação Orientada a Objetos',
    BACKEND = 'Backend'
}