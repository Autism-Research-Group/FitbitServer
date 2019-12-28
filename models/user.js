/**
 * A User has a username and device id associated with it
 */
function User(username, id) {
    this.username = username
    this.userID = id
}

// Determines if two user objects are equal to another
User.prototype.equals = function(user) {
    return this.username === user.username && this.userID === user.userID
}

Object.freeze(User) // Freeze the object so that it cannot be modified



module.exports = User