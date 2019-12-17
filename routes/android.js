const express = require('express')
const router = express.Router()
const android = require('../controllers/androidResponse')


router.get('/profile', android.profile)

module.exports = router