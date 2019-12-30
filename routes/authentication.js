const express = require('express')
const router = express.Router()
const Auth = require('../controllers/authentication')

// Authorizes a user by using the FitBit APIs 0-Auth 2.0 authentication
router.get('/authorize', Auth.authorize)

// The callback route from the /authorize route. This route handles adding the authorized user to
//   the database.
router.get('/callback', Auth.callback)

module.exports = router