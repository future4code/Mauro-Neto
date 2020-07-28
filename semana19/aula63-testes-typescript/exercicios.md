### Exercício 1
**a)** 
```
interface User{
    name: string,
    balance: number
}
```

**b)**
```
function purchase(user: User, value: number): User | undefined {
    if(user.balance >= value){
        return {name: user.name, balance: user.balance-value}
    }
    return undefined;
}
```

### Exercício 2
**a)**
```
test("user balance greater than purchase value",()=>{
        const user: User = {
            name: "Alice",
            balance: 200
        }

        const result = purchase(user, 100)

        expect(result).toEqual({name: user.name, balance: 100})
    })
```

**b)**
```
test("user balance equal purchase value", () => {
        const user: User = {
            name: "Alice",
            balance: 100
        }

        const result = purchase(user, 100)

        expect(result).toEqual({name: user.name, balance: 0})
    })
```

**c)**
```
test("user balance lower than purchase value", () => {
        const user: User = {
            name: "Alice",
            balance: 50
        }

        const result = purchase(user, 100)

        expect(result).toEqual(undefined)
    })
```

### Exercício 3
**b)** 
```
function verifyAge(casino: Casino, users: CasinoUser[]): Result{
    const brazilians: ResultItem = {
        allowed: [],
        unallowed: []
    };
    const americans: ResultItem = {
        allowed: [],
        unallowed: []
    };

    for(const user of users){
        if(casino.location === LOCATION.BRAZIL){
            if(user.age>=18){
                if(user.nacionality === NACIONALITY.BRAZILIAN){
                    brazilians.allowed.push(user.name)
                }
                else{
                    americans.allowed.push(user.name)
                }
            }
            else{
                if(user.nacionality === NACIONALITY.BRAZILIAN){
                    brazilians.unallowed.push(user.name)
                }
                else{
                    americans.unallowed.push(user.name)
                }
            }
        }
        else{
            if(user.age>=21){
                if(user.nacionality === NACIONALITY.AMERICAN){
                    americans.allowed.push(user.name)
                }
                else{
                    brazilians.allowed.push(user.name)
                }
            }
            else{
                if(user.nacionality === NACIONALITY.AMERICAN){
                    americans.unallowed.push(user.name)
                }
                else{
                    brazilians.unallowed.push(user.name)
                }
            }
        }
    }

    return {brazilians, americans}

}
```

**c)** Não tive dificuldade, a parte mais chatinha são as verificações.

### Exercício 4
**a)**
```
test("brazilian user allowed in a brazilian casino", () => {
        const user: CasinoUser[] = [{
            name: "Bob",
            age: 19,
            nacionality: NACIONALITY.BRAZILIAN
        }]

        const casino: Casino = {
            name: "all in",
            location: LOCATION.BRAZIL
        }

        const result = verifyAge(casino, user);

        console.log(result);
        expect(result).toEqual({americans:{allowed: [], unallowed: []}, brazilians: {allowed: ['Bob'], unallowed: []}})
})
```

**b)**
```
test("american user allowed in a brazilian casino", () => {
        const user: CasinoUser[] = [{
            name: "Charles",
            age: 19,
            nacionality: NACIONALITY.AMERICAN
        }]

        const casino: Casino = {
            name: "all in",
            location: LOCATION.BRAZIL
        }

        const result = verifyAge(casino, user);

        console.log(result);
        expect(result).toEqual({americans:{allowed: ["Charles"], unallowed: []}, brazilians: {allowed: [], unallowed: []}})
})
```

