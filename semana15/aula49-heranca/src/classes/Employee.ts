import {User} from './User'
import * as moment from 'moment'

export class Employee extends User{
    static BENEFITS_VALUE:number = 400;

    protected admissionDate: moment.Moment;
    protected baseSalary: number

    constructor(id: string, 
        email: string,
        name: string, 
        password: string,
        admissionDate: moment.Moment,
        baseSalary: number
    ){
        super(id, email, name, password);
        this.admissionDate = admissionDate;
        this.baseSalary = baseSalary;
    }  

    public getAdmissionDate(): moment.Moment{
        return this.admissionDate;
    }

    public getBaseSalary(): number{
        return this.baseSalary;
    }

    public calculateTotalSalary(): number{
        return this.baseSalary + Employee.BENEFITS_VALUE;
    }
}