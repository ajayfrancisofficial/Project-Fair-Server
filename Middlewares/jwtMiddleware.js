const jwt = require('jsonwebtoken')

//authorization
const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");
    try {
        const token = req.headers['authorization'].split(" ")[1]
        //Authorization should be in small letters
        //accessing a value from an object using index as shown is the perfect way ... 
        //headers.authorization is an alternative way to access that key's value from that object
        console.log(token);
        if (token) {
            const jwtResponse = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(jwtResponse);
            req.payload = jwtResponse.userId  //inserting a new key value to req object           
            next()
        } else {
            res.status(406).json("Please provide Token")
        }
    }
    catch {
        res.status(401).json("Access Denied... Please Login!!!")
    }

}
module.exports = jwtMiddleware