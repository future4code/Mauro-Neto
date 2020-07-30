import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase{
    public async signup(id: string, name: string, email: string, password: string, role: string): Promise<void>{
        try {
            await this.getConnection().insert({id, name, email, password, role}).into(process.env.USER_DB_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getUserByEmail(email: string): Promise<User>{
        try {
            const user = await this.getConnection().select('*').from(process.env.USER_DB_NAME).where({email})
            
            return User.dataToUserModel(user[0])
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}