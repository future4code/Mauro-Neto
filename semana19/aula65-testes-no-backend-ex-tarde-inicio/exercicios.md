### Exercício 1
**a)**
```
public async getUserById(id: string){
    if(!id){
      throw new InvalidParameterError("Missing id")
    }

    const user = await this.userDatabase.getUserById(id);

    if(!user){
      throw new NotFoundError("User not found")
    }

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole()
    }
  }
```

### Exercício 2
**a)**
```
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
})
```

**b)**
```
describe("Testing UserBusiness getUserById", ()=>{
    let userDatabase = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    let idGenerator = {};

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
```

### Exercício 3
**a)** Nessa função, no lugar de receber diretamente o role, recebo o token, e faço a verificação do role pelas informações do token
```
  public async getAllUsers(token: string){
    if(!token){
      throw new InvalidParameterError("Missing token")
    }
    
    const userData = this.tokenGenerator.verify(token)
    
    if(userData.role !== UserRole.ADMIN){
      throw new UnauthorizedError("You must be an admin to access this endpoint")
    }

    const users = await this.userDatabase.getAllUsers();

    return users.map((user: User)=> ({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole()
    }))
  }
```

### Exercício 4
**a)** Como recebo o token, precisei mockar a resposta do payload dele, recebendo o role como normal, para ser inválido
```
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
})
```

**b)** Recebo o token, mocko o role como admin, para ser válido e mocko 2 usuários do database
```
describe("Testing UserBusiness getAllUsers", ()=>{
    let userDatabase = {};
    let hashGenerator = {};
    let tokenGenerator = {};
    let idGenerator = {};

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
```

### Exercício 5
**a)** Nessa função, no lugar de receber diretamente o id, recebo o token, e faço a verificação do id pelas informações do token. Fiz também a verificação de não ter usuário, para o caso de passar um token gerado através de um login e o usuário for deletado, por exemplo
```
public async getProfile(token: string){
    if(!token){
      throw new InvalidParameterError("Missing token")
    }

    const userData = this.tokenGenerator.verify(token)

    const user = await this.userDatabase.getUserById(userData.id)

    if(!user){
      throw new NotFoundError("User not found")
    }

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole()
    }
}
```

### Exercício 6
Faço mock da função de verificação do token, e no primeiro teste, retorno como se não tivesse passado um token. No segundo teste, mocko um id recebido do token e mocko um usuário com esse id, na função que acessa o database
```
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
```