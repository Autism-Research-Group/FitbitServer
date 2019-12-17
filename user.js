/**
 * A User has a username and device id associated with it
 */
function User(username, id) {
    this.username = username
    this.userID = id
}

Object.freeze(User) // Freeze the object so that it cannot be modified



module.exports = User