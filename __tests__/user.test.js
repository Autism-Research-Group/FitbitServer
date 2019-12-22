const User = require('../user')


describe("Testing User equals function", () => {
    test("Should return true", () => {
        const user1 = new User("Josh", "1010")
        const user2 = new User("Josh", "1010")
        expect(user1.equals(user2)).toEqual(true)
    })

    test("Should return false", () => {
        const user1 = new User("Josh", "1010")
        const user2 = new User("Sam", "1111")
        const user3 = new User("Dana", "1111")
        const user4 = new User("Sam", "2211")

        expect(user1.equals(user2)).toEqual(false)
        expect(user2.equals(user3)).toEqual(false)
        expect(user2.equals(user4)).toEqual(false)
    })
})