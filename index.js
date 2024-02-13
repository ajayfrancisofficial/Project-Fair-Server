//loads .env file contents into process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/Router')
 require('./DB/connection')

// create an express server
const pfServer = express()

//use cors in server
pfServer.use(cors())  //cors should be used first after servercreation
//use json parser
pfServer.use(express.json()) //application-level middleware
//use router 
pfServer.use(router)
//to make file/folder available to other app
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT
pfServer.listen(PORT, () => {
    console.log(`Project fair server started at port:${Port}`);
})

// to resolve get http request to http://localhost:3000/
pfServer.get('/', (req, res) => {
    res.send("<h1 style=color:red;>Project fair server started and waiting for client request</h1>")
})

