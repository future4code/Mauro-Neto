### Exercício 1
**a)** Ele retorna um "array de array", sendo o primeiro índice a resposta e o segundo índice metadados da tabela

**b)** 
```const searchActor = async (name: string): Promise<any> => {
    try{
        const result = await connection.raw(`
            SELECT * FROM Actor WHERE name LIKE "${name}"
        `)
        console.log(result[0][0])
        return result[0][0]
    }
    catch(error){
        console.log(error);
    }
}
```

**c)** 
```const countByGender = async(gender: string): Promise<any> =>{
    try{
        const result = await connection.raw(`
            SELECT COUNT(*) FROM Actor WHERE gender="${gender}"
        `)
        console.log(result[0][0]);

        return result[0][0];
    }
    catch(error){
        console.log(error);
    }
}
```

### Exercício 2
**a)**
```const updateSalaryById = async(id:string, salary: number): Promise<void> => {
    try {
        await connection("Actor").update({salary}).where("id", id);
        console.log("Atualizou")
    } catch (error) {
        console.log(error);
    }
}
```

**b)**
```const deleteActorById = async(id: string): Promise<void> => {
    try {
        await connection("Actor").delete().where("id", id);
        console.log("Ator deletado")
    } catch (error) {
        console.log(error);
    }
}
```

**c)**
```const getSalaryAverageByGender = async(gender: string): Promise<any> => {
    try {
        const response = await connection("Actor").avg("salary").where("gender", gender);

        console.log(response[0])

    } catch (error) {
        console.log(error);
    }
}
```

### Exercício 3
**a)** Por conta dos pathParams, que está como ":id"

**b)** Enviam a resposta com status 200, caso a requisição seja positiva e status 400 caso a requisição seja negativa.

**c)** 
```app.get("/actor", async(req: Request, res: Response)=>{
    try{
        const count = await countByGender(req.query.gender as string)
        res.status(200).send(count);
    }
    catch(error){
        res.status(400).send({message: error.message});
    }
})
```

### Exercício 4
**a)**
```app.post("/actor", async(req: Request, res: Response)=>{
    try {
        await updateSalaryById(req.body.id, req.body.salary);
        res.status(200).send({message: "Success"})
    } catch (error) {
        res.status(400).send({message: error.message});
    }
})
```

**b)**
```app.delete("/actor/:id", async(req: Request, res: Response)=>{
    try {
        await deleteActorById(req.params.id);
        res.status(200).send({message: `Actor with id ${req.params.id} deleted`})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
```

### Exercício 5
Função de criar filme
```const createMovie = async(id: string, name: string, synopsis: string, release_Date: Date, rating: number, playing_limit_date: Date): Promise<void> =>{
    try{
        await connection.insert({id, name, synopsis, release_Date, rating, playing_limit_date}).into("Movie");
        console.log("Filme criado");
    }
    catch(error){
        console.log(error)
    }
}
```

Criando endpoint
```app.post("/movie", async(req: Request, res: Response)=>{
    try {
        await createMovie(req.body.id, req.body.name, req.body.synopsis, new Date(req.body.release_Date), req.body.rating, new Date(req.body.playing_limit_date))
        res.status(201).send({message: "Movie created"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})
```