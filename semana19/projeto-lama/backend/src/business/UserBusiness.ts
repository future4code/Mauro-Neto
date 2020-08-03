import { UserSignupDTO, UserLoginDTO, User } from "../model/User";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { HashManager } from "../service/HashManager";
import { Authenticator } from "../service/Authenticator";
import { NotFoundError } from "../error/NotFoundError";

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

        if(input.role){
            User.stringToRole(input.role)
        }

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(input.password)

        await this.userDatabase.signup(id, input.name, input.email, hashedPassword, input.role)

        const token = this.authenticator.generateToken({ id, role: input.role })

        return token;
    }

    public async login(input: UserLoginDTO): Promise<string>{
        if(!input.email || !input.password){
            throw new InvalidParameterError("Missing input")
        }

        const user = await this.userDatabase.getUserByEmail(input.email)

        if(!user){
            throw new NotFoundError("User not found")
        }

        const isValidPassword = await this.hashManager.compare(input.password, user.getPassword())

        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        const token = this.authenticator.generateToken({ id: user.getId(), role: user.getRole()})

        return token
    }
}