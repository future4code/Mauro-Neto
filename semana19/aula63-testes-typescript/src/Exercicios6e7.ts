import knex from "knex"
import Knex from "knex"
import dotenv from 'dotenv'

dotenv.config();


export abstract class BaseDatabase{
    private static connection: Knex | null = null;
    
    public getConnection(): Knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME
                }
            })
        }

        return BaseDatabase.connection
    }

    public async destroyConnection() {
        await BaseDatabase.connection.destroy();
        BaseDatabase.connection = null;
    }
}

export class PostDatabase extends BaseDatabase{
    public async createPost(creator_id: string, id: string, description: string, type?:string, photo?: string): Promise<void> {
        try {
            return await this.getConnection()
            .insert ({
                creator_id,
                id,
                description,
                type,
                photo
            })
            .into(process.env.POSTS_DB_NAME)
        }catch(error){
            console.log(error.sqlMessage);
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getPostById(id: string): Promise<any>{
        try {
            const result = await this.getConnection().select('id', 'creator_id', 'description').from(process.env.POSTS_DB_NAME).where({id})

            return result[0];
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async deletePostById(id: string): Promise<void>{
        try {
            await this.getConnection().delete().from(process.env.POSTS_DB_NAME).where({id})
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}