const express = require('express')
const router = express.Router()
const web = require('../controllers/webResponses')


router.get('/heartrate', web.heartRate)
router.get('/detailedHeartrate', web.detailedHeartRate)

module.exports = router