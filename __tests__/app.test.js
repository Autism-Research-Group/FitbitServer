/**
 * This testing file tests the endpoints created in the app.js file. These endpoints include:
 * - /          => This endpoint is just a simple welcome message.
 * 
 */

const request = require("supertest")
const app = require("../app")

/**
 * Test for the welcome message and responseCode
 */
describe("GET / ", () => {
    test("It should respond with a simple welcome message", async () => {
      const response = await request(app).get("/")
      console.log(response.body)
      expect(response.body).toEqual('Welcome to the Fitbit API!')
      expect(response.statusCode).toBe(200)
    })
})