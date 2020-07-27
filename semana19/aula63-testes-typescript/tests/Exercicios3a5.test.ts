import {verifyAge, CasinoUser, NACIONALITY, Casino, LOCATION} from '../src/Exercicios3a5'

describe("age verification for casino", () => {
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

        expect(result).toEqual({americans:{allowed: [], unallowed: []}, brazilians: {allowed: ['Bob'], unallowed: []}})
        expect(result.brazilians.allowed.length).toBeLessThan(2)
        expect(result.brazilians.allowed.length).toBeGreaterThan(0)
    })

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

        expect(result).toEqual({americans:{allowed: ["Charles"], unallowed: []}, brazilians: {allowed: [], unallowed: []}})
        expect(result.americans.unallowed.length).toEqual(0);
    })

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
        expect(result.americans.unallowed).toContain("Charles")
        expect(result.americans.unallowed).toContain("Jack")
        expect(result.brazilians.unallowed).toContain("Bob")
        expect(result.brazilians.unallowed).toContain("Alice")
    })

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
        expect(result.brazilians.unallowed.length).toBeGreaterThan(1)
        expect(result.americans.unallowed.length).toBeLessThan(1)
        expect(result.americans.allowed.length).toEqual(2)
    })
})