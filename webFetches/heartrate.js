const { getCurrentDate } = require('../utils/date')
const fetch = require('node-fetch')
const DEFAULT_PERIOD = '1w'

/**
 * Fetches heart rate data for all users in the given list. The data is appended together in an object and
 *  returned as a promise.
 * @param {array-of-Users} userList the array of userID's
 * @param {string} period The range for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m. **OPTIONAL ARGUMENT**
 */
function fetchAllHeartRatesPeriod(userList, period) {
    const range = period !== undefined ? period : DEFAULT_PERIOD // The period to fetch data from

    return Promise.all( 
        userList.map( User => {
            return fetchSingularHeartRatePeriod(User, range)
        })
    )
    .catch(error => {
        Promise.reject({ msg: error })
    })
}


/**
 * Fetches data for a single user using a period
 * @param {User} user the user object that you wish to fetch data from
 * @param {string} period The range for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m. **OPTIONAL ARGUMENT**
 */
function fetchSingularHeartRatePeriod(user, period) {
    const date = getCurrentDate() // The current date
    const range = period !== undefined ? period : DEFAULT_PERIOD // The period to fetch data from
    const token = user.access_token // The access token needed for API calls
    
    return fetch(`https://api.fitbit.com/1/user/${user.userID}/activities/heart/date/${date}/${range}.json`, {
        method: 'GET',
        headers: {
        'Authorization': ' Bearer ' + token
        }
    })
    .then( response => response.status === 200 ? response.json() : Promise.reject(response.statusText) )
    .then( data => {
        data.user = user.shortHand() // Add the user to the data
        return data
    })
    .catch(error => Promise.reject({ msg: error}))
}


/**
 * Fetches the data for all users in the userList
 * @param {array-of-Users} userList An array of User objects that you wish to get data from
 * @param {string} startDate The starting date of the data period (yyyy-MM-dd)
 * @param {endDate} endDate The ending date of the data period (yyyy-MM-dd)
 */
function fetchAllHeartRateRange(userList, startDate, endDate) {
    return Promise.all(
        userList.map( user => {
            return fetchSingleHeartRateRange(user, startDate, endDate)
        })
    )
    .catch( error => Promise.reject({ msg: error }) )
}

/**
 * Fetches data for a single user using a Range
 * @param {User} user A User object containing the users ID
 * @param {string} startDate The starting date of the data period (yyyy-MM-dd)
 * @param {string} endDate The ending date of the data period (yyyy-MM-dd)
 */
function fetchSingleHeartRateRange(user, startDate, endDate) {
    const token = user.access_token // Access token needed for API calls
    
    return fetch(`https://api.fitbit.com/1/user/${user.userID}/activities/heart/date/${startDate}/${endDate}.json`, {
        method: 'GET',
        headers: {
            'Authorization': ' Bearer ' + token
        }
    })
    .then( response => response.status === 200 ? response.json() : Promise.reject(response.statusText) )
    .then( data => {
        data.user = user.shortHand()
        return data
    })
    .catch( error => Promise.reject({ msg: error }))
}



 // TODO: Detailed Function
function detailedHeartRate(req, res) {

}




module.exports = {
    fetchSingularHeartRatePeriod,
    fetchAllHeartRatesPeriod,
    fetchSingleHeartRateRange,
    fetchAllHeartRateRange,
}