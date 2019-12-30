const express = require('express')
const router = express.Router()
const android = require('../controllers/androidResponse')


// Fetches hear rates for all users in the userList using a specified period
router.get('/heartrate/period/all', android.heartRateAllPeriod)

// Fetches heart rate for a single user using a specified period
router.get('/heartrate/period/single', android.heartRateSinglePeriod)

// Fetches hear rates for all users in the userList using a specified range 
router.get('/heartrate/range/single', android.heartRateSingleDate)

// Fetches hear rates for all users in the userList using a specified range 
router.get('/heartrate/range/all', android.heartRateAllDate)


module.exports = router