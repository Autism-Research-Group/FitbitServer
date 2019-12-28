/**
 * A Client object holds all the information for a user who is accessing the Fibit API
 */
function Client() {
    this.id = '22B9NL'
    this.secrete = '62de1b10a6046ce87a7ee544e8319ef3'
    this.version = '1.2'
    this.callBackURL = 'http://localhost:3000/auth/callback'
    this.access_token = null
    this.refresh_token = null
}

/**
 * Setters and Getters below
 */

Client.prototype.setAccessToken = function(access_token) {
    this.access_token = access_token
}
Client.prototype.getAccessToken = function() {
    return this.access_token
}

Client.prototype.setRefreshToken = function(refresh_token) {
    this.refresh_token = refresh_token
}

Client.prototype.getRefreshToken = function() {
    return this.refresh_token
}

Object.seal(Client) // Seal the object so no more properties can be added


/* Create a Singleton object and export it */
const client = new Client()

module.exports = client