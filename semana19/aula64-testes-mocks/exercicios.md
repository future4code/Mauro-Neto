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
```
test("one character invalid", ()=>{
        expect.assertions(4);

        const validatorMock = jest.fn(()=> false)

        const attacker: Character = {
            name: "Astrodev",
            life: 1000,
            strength: -100,
            defense: 350
        }

        const defender: Character = {
            name: "Astrodev ghost",
            life: 500,
            strength: 100,
            defense: 0
        }

        try {
            performAttack(attacker, defender, validatorMock)
        } catch (error) {
            expect(error.message).toEqual("Invalid character")
            expect(validatorMock).toHaveBeenCalled();
            expect(validatorMock).toHaveBeenCalledTimes(1);
            expect(validatorMock).toHaveReturnedTimes(1);
        }
    })
```

### Exercício 6
```
import { Character } from "../src/Exercicio1"
import { performAttack } from "../src/Exercicio3"

describe("performAttack tests", () => {
    test("defender with defense greater than attacker strength", () => {
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
            defense: 400
        }

        performAttack(attacker, defender, validatorMock)

        expect(defender.life).toEqual(500)
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(2);
        expect(validatorMock).toHaveReturnedTimes(2);
    })

    test("attacker with strength greater than defender life minus defense", () => {
        const validatorMock = jest.fn(()=> true)

        const attacker: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 1000,
            defense: 350
        }

        const defender: Character = {
            name: "Astrodev ghost",
            life: 500,
            strength: 100,
            defense: 400
        }

        performAttack(attacker, defender, validatorMock)

        expect(defender.life).toEqual(-100)
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(2);
        expect(validatorMock).toHaveReturnedTimes(2);
    })

    test("validator invalid in the second call", () => {
        expect.assertions(4)

        const validatorMock = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)

        const attacker: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 1000,
            defense: 350
        }

        const defender: Character = {
            name: "Astrodev ghost",
            life: 500,
            strength: 100,
            defense: 400
        }
        
        try {
            performAttack(attacker, defender, validatorMock)
        } catch (error) {
            expect(error.message).toEqual("Invalid character")
            expect(validatorMock).toHaveBeenCalled();
            expect(validatorMock).toHaveBeenCalledTimes(2);
            expect(validatorMock).toHaveReturnedTimes(2);   
        }
    })

    test("attacking 2 times", () => {
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
        performAttack(attacker, defender, validatorMock)

        expect(defender.life).toEqual(100)
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(4);
        expect(validatorMock).toHaveReturnedTimes(4);
    })
})
```

### Exercício 7
```
import {Character} from './Exercicio1'

export const recoverCharacters = (characters: Character[], validator: (input: Character) => boolean): void => {
    for(const character of characters){
        if(!validator(character)){
            throw new Error("Invalid character")
        }
    }

    if(characters.length < 2){
        throw new Error("You need to send at least 2 characters")
    }

    characters.forEach(character => {
        character.life = 1500;
    })
}

export const increaseCharacterAttack = (character: Character, newAttack: number, validator: (input: Character)=> boolean): void => {
    if(!validator(character)){
        throw new Error("Invalid character")
    }

    if(newAttack < character.strength){
        throw new Error("Invalid new attack")
    }
    
    character.strength = newAttack;
}

export const decreaseCharacterDefense = (character: Character, newDefense: number, validator: (input: Character)=> boolean): void => {
    if(!validator(character)){
        throw new Error("Invalid character")
    }

    if((newDefense > character.defense) && (newDefense >= 0)){
        throw new Error("Invalid new defense")
    }
    character.defense = newDefense;
}
```

