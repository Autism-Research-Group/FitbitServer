/**
 * A Client object holds all the information for a user who is accessing the Fibit API
 */
function Client() {
    this.id = '22B9NL'
    this.secrete = '62de1b10a6046ce87a7ee544e8319ef3'
    this.version = '1.2'
    this.callBackURL = 'http://localhost:3000/auth/callback'
}

Object.seal(Client) // Seal the object so no more properties can be added


/* Create a Singleton object and export it */
const client = new Client()

module.exports = client