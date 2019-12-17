const userList = require('../userList')
const fetch = require('node-fetch')
const Client = require('../client')

const RANGE = '1m' // 1 month


/**
 * This function returns an html file containing the heart rate data rendered
 *    in html tables.
 */
function heartRate(req, res) {

    const range = req.query.range // get the range parameter

    if(range == undefined){
        res.send("Please add a rage parameter to the GET request")
    }

    if(userList.length > 0){
        const userId = userList[0].userID
        const date = getCurrentDate()
        const token = Client.access_token

        //const b = Buffer.from(token).toString('base64')
        //console.log(b)

        fetch(`https://api.fitbit.com/1/user/${userId}/activities/heart/date/${date}/${range}.json`, {
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + token
            }
        })
        .then( response => response.json())
        .then( data => {
            
            
            const headers = ["DateTime", "Min", "Max", "Name"]
            const tableData = data["activities-heart"]


            res.render('heartrate', { headers, tableData })
           // res.send(data["activities-heart"])
        })
        .catch(error => console.log(error))
    }
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