### Exercício 8
```
import { Character } from "../src/Exercicio1"
import { recoverCharacters, increaseCharacterAttack, decreaseCharacterDefense } from "../src/Exercicio7"

describe("Recover characters tests", () => {
    test("two valid characters", () =>{
        const validatorMock = jest.fn(()=> true)

        const characters: Character[] = [
            {
                name: "Astrodev",
                life: 1000,
                strength: 200,
                defense: 350
            },
            {
                name: "Astrodev ghost",
                life: 500,
                strength: 100,
                defense: 400
            }
        ]
        
        recoverCharacters(characters, validatorMock);

        for(const character of characters){
            expect(character.life).toEqual(1500)
        }
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(2);
    })

    test("test with character invalid", () =>{
        const validatorMock = jest.fn(()=> false)

        const characters: Character[] = [
            {
                name: "Astrodev",
                life: 1000,
                strength: 200,
                defense: 350
            },
            {
                name: "Astrodev ghost",
                life: 500,
                strength: -100,
                defense: 400
            }
        ]

        try {    
            recoverCharacters(characters, validatorMock);
        } catch (error) {
            expect(error.message).toEqual("Invalid character")
            expect(characters[0].life).toEqual(1000)
            expect(characters[1].life).toEqual(500)
            expect(validatorMock).toHaveBeenCalled();
            expect(validatorMock).toHaveBeenCalledTimes(1);
        }
    })

    test("trying to recover two times", () =>{
        const validatorMock = jest.fn(()=> true)

        const characters: Character[] = [
            {
                name: "Astrodev",
                life: 1000,
                strength: 200,
                defense: 350
            },
            {
                name: "Astrodev ghost",
                life: 500,
                strength: 100,
                defense: 400
            }
        ]
        
        recoverCharacters(characters, validatorMock);
        recoverCharacters(characters, validatorMock);

        for(const character of characters){
            expect(character.life).toEqual(1500)
        }
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(4);
    })

    test("trying to heal 4 characters", () =>{
        const validatorMock = jest.fn(()=> true)

        const characters: Character[] = [
            {
                name: "Astrodev",
                life: 1000,
                strength: 200,
                defense: 350
            },
            {
                name: "Astrodev ghost",
                life: 500,
                strength: 100,
                defense: 400
            },
            {
                name: "Scorpion",
                life: 1500,
                strength: 700,
                defense: 400
            },
            {
                name: "Ryu",
                life: 800,
                strength: 500,
                defense: 400
            }
        ]
        
        recoverCharacters(characters, validatorMock);

        for(const character of characters){
            expect(character.life).toEqual(1500)
        }
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(4);
    })
})

describe("Increase attack tests", () => {
    test("valid character with valid newAttack", () =>{
        const validatorMock = jest.fn(()=> true)
    
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 200,
            defense: 350
        }
            
            
        increaseCharacterAttack(char, 300, validatorMock)
    
        expect(char.strength).toEqual(300)
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(1);
    })

    test("valid character with invalid newAttack", () =>{
        expect.assertions(4);

        const validatorMock = jest.fn(()=> true)
    
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 200,
            defense: 350
        }
            
        try {
            increaseCharacterAttack(char, 100, validatorMock)
        } catch (error) {
            expect(char.strength).toEqual(200);
            expect(error.message).toEqual("Invalid new attack");
            expect(validatorMock).toHaveBeenCalled();
            expect(validatorMock).toHaveBeenCalledTimes(1);
        }
    
    })
    test("invalid character with valid newAttack", () =>{
        expect.assertions(4);

        const validatorMock = jest.fn(()=>false)
        
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 200,
            defense: -350
        }

        try {
            increaseCharacterAttack(char, 300, validatorMock)
        } catch (error) {
            expect(char.strength).toEqual(200);
            expect(error.message).toEqual("Invalid character");
            expect(validatorMock).toHaveBeenCalled();
            expect(validatorMock).toHaveBeenCalledTimes(1);
        }
    })

    test("valid character with same newAttack", () =>{
        const validatorMock = jest.fn(()=> true)
    
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 200,
            defense: 350
        }
            
            
        increaseCharacterAttack(char, 200, validatorMock)
    
        expect(char.strength).toEqual(200)
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(1);
    })
})

describe("Decrease defense tests", () => {
    test("valid character with valid newDefense", () =>{
        const validatorMock = jest.fn(()=> true)
    
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 200,
            defense: 350
        }
            
            
        decreaseCharacterDefense(char, 300, validatorMock)
    
        expect(char.defense).toEqual(300)
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(1);
    })

    test("valid character with invalid newDefense", () =>{
        expect.assertions(4);

        const validatorMock = jest.fn(()=> true)
    
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 200,
            defense: 350
        }
            
        try {
            decreaseCharacterDefense(char, 400, validatorMock)
        } catch (error) {
            expect(char.defense).toEqual(350);
            expect(error.message).toEqual("Invalid new defense");
            expect(validatorMock).toHaveBeenCalled();
            expect(validatorMock).toHaveBeenCalledTimes(1);
        }
    
    })
    test("invalid character with valid newDefense", () =>{
        expect.assertions(4);

        const validatorMock = jest.fn(()=>false)
        
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: -200,
            defense: 350
        }

        try {
            decreaseCharacterDefense(char, 300, validatorMock)
        } catch (error) {
            expect(char.defense).toEqual(350);
            expect(error.message).toEqual("Invalid character");
            expect(validatorMock).toHaveBeenCalled();
            expect(validatorMock).toHaveBeenCalledTimes(1);
        }
    })

    test("valid character with same new defense", () =>{
        const validatorMock = jest.fn(()=> true)
    
        const char: Character = {
            name: "Astrodev",
            life: 1000,
            strength: 200,
            defense: 350
        }
            
            
        increaseCharacterAttack(char, 350, validatorMock)
    
        expect(char.defense).toEqual(350)
        expect(validatorMock).toHaveBeenCalled();
        expect(validatorMock).toHaveBeenCalledTimes(1);
    })
})
```