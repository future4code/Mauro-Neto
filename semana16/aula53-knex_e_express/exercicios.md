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