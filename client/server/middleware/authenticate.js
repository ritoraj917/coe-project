const jwt = require("jsonwebtoken");
const User = require("../model/teacherSchema")
const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});




const authenticate = async (req, res, next) => {
    try {
        //var token = req.headers.authorization.split(' ');
        //token = token[0];
        const token =  req.cookies.jwtoken; // req.body.token || req.query.token; // ||
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({
            "tokens.token" : token , _id: verifyToken._id,  
        });

        if(!rootUser) {
           return res.send("user not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch(err) {
        return res.status(401).send('Unauthorized: No Token Provided');
        console.log(err);
    }
}

module.exports = authenticate;