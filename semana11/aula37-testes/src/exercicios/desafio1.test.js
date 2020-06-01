import {ordenaArray} from './desafio1'

describe("Ordena array", () => {
    test("Retorna [1, 2, 3] quando entrada for [3,2,1]", () => {
        const arrayOrdenado = ordenaArray([3,2,1])

        expect(arrayOrdenado).toEqual([1,2,3])
    })
    test("Retorna [1, 3, 4, 7] quando entrada for [4, 7, 1, 3]", () => {
        const arrayOrdenado = ordenaArray([4, 7, 1, 3])

        expect(arrayOrdenado).toEqual([1, 3, 4, 7])
    })
    test("Retorna [-4, -1, 0, 6, 20] quando entrada for [20, -1, -4, 0, 6]", () => {
        const arrayOrdenado = ordenaArray([20, -1, -4, 0, 6])

        expect(arrayOrdenado).toEqual([-4, -1, 0, 6, 20])
    })
})