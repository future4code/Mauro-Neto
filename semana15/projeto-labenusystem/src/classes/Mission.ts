import * as moment from 'moment'
import {Docent} from './Docent'
import { Student } from './Student'

export abstract class Mission{
    private name: string

    constructor(
        private id: string,
        private startDate: moment.Moment,
        private endDate: moment.Moment,
        private docents: Docent[] = [],
        private students: Student[] = [],
        private currentModule: CurrentModule | undefined
    ){}

    public getId(): string{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getStartDate(): moment.Moment{
        return this.startDate;
    }

    public getEndDate(): moment.Moment{
        return this.endDate;
    }

    public getCurrentModule(): CurrentModule | undefined{
        return this.currentModule;
    }

    public addDocent(docent: Docent){
        this.docents.push(docent);
    }

    public addStudent(student: Student){
        this.students.push(student)
    }

    public setName(name:string){
        this.name = name;
    }
}

export enum CurrentModule{
    FUNDAMENTOS = 1,
    REACT = 2,
    REACT_AVANCADO = 3,
    POO = 4,
    BACKEND = 5,
    INFRA_DEVOPS = 6,
    REAL = 7
}