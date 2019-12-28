
// Gets the current data and puts in in the following formate:
//  yyyy-mm-dd
function getCurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear() // yyyy
    const month = currentDate.getMonth() + 1 // mm
    const date = currentDate.getDate() // dd
    
    return `${year}-${month}-${date}`
}

module.exports = { getCurrentDate }