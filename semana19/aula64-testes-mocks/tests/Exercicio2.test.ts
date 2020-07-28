import { Character, validateCharacter } from "../src/Exercicio1"

describe("validateCharacters function tests", () => {
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
})