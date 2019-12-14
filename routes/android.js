const express = require('express')
const router = express.Router()
const android = require('../controllers/response')


router.get('/profile', android.profile)
router.get('/heartRate', android.heartRate)

module.exports = router