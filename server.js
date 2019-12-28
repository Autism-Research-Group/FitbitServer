const app = require('./app')
const port = 3000


app.listen(port, ()=> console.log(`Listening on port ${port} at url ${"http://localhost:3000/"}`))