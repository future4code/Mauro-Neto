export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: UserRole
    ){}

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name
    }

    public getEmail(){
        return this.email
    }

    public getPassword(){
        return this.password
    }

    public getRole(){
        return this.role
    }

    public static stringToRole(input: string): UserRole{
        switch(input.toUpperCase()){
            case "NORMAL":
                return UserRole.NORMAL
            case "ADMIN":
                return UserRole.ADMIN
            default:
                throw new Error("Invalid user role")
        }
    }

    public static dataToUserModel(user: any): User{
        return new User(user.id, user.name, user.email, user.password, User.stringToRole(user.role))
    }
}

export interface UserSignupDTO{
    name: string,
    email: string,
    password: string,
    role: string
}

export interface UserLoginDTO{
    email: string,
    password: string,
}

export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}