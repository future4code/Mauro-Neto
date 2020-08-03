import { CreateShowDTO, Show } from "../model/Show";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { Authenticator } from "../service/Authenticator";

export class ShowBusiness{
    constructor(
        private showDatabase: ShowDatabase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    public async createShow(token: string, input: CreateShowDTO): Promise<void>{
        this.authenticator.getData(token)

        if(!input.week_day || !input.start_time || !input.end_time || !input.band_id){
            throw new InvalidParameterError("Missing input")
        }

        if(input.week_day.trim()==="" || input.band_id.trim()===""){
            throw new InvalidParameterError("You can't send parameters with blank characters")
        }

        if(input.week_day){
            Show.stringToShowDays(input.week_day)
        }

        if((input.start_time % 1 !== 0) || (input.end_time %1 !== 0)){
            throw new InvalidParameterError(`We only accept "o'clock" hours`)
        }

        if(input.start_time >= input.end_time){
            throw new InvalidParameterError("The end time must be greater than start time")
        }

        if((input.start_time < 8 || input.start_time>22) || (input.end_time > 23 || input.end_time<9)){
            throw new InvalidParameterError(`Times allowed for shows: start_time: 8-22 end_time: 9-23`)
        }

        const show = await this.showDatabase.verifyExistingShowTime(input.week_day, input.start_time, input.end_time)

        if(show){
            throw new Error("There's a show in the same time")
        }

        const id = this.idGenerator.generate();

        await this.showDatabase.createShow(id, input.week_day, input.start_time.toString(), input.end_time.toString(), input.band_id)
    }

    public async getShowsByDay(token: string, week_day: string){
        this.authenticator.getData(token)

        if(!week_day || week_day.trim()===""){
            throw new InvalidParameterError("Missing input")
        }

        if(week_day){
            Show.stringToShowDays(week_day)
        }

        const shows = await this.showDatabase.getShowsByDay(week_day)

        return shows;
    }
}