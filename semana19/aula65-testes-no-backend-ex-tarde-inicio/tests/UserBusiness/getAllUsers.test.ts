import {UserBusiness} from '../../src/business/UserBusiness'
import { User, stringToUserRole, UserRole } from '../../src/model/User';
import { UnauthorizedError } from '../../src/errors/UnauthorizedError';

describe("Testing UserBusiness getAllUsers", ()=>{
    let userDatabase = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    let idGenerator = {};

    test("user role admin", async() => {
        expect.assertions(3)
        try {
            const verify = jest.fn(()=> ({role: UserRole.NORMAL}))
            tokenGenerator = {verify}

            const userBusiness = new UserBusiness(
                userDatabase as any,
                hashGenerator as any,
                tokenGenerator as any,
                idGenerator as any
            );
            
            await userBusiness.getAllUsers("token")
            
        } catch (error) {
            expect(error.errorCode).toBe(401)
            expect(error.message).toBe("You must be an admin to access this endpoint")
            expect(error).toBeInstanceOf(UnauthorizedError)
        }
    })

    test("User role admin", async() => {
        const verify = jest.fn(()=> ({role: UserRole.ADMIN}))
        tokenGenerator = {verify}

        const getAllUsers = jest.fn().mockResolvedValue([
            new User("id", "Astrodev", "astrodev@labenu.com.br", "123456", stringToUserRole("ADMIN")),
            new User("id2", "Astrodev Ghost", "astrodevghost@labenu.com.br", "654321", stringToUserRole("NORMAL"))
        ])
        userDatabase = {getAllUsers}

        const userBusiness = new UserBusiness(
            userDatabase as any,
            hashGenerator as any,
            tokenGenerator as any,
            idGenerator as any
        );
            
        const users = await userBusiness.getAllUsers("token")
        
        expect(getAllUsers).toHaveBeenCalledTimes(1)
        expect(users).toContainEqual({id: "id", name: "Astrodev", email: "astrodev@labenu.com.br", role: UserRole.ADMIN})
        expect(users).toEqual([
            {id: "id", name: "Astrodev", email: "astrodev@labenu.com.br", role: UserRole.ADMIN}, 
            {id: "id2", name: "Astrodev Ghost", email: "astrodevghost@labenu.com.br", role: UserRole.NORMAL}
        ])
    })
})