**c)**
```
test("two brazilians and two americans, 19yo, trying to enter in an American Casino", ()=>{
        const users: CasinoUser[] = [
            {
                name: "Bob",
                age: 19,
                nacionality: NACIONALITY.BRAZILIAN
            }, 
            {
                name: "Charles",
                age: 19,
                nacionality: NACIONALITY.AMERICAN
            }, 
            {
                name: "Jack",
                age: 19,
                nacionality: NACIONALITY.AMERICAN   
            }, 
            {
                name: "Alice",
                age: 19,
                nacionality: NACIONALITY.BRAZILIAN
            }
        ]

        const casino: Casino = {
            name: "Rio LAX",
            location: LOCATION.EUA
        }

        const result = verifyAge(casino, users)

        expect(result).toEqual({americans:{allowed: [], unallowed: ['Charles', 'Jack']}, brazilians: {allowed: [], unallowed: ['Bob', 'Alice']}})
})
```

**d)**
```
test("two brazilians, 19yo and two americans, 21yo, trying to enter in an American Casino", ()=>{
        const users: CasinoUser[] = [
            {
                name: "Bob",
                age: 19,
                nacionality: NACIONALITY.BRAZILIAN
            }, 
            {
                name: "Johnson",
                age: 21,
                nacionality: NACIONALITY.AMERICAN
            }, 
            {
                name: "Chris",
                age: 21,
                nacionality: NACIONALITY.AMERICAN   
            }, 
            {
                name: "Alice",
                age: 19,
                nacionality: NACIONALITY.BRAZILIAN
            }
        ]

        const casino: Casino = {
            name: "Rio LAX",
            location: LOCATION.EUA
        }

        const result = verifyAge(casino, users)

        expect(result).toEqual({americans:{allowed: ['Johnson', 'Chris'], unallowed: []}, brazilians: {allowed: [], unallowed: ['Bob', 'Alice']}})
})
```

### Exercício 5
**a)** Adicionei as 2 seguintes linhas ao teste do exercício 4 a:
```
    expect(result.brazilians.allowed.length).toBeLessThan(2)
    expect(result.brazilians.allowed.length).toBeGreaterThan(0)
```

**b)** Adicionei a seguinte linha ao teste do exercicio 4 b:
```
expect(result.americans.unallowed.length).toEqual(0);
```

**c)** Adicionei as seguintes linhas ao teste do exercício 4 c:
```
    expect(result.americans.unallowed).toContain("Charles")
    expect(result.americans.unallowed).toContain("Jack")
    expect(result.brazilians.unallowed).toContain("Bob")
    expect(result.brazilians.unallowed).toContain("Alice")
```


**d)** Adicionei as seguintes linhas ao teste do exercício 4 d:
```
    expect(result.brazilians.unallowed.length).toBeGreaterThan(1)
    expect(result.americans.unallowed.length).toBeLessThan(1)
    expect(result.americans.allowed.length).toEqual(2)
```

### Exercício 6
**a/b)** Primeiramente precisei criar os métodos de pegar e deletar posts pelo id:
```
public async getPostById(id: string): Promise<any>{
        try {
            const result = await this.getConnection().select('id', 'creator_id', 'description').from(process.env.POSTS_DB_NAME).where({id})

            return result[0];
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async deletePostById(id: string): Promise<void>{
        try {
            await this.getConnection().delete().from(process.env.POSTS_DB_NAME).where({id})
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
```

**Testes:**
```
describe("Labook post tests", () => {
    afterAll(async()=>{
        const postDatabase = new PostDatabase;

        await postDatabase.deletePostById("test-post")
        await postDatabase.destroyConnection();
    })

    test("Create post", async()=>{    

        const postDB = new PostDatabase;

        await postDB.createPost("e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", "test-post", "this is a test post");

        const post = await postDB.getPostById("test-post");

        console.log(post);

        expect(post).toEqual({id: "test-post", creator_id: "e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", description: "this is a test post"})
    })
})
```

### Exercício 7
```
test("Create two posts with same id", async()=>{
    try {
        const postDB = new PostDatabase;
        
        await postDB.createPost("e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", "test-post2", "this is another test post");
        await postDB.createPost("e03cdad9-2f22-4ddc-af74-0cd1b48df4bb", "test-post2", "this is another test post");
    } catch (error) {
        expect(error.message).toEqual("Duplicate entry 'test-post2' for key 'PRIMARY'")
    }
})
```