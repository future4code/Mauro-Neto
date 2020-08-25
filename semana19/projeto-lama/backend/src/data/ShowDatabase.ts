import { BaseDatabase } from "./BaseDatabase";
import { Show, ShowsByDayDto } from "../model/Show";

export class ShowDatabase extends BaseDatabase{
    public async createShow(id: string, week_day: string, start_time: string, end_time: string, band_id: string){
        try {
            await this.getConnection().insert({id, week_day, start_time, end_time, band_id}).into(process.env.SHOW_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async verifyExistingShowTime(week_day: string, start_time: number, end_time: number): Promise<boolean>{
        try {
            const show = await this.getConnection()
                .select('*')
                .from(process.env.SHOW_DB_NAME)
                .where({week_day})
                .andWhere("start_time", "<", end_time)
                .andWhere("end_time", ">", start_time)

            if(show.length>0){
                return true
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getShowsByDay(week_day: string): Promise<ShowsByDayDto[]>{
        try {
            const shows = await this.getConnection()
                .select(`${process.env.BAND_DB_NAME}.name as bandName`, `${process.env.BAND_DB_NAME}.music_genre as musicGenre`)
                .from(process.env.SHOW_DB_NAME)
                .join(process.env.BAND_DB_NAME, `${process.env.SHOW_DB_NAME}.band_id`, `${process.env.BAND_DB_NAME}.id`)
                .where(`${process.env.SHOW_DB_NAME}.week_day`, "=", week_day)
                .orderBy(`${process.env.SHOW_DB_NAME}.start_time`)

            return shows
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getShowById(id: string): Promise<boolean>{
        try {
            const show = await this.getConnection().select('*').from(process.env.SHOW_DB_NAME).where({id})

            if(show.length>0){
                return true
            }

            return false
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}