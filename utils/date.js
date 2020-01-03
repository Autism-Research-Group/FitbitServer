
// Gets the current data and puts in in the following formate:
//  yyyy-mm-dd
function getCurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear() // yyyy
    const month = formatNumber(currentDate.getMonth() + 1) // mm
    const date = formatNumber(currentDate.getDate()) // dd
    
    return `${year}-${month}-${date}`
}

// formatNumber: Makes sure the number is in proper format. EX:
//      10 -> 10
//      0 -> 01
//      9 -> 09
function formatNumber(num) {
    // If number is less then 10 then add a0 in front of it
    if(num < 10){
        return `0${num}`
    } 
    else {
        return num
    }
}

module.exports = { getCurrentDate }