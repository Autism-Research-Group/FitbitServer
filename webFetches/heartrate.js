const Client = require('../models/client')
const { getCurrentDate } = require('../utils/date')
const fetch = require('node-fetch')
const DEFAULT_PERIOD = '1w'

/**
 * Fetches heart rate data for all users in the given list. The data is appended together in an object and
 *  returned as a promise.
 * @param {array-of-string} userList the array of userID's
 * @param {string} period The range for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m. **OPTIONAL ARGUMENT**
 */
function fetchAllHeartRatesPeriod(userList, period) {
    const range = period !== undefined ? period : DEFAULT_PERIOD // The period to fetch data from

    return Promise.all( 
        userList.map( User => {
            return fetchSingularHeartRatePeriod(User, range)
        })
    )
    .then( tableData => {
        return tableData
    })
    .catch(error => {
        Promise.reject(error)
    })
}


/**
 * Fetches data for a single user
 * @param {User} user the user object that you wish to fetch data from
 * @param {string} period The range for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m. **OPTIONAL ARGUMENT**
 */
function fetchSingularHeartRatePeriod(user, period) {
    const date = getCurrentDate() // The current date
    const range = period !== undefined ? period : DEFAULT_PERIOD // The period to fetch data from
    const token = Client.access_token // The access token needed for API calls

    return fetch(`https://api.fitbit.com/1/user/${user.userID}/activities/heart/date/${date}/${range}.json`, {
        method: 'GET',
        headers: {
        'Authorization': ' Bearer ' + token
        }
    })
    .then( response => response.json())
    .then( data => {
        data.user = user // Add the user to the data
        return data
    })
    .catch(error => Promise.reject({ msg: error}))
}


function fetchAllHeartRateRange(userList, startDate, endDate) {
    //TODO: Add implementation
}

function fetchSingleHeartRateRange(user, startDate, endDate) {
    //TODO: Add implementation
}



 // TODO: Detailed Function
function detailedHeartRate(req, res) {

    if(userList.length > 0) {

        const userId = userList[0].userID
        const token = Client.access_token
        const date = getCurrentDate()

      
        fetch(`https://api.fitbit.com/1/user/${userId}/activities/heart/date/${date}/1d/1sec/time/00:00/00:01.json`, {
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + token
            }
        })
        .then( response => response.json())
        .then( data => {
            
            res.send(data)
        })
        .catch(error => console.log(error))
    } 
    else {
        res.send('Please authenticate a user first')
    }
}




module.exports = {
    fetchSingularHeartRatePeriod,
    fetchAllHeartRatesPeriod
}