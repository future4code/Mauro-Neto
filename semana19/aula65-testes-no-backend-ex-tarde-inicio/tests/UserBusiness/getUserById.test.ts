import {UserBusiness} from '../../src/business/UserBusiness'
import { NotFoundError } from '../../src/errors/NotFoundError';
import { User, stringToUserRole, UserRole } from '../../src/model/User';

describe("Testing UserBusiness getUserById", ()=>{
    let userDatabase = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    let idGenerator = {};

    test("inexistent user", async() => {
        expect.assertions(3)
        try {
            const getUserById = jest.fn(()=>false)
            userDatabase = {getUserById}

            const userBusiness = new UserBusiness(
                userDatabase as any,
                hashGenerator as any,
                tokenGenerator as any,
                idGenerator as any
            );
            
            await userBusiness.getUserById("invalid")


            
        } catch (error) {
            expect(error.errorCode).toBe(404)
            expect(error.message).toBe("User not found")
            expect(error).toBeInstanceOf(NotFoundError)
        }
    })

    test("existent user", async() => {
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