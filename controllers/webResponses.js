const userList = require('../models/userList')
const heartRateFetch = require('../webFetches/heartrate')


/**
 * This function returns an html file containing the heart rate data rendered
 *    in html tables for all users in the userList
 * There is an optional parameter range that specifies a range of data wanted:
 *      EX: 1d, 1w, 1m
 */
async function heartRateAllPeriod(req, res) {
    if(userList.length === 0) {
        return res.status(400).send("There are not any available Users. Please add a user")
    }
    try{
        const tableData = await heartRateFetch.fetchAllHeartRatesPeriod(userList, req.query.range)
        const headers = ["User Name", "UserId", "DateTime", "Min", "Max", "Name"]
        res.render('heartrateAll', { headers, tableData })
    } catch(error) {
        res.status(400).json({ status: "error", msg:`${error.msg}` })
    }
}


/**
 * This function returns an html file containing the heart rate data rendered
 *    in html tables for a single user.
 * The required parameter is user. This is the userID that you wish to query
 * There is an optional parameter range that specifies a range of data wanted:
 *      EX: 1d, 1w, 1m
 */
async function heartRateSinglePeriod(req, res) {
    // determine if the userID parameter was passed
    if(req.query.user === undefined) {
        return res.status(400).json({ status: "error", msg: "userID never specified. Please specify a valid userID." })
    }
    const user = {userID: req.query.user} // Wrap the args in a user object so the fetch function can get the data

    try{
        const tableData = await heartRateFetch.fetchSingularHeartRatePeriod(user, req.query.range)
        const headers = ["User Name", "UserId", "DateTime", "Min", "Max"]
        res.render('heartrateSingle', { headers, tableData })
    } catch(error) {
        res.status(400).json({ status: "error", msg:`${error.msg}` })
    }
}


/**
 * This function returns an html file containing the heart rate data rendered
 *    in html tables for all users in the userList.
 * The required parameters are:
 *  1) start: yyyy-MM-dd The starting date of the data you wish to receive
 *  2) end: yyyy-MM-dd The ending date of the data you wish to receive
 */
async function heartRateAllDate(req, res) {
    const startDate = req.query.start
    const endDate = req.query.end

    // See if any parts of the body are undefined
    if(startDate === undefined || endDate === undefined) {
        return res.status(400).json({ status: "error", msg: "The start, end date, or user was not supplied." })
    }

    try {
        const tableData = await heartRateFetch.fetchAllHeartRateRange(userList, startDate, endDate)
        const headers = ["User Name", "UserId", "DateTime", "Min", "Max", "Name"]
        return res.render('heartrateAll', { headers, tableData })
    } catch(error) {
        return res.status(400).json({ status: "error", msg:`${error.msg}` })
    }
}


/**
 * This function returns an html file containing the heart rate data rendered
 *    in html tables for a single user.
 * The required parameters are:
 *  1) user: This is the userID that you wish to query
 *  2) start: yyyy-MM-dd The starting date of the data you wish to receive
 *  3) end: yyyy-MM-dd The ending date of the data you wish to receive
 */
async function heartRateSingleDate(req, res) {
    const startDate = req.query.start
    const endDate = req.query.end

    // See if any parts of the body are undefined
    if(startDate === undefined || endDate === undefined || req.query.user === undefined) {
        return res.status(400).json({ status: "error", msg: "The start, end date, or user was not supplied." })
    }

    const user = {userID: req.query.user}
    try {
        const tableData = await heartRateFetch.fetchSingleHeartRateRange(user, startDate, endDate)
        const headers = ["User Name", "UserId", "DateTime", "Min", "Max"]
        res.render('heartrateSingle', { headers, tableData })
    } catch(error) {
        res.status(400).json({ status: "error", msg:`${error.msg}` })
    }
}

module.exports = {
    heartRateAllPeriod,
    heartRateSinglePeriod,
    heartRateAllDate,
    heartRateSingleDate,
}