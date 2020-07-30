import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDatabase extends BaseDatabase{
    public async registerBand(id: string, name: string, music_genre: string, responsible: string){
        try {
            await this.getConnection().insert({id, name, music_genre, responsible}).into(process.env.BAND_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async viewBandDetails(term: string){
        try {
            const band = await this.getConnection().select('*').from(process.env.BAND_DB_NAME).where({id: term}).orWhere({name: term})
            
            if(band.length>0){
                return Band.dataToBandModel(band[0]);
            }
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}