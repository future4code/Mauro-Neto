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