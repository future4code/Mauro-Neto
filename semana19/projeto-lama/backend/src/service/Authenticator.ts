import jwt from 'jsonwebtoken'

export class Authenticator{
    public generateToken(input: AuthenticationData): string{
        const token = jwt.sign(input, process.env.JWT_KEY, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN})

        return token;
    }

    public getData(token: string): AuthenticationData{
        const payload = jwt.verify(token, process.env.JWT_KEY) as any;

        return {id: payload.id, role: payload.role};
    }
}

interface AuthenticationData{
    id: string,
    role: string
}