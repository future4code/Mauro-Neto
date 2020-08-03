import { BaseDatabase } from "./BaseDatabase";

export class PhotoDatabase extends BaseDatabase{
    public async addPhoto(show_id: string, photo: string){
        try {
            await this.getConnection().insert({show_id, photo}).into(process.env.PHOTO_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getPhotosFromShow(show_id: string){
        try {
            const data = await this.getConnection().select('*').from(process.env.PHOTO_DB_NAME).where({show_id})

            const photos = data.map(photo=> photo.photo)

            return photos;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}