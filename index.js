const express = require('express')
const app = express()
const authenticationRoute = require('./routes/authentication')
const dataRoutes = require('./routes/android')
const webRoutes = require('./routes/web')
const port = 3000


app.use(express.json()) // Express JSON parser
app.use('/auth', authenticationRoute) // routes specifically for OAuthentication
app.use('/android', dataRoutes) // routes specifically for incoming android requests
app.use('/web', webRoutes) // routes specifically for web based views


app.set('view engine', 'ejs') // Set the view engine to use ejs


// Home page test route
app.get('/', (request, response) => {
    response.send('Welcome to the Fitbit Website!')
})


app.listen(port, ()=> console.log(`Listening on port ${port} at url ${"http://localhost:3000/"}`))