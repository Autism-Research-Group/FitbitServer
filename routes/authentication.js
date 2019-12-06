const express = require('express')
const router = express.Router()
const Auth = require('../controllers/authentication')


router.get('/authorize', Auth.authorize)
router.get('/callback', Auth.callback)

module.exports = router