
/**
 * This is a testing function for connecting to Android
 */
function profile(req, res) {
    console.log(`Android request received`)

    testObj = { msg: "Hello World!"}

    res.send(JSON.stringify(testObj))
}





module.exports = {
    profile,
}