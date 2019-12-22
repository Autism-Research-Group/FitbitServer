const express = require('express')
const router = express.Router()
const Auth = require('../controllers/authentication')


router.get('/authorize', Auth.authorize)
router.get('/callback', Auth.callback)
router.put('/add', Auth.add)

module.exports = router