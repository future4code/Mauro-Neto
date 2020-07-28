import * as jwt from "jsonwebtoken";

export class Authenticator {
    private static EXPIRES_IN = "1min";
    public generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
        {
            id: input.id,
            role: input.role
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

export enum UserRole{
    NORMAL = "normal",
    ADMIN = "admin"
}