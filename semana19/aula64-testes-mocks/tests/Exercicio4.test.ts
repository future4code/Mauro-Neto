describe("validateCharacter tests", () => {
    test("creating true mock validator", ()=>{
        const validatorMock = jest.fn(()=> true)
    })
    test("validator false mock validator", ()=>{
        const validatorMock = jest.fn(()=> false)
    })
})