const client = require("../client")
const FitBitApiClient = require("fitbit-node")
const fitbitClientCall = new FitBitApiClient({clientId: client.id, clientSecret: client.secrete, apiVersion: client.version})
const fetch = require('node-fetch')
let userList = require('../userList')
const User = require('../user')



/**
 * Sends the initial call to start the O Authentication 2.0 process with the applications credentials 
 */
function authorize(req, res) {
    res.redirect(fitbitClientCall.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', client.callBackURL))
}


/**
 * Determines if the given userId exists and if so, adds the user the userList if it does not already exist.
 */
async function add(req, res) {

  try {
    // Get the users information
    const userStatus = await checkIfUserIDExists(req.body.id)

    const newUser = new User(userStatus.username, userStatus.userID) // Construct a new user object with the given params
    // Check if the user is already in the user list
    for(user of userList) {
      if(user.equals(newUser)){
        return res.status(400).send("The current user already exists.")
      }
    }
    
    userList.push(newUser)
    res.status(200).send("User successfully added.")

  } catch(error) {
    res.status(400).send(error.msg)
  }
}


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
 * receives the authentication token and then sends it back to the api for each api call made
 */
function callback(req, res) {
    const code = req.query.code // The code that was sent back

    // exchange the authorization code that was received
    fitbitClientCall.getAccessToken(code, client.callBackURL)
    .then( response => {

      // Set the client and refresh tokens so they can be used in the future
      client.setAccessToken(response.access_token)
      client.setRefreshToken(response.refresh_token)

      //userList.push(new User('Joshua Schappel', response.user_id))
     
		  // use the access token to fetch the user's profile information
      fitbitClientCall.get("/profile.json", response.access_token).then(response => {

        const userData = response[0].user
        const username = userData.fullName
        const userId = userData.encodedId

        // Add the user to the user list
        userList.push(new User(username, userId))
       
        //render the welcome message
        res.render('welcome', { user: username })
      }).catch(err => {
        console.log(err)
        res.status(err.status).send(err)
      })
    })
    .catch(err => {
      console.log(err)
		res.status(err.status).send(err)
	})
}


/**
 * Determines if the supplied userID is valid. If it is then a promise containing a obj with the following is returned:
 * - username: The full name of the account
 * - userID: The accounts userID
 * 
 * If the userID is not valid then the promise is rejected with the following object
 * - msg: the error message
 */
function checkIfUserIDExists(user_id) {
  const token = client.access_token

  return fetch(`https://api.fitbit.com/1/user/${user_id}/profile.json`, {
    method: "GET",
    headers: {
      'Authorization': ' Bearer ' + token
    }
  })
  .then(response => response.status === 200 ? response.json() : Promise.reject("Invalid userID."))
  .then( ({ user }) =>  {
    return { username: user.fullName, userID: user.encodedId }
  })
  .catch(error => {
    return Promise.reject({ msg: error})
  })
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
    authorize,
    callback,
    add,
    remove,
}