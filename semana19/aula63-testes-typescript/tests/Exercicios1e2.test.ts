import {User, purchase} from '../src/Exercicios1e2'

describe("purchase tests", ()=>{
    test("user balance greater than purchase value",()=>{
        const user: User = {
            name: "Alice",
            balance: 200
        }

        const result = purchase(user, 100)

        expect(result).toEqual({name: user.name, balance: 100})
    })

    test("user balance equal purchase value", () => {
        const user: User = {
            name: "Alice",
            balance: 100
        }

        const result = purchase(user, 100)

        expect(result).toEqual({name: user.name, balance: 0})
    })

    test("user balance lower than purchase value", () => {
        const user: User = {
            name: "Alice",
            balance: 50
        }

        const result = purchase(user, 100)

        expect(result).toEqual(undefined)
    })
})