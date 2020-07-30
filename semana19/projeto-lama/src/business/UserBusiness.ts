import { UserSignupDTO } from "../model/User";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { HashManager } from "../service/HashManager";
import { Authenticator } from "../service/Authenticator";

export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ){}

    public async signup(input: UserSignupDTO): Promise<string>{
        if(!input.name || !input.email || !input.password){
            throw new InvalidParameterError("Missing input")
        }

        if(input.name.trim()==="" || input.email.trim()==="" || input.password.trim()===""){
            throw new InvalidParameterError("You can't send parameters with blank characters")
        }

        if(input.email.indexOf("@") === -1){
            throw new InvalidParameterError("Invalid e-mail")
        }

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(input.password)

        await this.userDatabase.signup(id, input.name, input.email, hashedPassword, input.role)

        const token = this.authenticator.generateToken({ id, role: input.role })

        return token;
    }
}