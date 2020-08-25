import { AddPhotoDTO } from "../model/Photo";
import { InvalidParameterError } from "../error/InvalidParameterError";
import { Authenticator } from "../service/Authenticator";
import { PhotoDatabase } from "../data/PhotoDatabase";
import { User, UserRole } from "../model/User";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { ShowDatabase } from "../data/ShowDatabase";
import { NotFoundError } from "../error/NotFoundError";

export class PhotoBusiness{
    constructor(
        private authenticator: Authenticator,
        private photoDatabase: PhotoDatabase,
        private showDatabase: ShowDatabase
    ){}
    public async addPhoto(token: string, input: AddPhotoDTO){
        this.authenticator.getData(token)

        if(!input.show_id || !input.photo){
            throw new InvalidParameterError("Missing parameters")
        }

        if(input.show_id.trim()==="" || input.photo.trim()===""){
            throw new InvalidParameterError("You can't send parameters with blank characters")
        }

        await this.photoDatabase.addPhoto(input.show_id, input.photo)
    }

    public async getPhotosFromShow(token:string, show_id: string){
        const userData = this.authenticator.getData(token)

        if(User.stringToRole(userData.role) !== UserRole.ADMIN){
            throw new UnauthorizedError("You must be an admin to view photos of an event")
        }

        if(!show_id || show_id.trim()===""){
            throw new InvalidParameterError("Missing show id")
        }

        if(await this.showDatabase.getShowById(show_id) === false){
            throw new InvalidParameterError("Invalid show id")
        }

        const photos = await this.photoDatabase.getPhotosFromShow(show_id)

        if(photos.length===0){
            throw new NotFoundError("Event without photos")
        }

        return photos
    }
}