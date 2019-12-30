const express = require('express')
const router = express.Router()
const web = require('../controllers/webResponses')

// Fetches hear rates for all users in the userList using a specified period
router.get('/heartrate/period/all', web.heartRateAllPeriod)

// Fetches heart rate for a single user using a specified period
router.get('/heartrate/period/single', web.heartRateSinglePeriod)

// Fetches hear rates for all users in the userList using a specified range 
router.get('/heartrate/range/single', web.heartRateSingleDate)

// Fetches hear rates for all users in the userList using a specified range 
router.get('/heartrate/range/all', web.heartRateAllDate)


module.exports = router