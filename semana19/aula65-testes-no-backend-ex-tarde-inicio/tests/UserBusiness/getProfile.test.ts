import {UserBusiness} from '../../src/business/UserBusiness'
import { User, stringToUserRole, UserRole } from '../../src/model/User';
import { InvalidParameterError } from '../../src/errors/InvalidParameterError';

describe("Testing UserBusiness getProfile", ()=>{
    let userDatabase = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    let idGenerator = {};

    test("missing token", async() => {
        expect.assertions(3)
        try {
            const verify = jest.fn(()=>{throw new InvalidParameterError("Missing token")})
            tokenGenerator = {verify}

            const userBusiness = new UserBusiness(
                userDatabase as any,
                hashGenerator as any,
                tokenGenerator as any,
                idGenerator as any
            );
            
            await userBusiness.getProfile("invalid")
            
        } catch (error) {
            expect(error.errorCode).toBe(422)
            expect(error.message).toBe("Missing token")
            expect(error).toBeInstanceOf(InvalidParameterError)
        }
    })

    test("valid token", async() => {
        const verify = jest.fn(()=> ({id: "id"}))
        tokenGenerator = {verify}

        const getUserById = jest.fn().mockResolvedValue(new User("id", "Astrodev", "astrodev@labenu.com.br", "123456", stringToUserRole("ADMIN")))
        userDatabase = {getUserById}

        const userBusiness = new UserBusiness(
            userDatabase as any,
            hashGenerator as any,
            tokenGenerator as any,
            idGenerator as any
        );
            
        const user = await userBusiness.getUserById("id")
        
        expect(getUserById).toHaveBeenCalledWith("id");
        expect(user).toEqual({id: "id", name: "Astrodev", email: "astrodev@labenu.com.br", role: UserRole.ADMIN})
    })
})