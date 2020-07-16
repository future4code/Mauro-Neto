import * as moment from 'moment'

export interface Person{
    id: string,
    name: string,
    email: string,
    birthDate: moment.Moment;
}