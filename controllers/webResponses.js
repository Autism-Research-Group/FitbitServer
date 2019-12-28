const userList = require('../models/userList')
const fetch = require('node-fetch')
const Client = require('../models/client')

const DEFAULT_RANGE = '1w' // The default value for range


/**
 * This function returns an html file containing the heart rate data rendered
 *    in html tables.
 */
function heartRate(req, res) {

    // Make sure that there are users to fetch. If there are not any available users then
    //  alert the client
    if(userList.length === 0) {
        return res.status(400).send("There are not any available Users. Please add a user")
    }

    let range // get the range parameter

    // If the range is undefined set the range to the default range
    if(req.query.range == undefined){
        range = DEFAULT_RANGE
    } 
    else {
        range = req.query.range
    }

    const date = getCurrentDate()
    const token = Client.access_token

    //const b = Buffer.from(token).toString('base64')
    //console.log(b)
    Promise.all(
        userList.map( User => {
            return fetch(`https://api.fitbit.com/1/user/${User.userID}/activities/heart/date/${date}/${range}.json`, {
                method: 'GET',
                headers: {
                    'Authorization': ' Bearer ' + token
                }
            })
            .then( response => response.json())
            .then( data => {
                data.user = User // Add the user to the data
                return data
            })
        })
    )
    .then( tableData => {
        // Headers for the html table
        const headers = ["User Name", "UserId", "DateTime", "Min", "Max", "Name"]

        res.render('heartrate', { headers, tableData })

    })
    .catch(error => {
        res.send(400)
        res.send(`An error occurred: ${error}`)
    })
}


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




// Gets the current data and puts in in the following formate:
//  yyyy-mm-dd
function getCurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear() // yyyy
    const month = currentDate.getMonth() + 1 // mm
    const date = currentDate.getDate() // dd
    
    return `${year}-${month}-${date}`
}


module.exports = {
    heartRate,
    detailedHeartRate
}