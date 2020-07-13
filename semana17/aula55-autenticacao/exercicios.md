### Exercício 1
**a)** É muito melhor usar strings para representar ids, uma vez que temos muito mais possibilidades de combinações, sendo uma probabilidade extremamente baixa de haver colisão de ids, enquanto com números, isso poderia ocorrer facilmente.

**b)** 
```import { v4 } from "uuid";

export class IdGenerator {
  public generate(): string {
    return v4();
  }
}
```

### Exercício 2
**a)** O código começa definindo o nome da tabela no banco de dados (userTableName), em seguida, configura a conexão com o banco e implementa a função de criação do usuário, que conecta no banco, inserindo na tabela userTableName as informações passadas na chamada da função.

**b)** 
```CREATE TABLE User (
	id VARCHAR(255) PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL
);
```

**c)** 
```import knex from "knex";

export class UserDatabase {
    private connection = knex({
        client: "mysql",
        connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        },
    });

    private TABLE_NAME = "User";

    public async createUser(id: string, email: string, password: string): Promise<void> {
        try{
            await this.connection.insert({id,email,password}).into(this.TABLE_NAME);
        }
        catch(error){
            throw new Error (error.sqlMessage);
        }
    }
}
```

**d)** 
```const userDB = new UserDatabase;
userDB.createUser("teste", "a@a.com", "123456");
```

### Exercício 3
**a)** "as string" garante que o dado seja recebido como "string". Utilizamos porque precisamos que a key seja uma string.

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
}

interface AuthenticationData {
     id: string;
}
```

### Exercício 4
**a)** 
```const userDB = new UserDatabase;
const idGenerator = new IdGenerator;
const authenticator = new Authenticator;

app.post("/signup", async(req: Request, res: Response)=>{
    try {
        const id = idGenerator.generate()
        await userDB.createUser(id, req.body.email, req.body.password)
        const token = authenticator.generateToken({id});
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})
```

**b)**
```app.post("/signup", async(req: Request, res: Response)=>{
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            if(!req.body.email){
                throw new Error("Missing e-mail")
            }
            throw new Error("Invalid e-mail");
        }

        const id = idGenerator.generate()
        await userDB.createUser(id, req.body.email, req.body.password)
        const token = authenticator.generateToken({id});
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})
```

**c)**
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

        const id = idGenerator.generate()
        await userDB.createUser(id, req.body.email, req.body.password)
        const token = authenticator.generateToken({id});
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})
```

### Exercício 5
**a)** 
```import knex from "knex";

export class UserDatabase {
    private connection = knex({
        client: "mysql",
        connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        },
    });

    private TABLE_NAME = "User";

    public async createUser(id: string, email: string, password: string): Promise<void> {
        try{
            await this.connection.insert({id,email,password}).into(this.TABLE_NAME);
        }
        catch(error){
            throw new Error (error.sqlMessage);
        }
    }

    public async getUserByEmail(email: string): Promise<any>{
        try {
            const user = await this.connection.select('*').from(this.TABLE_NAME).where("email", "=", email);
            return user[0];
        } catch (error) {
            throw new Error(error.sqlMessage);
        }
    }
}
```

**b)** Teste

### Exercício 6
**a) e b)** 
```app.post("/login", async(req: Request, res: Response)=>{
    try {
        if(!req.body.email || req.body.email.indexOf("@") === -1){
            if(!req.body.email){
                throw new Error("Missing e-mail")
            }
            throw new Error("Invalid e-mail");
        }
        const user = await userDB.getUserByEmail(req.body.email)
        if(user.password !== req.body.password){
            throw new Error("Wrong password!")
        }
        const token = authenticator.generateToken({id: user.id})
        res.status(200).send({token});
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
```

### Exercício 7
**a)** Não sabemos o que vai retornar da função .verify, então utilizamos any, que é um tipo genérico

**b)** Adicionado ao Authenticator: 
```
public getData(token: string): AuthenticationData{
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string) as any
            return {id: payload.id}
        } catch (error) {
            throw new Error(error.message)
        }
}
```

### Exercício 8
**a)** 
```public async getUserById(id: string): Promise<any>{
        try {
            const user = await this.connection.select('*').from(this.TABLE_NAME).where("id", "=", id)
            return user[0]
        } catch (error) {
            throw new Error(error.sqlMessage);
        }
}
```

**b)**
```app.get("/user/profile", async(req:Request, res: Response)=>{
    try {
        const authenticatorData = await authenticator.getData(req.headers.authorization as string)
        const id = authenticatorData.id;

        const user = await userDB.getUserById(id);

        res.status(200).send({id, email: user.email});
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
```