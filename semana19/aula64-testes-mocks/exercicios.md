### Exercício 1
**a)** 
```
export interface Character{
    name: string,
    life: number,
    strength: number,
    defense: number
}
```

**b)**
```
export const validateCharacter = (input: Character): boolean => {
    if(input.name.trim() !== "" && input.life >= 0 && input.strength >= 0 && input.defense >= 0){
        return true;
    }
    
    return false;
}
```

### Exercício 2
**a)**
```
test("character with blank name", () => {
    const char: Character = {
        name: "",
        life: 1000,
        strength: 200,
        defense: 350
    }

    const result = validateCharacter(char);

    expect(result).toBe(false);
})
```

**b)**
```
test("character with 0 life", () => {
    const char: Character = {
        name: "Astrodev",
        life: 0,
        strength: 200,
        defense: 350
    }

    const result = validateCharacter(char);

    expect(result).toBe(true);
})
```

**c)**
```
test("character with 0 strength", () => {
    const char: Character = {
        name: "Astrodev",
        life: 1000,
        strength: 0,
        defense: 350
    }

    const result = validateCharacter(char);

    expect(result).toBe(true);
})

```

**d)**
```
test("character with 0 defense", () => {
    const char: Character = {
        name: "Astrodev",
        life: 1000,
        strength: 200,
        defense: 0
    }

    const result = validateCharacter(char);

    expect(result).toBe(true);
})
```

**e)**
```
test("character with negative life", () => {
    const char: Character = {
        name: "Astrodev",
        life: -200,
        strength: 200,
        defense: 350
    }

    const result = validateCharacter(char);

    expect(result).toBe(false);
})

test("character with negative strength", () => {
    const char: Character = {
        name: "Astrodev",
        life: 1000,
        strength: -200,
        defense: 350
    }

    const result = validateCharacter(char);

    expect(result).toBe(false);
})

test("character with negative defense", () => {
    const char: Character = {
        name: "Astrodev",
        life: 1000,
        strength: 200,
        defense: -350
    }

    const result = validateCharacter(char);

    expect(result).toBe(false);
})
```

**f)** Testes das letras b, c e d

**g)**
```
test("character with valid values", () => {
    const char: Character = {
        name: "Astrodev",
        life: 1000,
        strength: 200,
        defense: 350
    }

    const result = validateCharacter(char);

    expect(result).toBe(true);
})
```

### Exercício 3
**a)**
```
export const performAttack = (attacker: Character, defender: Character) => {
    if(!validateCharacter(attacker) || !validateCharacter(defender)){
        throw new Error("Invalid character");
    }

    if(attacker.strength > defender.defense){
        defender.life -= attacker.strength - defender.defense;
    }
}
```

**b)**
```
export const performAttack = (attacker: Character, defender: Character, validator: (input: Character) => boolean) => {
    if(!validator(attacker) || !validator(defender)){
        throw new Error("Invalid character");
    }

    if(attacker.strength > defender.defense){
        defender.life -= attacker.strength - defender.defense;
    }
}
```

**c)** Na primeira implementação, precisamos importar a função e realizar a validação, sem necessidade de passar como parâmetros, enquanto na segunda, precisamos passar a função de validação no momento em que chamamos a função de ataque

### Exercício 4
**a)** Devemos criar um mock da função validateCharacter, para simular a resposta dela, pois ela não vai ser chamada de fato.

**b)** 
```
test("creating true mock validator", ()=>{
    const validatorMock = jest.fn(()=> true)
})    
```

**c)**
```
test("validator false mock validator", ()=>{
    const validatorMock = jest.fn(()=> false)
})
```

### Exercício 5
**a)**
```
test("defender losing 200 points of life", ()=>{
    const validatorMock = jest.fn(()=> true)

    const attacker: Character = {
         name: "Astrodev",
         life: 1000,
         strength: 200,
         defense: 350
    }

    const defender: Character = {
        name: "Astrodev ghost",
        life: 500,
        strength: 100,
        defense: 0
    }

    performAttack(attacker, defender, validatorMock)

    expect(defender.life).toEqual(300)
    expect(validatorMock).toHaveBeenCalled();
    expect(validatorMock).toHaveBeenCalledTimes(2);
    expect(validatorMock).toHaveReturnedTimes(2);
})
```

**b)**