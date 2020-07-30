import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    public async signup(id: string, name: string, email: string, password: string, role: string){
        try {
            await this.getConnection().insert({id, name, email, password, role}).into(process.env.USER_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}