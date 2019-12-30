const User = require('../models/user')


describe("Testing User equals function", () => {
    test("Should return true", () => {
        const user1 = new User("Josh", "1010", "1", "2")
        const user2 = new User("Josh", "1010", "1", "2")
        expect(user1.equals(user2)).toEqual(true)
    })

    test("Should return false", () => {
        const user1 = new User("Josh", "1010", "1", "2")
        const user2 = new User("Sam", "1111", "1", "2")
        const user3 = new User("Dana", "1111", "1", "2")
        const user4 = new User("Sam", "2211", "1", "4")

        expect(user1.equals(user2)).toEqual(false)
        expect(user2.equals(user3)).toEqual(false)
        expect(user2.equals(user4)).toEqual(false)
    })
})


describe("Testing User shortHand function", () => {
    
    test("Should return the shorthand notation", () => {
        const user1 = new User("Josh", "1010", "1", "2")
        const user2 = new User("Dana", "2354", "1", "2")
        expect(user1.shortHand()).toEqual({ username: "Josh", userID: "1010" })
        expect(user2.shortHand()).toEqual({ username: "Dana", userID: "2354" })
    })
})