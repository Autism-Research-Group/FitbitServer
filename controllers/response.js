const { testObj } = require('./authentication')


function profile(req, res) {
    console.log(`Android request received`)

    res.send(JSON.stringify(testObj))
}


module.exports = {
    profile
}