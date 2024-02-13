const mongoose = require('mongoose')

const connectionString=process.env.CONNECTION_STRING
 //to access files from .env file
//process is global..therefore no need to import

mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb atlas connected successfully with pfserver");
}).catch((reason)=>{
    console.log(reason);
    console.log("Mongodb connection failed");
})





