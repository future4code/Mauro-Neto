import knex from 'knex'
import Knex from 'knex'

export abstract class BaseDatabase {
    private static connection: Knex | null = null;

    protected getConnection(): Knex{
        if(!BaseDatabase.connection){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    port: 3306,
                    database: process.env.DB_NAME
                }
            })
        }

        return BaseDatabase.connection
    }

    public static async destroyConnnection(): Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }
}