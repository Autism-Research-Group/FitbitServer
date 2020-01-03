let userList = require('../models/userList')

  
/**
 * Removes a userID from the userList
 */
function remove(req, res) {
    const id = req.body.id

    const index = existsInUserList(id)

    if(index >= 0) {
        userList.splice(index, 1)
        return res.status(200).send("User was successfully removed.")
    }

    else {
        return res.status(200).send("User currently does not exist.")
    }
}


/**
 * Returns all the Users in the userList
 */
function allUsers(req, res) {
  return res.json({ userList: userList.map( user => user.shortHand() )})
}

  
/**
 * Returns the index of the userID located in the userList. If the id is not present in the list
 *   then -1 is returned instead.
 */
function existsInUserList(userID) {
  for(i=0; i < userList.length; i++) {
    const user = userList[i]
    if(user.userID === userID){
      return i
    }
  }
  return -1
}

module.exports = {
    remove,
    allUsers
}