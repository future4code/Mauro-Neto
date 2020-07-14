### Exercício 1
**a)** Round são as quantidades de vezes que o algoritmo que gera o hash vai iterar e salt é uma string aleatória gerada pelo algoritmo. Utilizei o valor 12 por ser um padrão de algumas bibliotecas.

**b)** 
```import bcrypt from "bcryptjs"

export class HashManager{
    public async hash(s: string): Promise<string> {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const result = await bcrypt.hash(s, salt);
        return result;
    }
}
```

**c)**
```public async compare(s: string, hash: string): Promise<boolean>{
        const result = await bcrypt.compare(s, hash);
        return result;
}
```

### Exercício 2
**a)** O cadastro, pois os dados que já foram salvos como plaintext, e terá que gerar um novo cadastro, passando pelo hash.

**b)** 
```app.post("/signup", async(req: Request, res: Response)=>{
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            if(!req.body.email){
                throw new Error("Missing e-mail")
            }
            throw new Error("Invalid e-mail");
        }

        if(!req.body.password || req.body.password.length < 6){
            if(!req.body.password){
                throw new Error("Missing password")
            }
            throw new Error("Password must have 6 or more digits");
        }

        const userDB = new UserDatabase;
        const idGenerator = new IdGenerator;
        const authenticator = new Authenticator;
        const hashManager = new HashManager;

        const id = idGenerator.generate()
        const password = hashManager.hash(req.body.password);

        await userDB.createUser(id, req.body.email, password)
        const token = authenticator.generateToken({id});
        
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})
```

**d)** Não, porque nesse endpoint, pegamos as informações do usuário apenas pelo ID, sem necessidade de senha

### Exercício 3
**a)** 
```ALTER TABLE User ADD COLUMN role ENUM("normal", "admin") DEFAULT "normal";
```

**b)**
```import * as jwt from "jsonwebtoken";

export class Authenticator {
    private static EXPIRES_IN = "1min";
    public generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
        {
            id: input.id,
        },
        process.env.JWT_KEY as string,
        {
            expiresIn: Authenticator.EXPIRES_IN,
        }
        );
        return token;
    }

    public getData(token: string): AuthenticationData{
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any
        return {id: payload.id, role: payload.role}
    }
}

interface AuthenticationData {
     id: string,
     role: UserRole
}

enum UserRole{
    NORMAL = "normal",
    ADMIN = "admin"
}
```

**c)** No método createUser:
```public async createUser(id: string, email: string, password: string, role: UserRole): Promise<void> {
        try{
            await this.connection.insert({id,email,password, role}).into(this.TABLE_NAME);
        }
        catch(error){
            throw new Error (error.sqlMessage);
        }
}
```

Endpoint:
```app.post("/signup", async(req: Request, res: Response)=>{
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            if(!req.body.email){
                throw new Error("Missing e-mail")
            }
            throw new Error("Invalid e-mail");
        }

        if(!req.body.password || req.body.password.length < 6){
            if(!req.body.password){
                throw new Error("Missing password")
            }
            throw new Error("Password must have 6 or more digits");
        }

        const userDB = new UserDatabase;
        const idGenerator = new IdGenerator;
        const authenticator = new Authenticator;
        const hashManager = new HashManager;

        const id = idGenerator.generate()
        const password = await hashManager.hash(req.body.password);

        await userDB.createUser(id, req.body.email, password, req.body.role)
        const token = authenticator.generateToken({id, role: req.body.role});

        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})
```

**d)** No endpoint de login bastou alterar uma linha:
```const token = authenticator.generateToken({id: user.id, role: user.role})
```

### Exercício 4
**a)** 
```app.get("/user/profile", async(req:Request, res: Response)=>{
    try {
        const userDB = new UserDatabase;
        const authenticator = new Authenticator;

        const authenticatorData = await authenticator.getData(req.headers.authorization as string)
        if(authenticatorData.role !== "normal"){
            res.status(403).send({message: "Unauthorized"})
        }
        
        const id = authenticatorData.id;

        const user = await userDB.getUserById(id);

        res.status(200).send({id, email: user.email});
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
```

### Exercício 5
Na classe UserDatabase:
```public async deleteUser(id: string): Promise<void>{
        try {
            await this.connection.delete().from(this.TABLE_NAME).where("id", "=", id);
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
}
```

Endpoint:
```app.delete("/user/:id", async(req: Request, res: Response)=>{
    try {
        const authenticator = new Authenticator;
        
        const authenticatorData = await authenticator.getData(req.headers.authorization)
        if(authenticatorData.role !== "admin"){
            res.status(403).send({message: "Unauthorized"})
        }
        
        const userDB = new UserDatabase;
        await userDB.deleteUser(req.params.id)

        res.status(200).send({message: "User deleted"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
```

### Exercício 6
```app.get("/user/:id", async(req:Request, res: Response)=>{
    try {
        const authenticator = new Authenticator;
        authenticator.getData(req.headers.authorization)

        const userDB = new UserDatabase;
        const user = await userDB.getUserById(req.params.id)

        res.status(200).send({id: user.id, email: user.email, role: user.role})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
```

### Exercício 7
**a)** Classe BaseDatabase:
```import knex from "knex";
import Knex from "knex"

export abstract class BaseDatabase{
    private static connection: Knex | null = null;

    protected getConnection(): Knex {
        if(BaseDatabase.connection === null){
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                host: process.env.DB_HOST,
                port: 3306,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                },
            });
        }
        return BaseDatabase.connection;
    }

    public static async destroyConnection(): Promise<void>{
        if(BaseDatabase.connection){
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection=null;
        }
    }
}
```

Classe UserDatabase alterada, utilizando o método do BaseDatabase:
```import { UserRole } from "../service/Authenticator";
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
```

**b)** Fiz a chamada do BaseDatabase.destroyConnection() no final dos endpoints.