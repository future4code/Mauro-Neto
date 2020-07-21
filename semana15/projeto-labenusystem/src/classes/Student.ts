import * as moment from 'moment'
import { Person } from './Person'
import { JSONFileManager } from './JSONFileManager'

export class Student implements Person{
    constructor(
        public id: string, 
        public name: string, 
        public email: string,
        public birthDate: moment.Moment,
        public hobbies: string[]
    ){}
}