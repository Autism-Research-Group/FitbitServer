/**
 * This file is used to test the clients properties and functions. These include:
 * - setAccessToken
 * - getAccessToken
 * - setRefreshToken
 * - getRefreshToken
 */

const Client = require('../models/client')


describe("Functions for Access Token", () => {
    test("Setting and Getting the access token", () =>{
        Client.setAccessToken("123")
        expect(Client.getAccessToken()).toBe("123")

        Client.setAccessToken("456")
        expect(Client.getAccessToken()).toBe("456")
    })
})

describe("Functions for Refresh Token", () => {
    test("Setting and Getting the refresh token", () =>{
        Client.setRefreshToken("123")
        expect(Client.getRefreshToken()).toBe("123")

        Client.setRefreshToken("456")
        expect(Client.getRefreshToken()).toBe("456")
    })
})