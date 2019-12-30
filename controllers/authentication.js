const client = require("../models/client")
const FitBitApiClient = require("fitbit-node")
let userList = require('../models/userList')
const User = require('../models/user')
const fitbitClientCall = new FitBitApiClient({clientId: client.id, clientSecret: client.secrete, apiVersion: client.version})




/**
 * Sends the initial call to start the O Authentication 2.0 process with the applications credentials 
 */
function authorize(req, res) {
  res.redirect(fitbitClientCall.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', client.callBackURL, 'login'))
}


/**
 * receives the authentication token and then sends it back to the api for each api call made
 */
function callback(req, res) {
    const code = req.query.code // The code that was sent back

    // exchange the authorization code that was received
    fitbitClientCall.getAccessToken(code, client.callBackURL)
    .then( response => {

      // Save the access and refresh tokens so they can be used to create the user object
      const accessToken = response.access_token
      const refreshToken = response.refresh_token
   
		  // use the access token to fetch the user's profile information that will be needed for the User object
      fitbitClientCall.get("/profile.json", accessToken).then(response => {

        const userData = response[0].user // The data object for the user
        const username = userData.fullName // The first and last name
        const userId = userData.encodedId // the users ID

        // create the User object 
        const newUser = new User(username, userId, accessToken, refreshToken)

        // determine if the user is already in the userList. If it was just update the tokens...
        const index = existsInUserList(newUser)
        if(index > -1) {
          userList[index] = newUser
          return res.status(200).json({ success: true, msg: "The user is already registered" })
        }
        else {
          userList.push(newUser)
          res.status(200).json({ success: true, msg: "The user was successfully added" })
        }
      }).catch(err => {
        return res.status(err.status).send(err)
      })
    })
    .catch(err => {
		  return res.status(400).json(err)
	})
}

/**
 * Returns the index of the userID located in the userList. If the id is not present in the list
 *   then -1 is returned instead.
 */
function existsInUserList(user) {
  for(i=0; i < userList.length; i++) {
    const currentUser = userList[i]
    if(currentUser.userID === user.userID){
      return i
    }
  }
  return -1
}


module.exports = {
    authorize,
    callback,
}