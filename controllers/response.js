const { testObj } = require('./authentication')
const userList = require('../userList')
const fetch = require('node-fetch')
const Client = require('../client')

const RANGE = '1m' // 1 month

function profile(req, res) {
    console.log(`Android request received`)

    res.send(JSON.stringify(testObj))
}


function heartRate(req, res) {
    if(userList.length > 0){
        const userId = userList[0].userID
        const date = getCurrentDate()
        const token = Client.access_token

        //const b = Buffer.from(token).toString('base64')
        //console.log(b)

        fetch(`https://api.fitbit.com/1/user/${userId}/activities/heart/date/${date}/${RANGE}.json`, {
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + token
            }
        })
        .then( response => response.json())
        .then( data => {
            console.log(data)
            res.send(data)
        })
        .catch(error => console.log(error))
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
    profile,
    heartRate,
}