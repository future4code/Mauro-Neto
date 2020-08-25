export class Show{
    constructor(
        private id: string,
        private week_day: ShowDays,
        private start_time: number,
        private end_time: number,
        private band_id: string
    ){}

    public getId(){
        return this.id;
    }

    public getWeekDay(){
        return this.week_day
    }

    public getStartTime(){
        return this.start_time
    }

    public getEndTime(){
        return this.end_time
    }

    public getBandId(){
        return this.band_id
    }

    public static stringToShowDays(input: string): ShowDays{
        switch(input.toUpperCase()){
            case "FRI":
                return ShowDays.FRI
            case "SAT":
                return ShowDays.SAT
            case "SUN":
                return ShowDays.SUN
            default:
                throw new Error("Invalid week day for shows")
        }
    }

    public static dataToShowModel(show: any): Show{
        return new Show(show.id, Show.stringToShowDays(show.week_day), show.start_time, show.end_time, show.band_id)
    }
}

export interface CreateShowDTO{
    week_day: string,
    start_time: number,
    end_time: number,
    band_id: string
}

export enum ShowDays{
    FRI = "FRI",
    SAT = "SAT",
    SUN = "SUN"
}

export interface ShowsByDayDto{
    bandName: string,
    musicGenre: string
}