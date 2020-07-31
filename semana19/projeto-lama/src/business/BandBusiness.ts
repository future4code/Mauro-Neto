import { RegisterBandDTO } from "../model/Band";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { IdGenerator } from "../service/IdGenerator";
import { BandDatabase } from "../data/BandDatabase";
import { Authenticator } from "../service/Authenticator";
import { UserRole, User } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { NotFoundError } from "../error/NotFoundError";

export class BandBusiness{
    constructor(
        private bandDatabase: BandDatabase,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    public async registerBand(token: string, input: RegisterBandDTO){
        const userData = this.authenticator.getData(token)

        if(User.stringToRole(userData.role) !== UserRole.ADMIN){
            throw new UnauthorizedError("You must be an admin to register a band")
        }
        
        if(!input.name || !input.music_genre || !input.responsible){
            throw new InvalidParameterError("Missing input")
        }

        if(input.name.trim()==="" || input.music_genre.trim()==="" || input.responsible.trim()===""){
            throw new InvalidParameterError("You can't send parameters with blank characters")
        }

        const id = this.idGenerator.generate()

        await this.bandDatabase.registerBand(id, input.name, input.music_genre, input.responsible)
    }

    public async viewBandDetails(token: string, term: string){
        this.authenticator.getData(token)

        const band = await this.bandDatabase.viewBandDetails(term);

        if(!band){
            throw new NotFoundError("Band not found")
        }

        return band;
    }
}