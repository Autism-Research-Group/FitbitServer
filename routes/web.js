const express = require('express')
const router = express.Router()
const web = require('../controllers/webResponses')


router.get('/heartrate/period/all', web.heartRateAllPeriod)
router.get('/heartrate/period/single', web.heartRateSinglePeriod)
//router.get('/detailedHeartrate', web.detailedHeartRate)

module.exports = router