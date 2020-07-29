import { Character } from "../src/Exercicio1"
import { performAttack } from "../src/Exercicio3"

describe("performAttack tests", () => {
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
})