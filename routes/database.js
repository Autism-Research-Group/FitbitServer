const express = require('express')
const router = express.Router()
const Database = require('../controllers/database')


// Removes a userID from the userList
router.put('/remove', Database.remove)

// Returns all the User objects that are registers with this server
router.get('/allUsers', Database.allUsers)



module.exports = router