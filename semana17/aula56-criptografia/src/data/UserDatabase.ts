import { UserRole } from "../service/Authenticator";
import { BaseDatabase } from "../service/BaseDatabase";

export class UserDatabase extends BaseDatabase{
    private TABLE_NAME = "User";

    public async createUser(id: string, email: string, password: string, role: UserRole): Promise<void> {
        try{
            await this.getConnection().insert({id,email,password, role}).into(this.TABLE_NAME);
        }
        catch(error){
            throw new Error (error.sqlMessage);
        }
    }

    public async getUserByEmail(email: string): Promise<any>{
        try {
            const user = await this.getConnection().select('*').from(this.TABLE_NAME).where("email", "=", email);
            return user[0];
        } catch (error) {
            throw new Error(error.sqlMessage);
        }
    }

    public async getUserById(id: string): Promise<any>{
        try {
            const user = await this.getConnection().select('*').from(this.TABLE_NAME).where("id", "=", id)
            return user[0]
        } catch (error) {
            throw new Error(error.sqlMessage);
        }
    }

    public async deleteUser(id: string): Promise<void>{
        try {
            await this.getConnection().delete().from(this.TABLE_NAME).where("id", "=", id);
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}