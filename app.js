const express = require('express')
const app = express()
const authenticationRoute = require('./routes/authentication')
const dataRoutes = require('./routes/android')
const webRoutes = require('./routes/web')
const databaseRoutes = require('./routes/database')


app.use(express.json()) // Express JSON parser
app.use('/auth', authenticationRoute) // routes specifically for authenticating and adding a user to the database
app.use('/android', dataRoutes) // routes specifically for incoming android requests
app.use('/web', webRoutes) // routes specifically for web based views
app.use('/database', databaseRoutes) // routes for accessing and modifying data in the database (excluding add)

app.set('view engine', 'ejs') // Set the view engine to use ejs


// Home page test route
app.get('/', (request, response) => {
    response.json('Welcome to the Fitbit API!')
})


module.exports = app