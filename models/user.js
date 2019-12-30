/**
 * A User has a username and device id associated with it
 */
function User(username, id, accessToken, refresh_token, ) {
    this.username = username
    this.userID = id
    this.access_token = accessToken
    this.refresh_token = refresh_token
}


// Determines if two user objects are equal to another
User.prototype.equals = function(user) {
    return this.username === user.username && this.userID === user.userID && this.access_token === user.access_token && this.refresh_token === user.refresh_token
}

// A shorthand version of the user object for the client side. This version
//   does not include the access_token or refresh_token
User.prototype.shortHand = function() {
    return { username: this.username, userID: this.userID }
}


Object.seal(User) // Seal the object so no more properties can be added


module.exports = User