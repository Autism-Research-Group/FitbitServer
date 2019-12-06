const client = require("../client")
const FitBitApiClient = require("fitbit-node")
const fitbitClientCall = new FitBitApiClient({clientId: client.id, clientSecret: client.secrete, apiVersion: client.version})



const testObj = {}

/**
 * Sends the initial call to start the O Authentication 2.0 process with the applications credentials 
 */
function authorize(req, res) {
    res.redirect(fitbitClientCall.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', client.callBackURL))
}



/**
 * receives the authentication token and then sends it back to the api for each api call made
 */
function callback(req, res) {
    const code = req.query.code // The code that was sent back

    // exchange the authorization code that was received
    fitbitClientCall.getAccessToken(code, client.callBackURL)
    .then( response => {
      
		  // use the access token to fetch the user's profile information
      fitbitClientCall.get("/profile.json", response.access_token).then(response => {
        testObj.profileData = response[0]
        res.send(response[0])
      }).catch(err => {
        res.status(err.status).send(err)
      })
    })
    .catch(err => {
		res.status(err.status).send(err)
	})
}


module.exports = {
    authorize,
    callback,
    testObj,
}


