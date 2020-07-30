export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string
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
}

export interface UserSignupDTO{
    name: string,
    email: string,
    password: string,
    role: string
}

export enum UserRole{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}