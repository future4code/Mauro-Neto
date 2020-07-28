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