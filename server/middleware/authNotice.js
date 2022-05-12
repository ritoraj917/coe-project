const jwt = require("jsonwebtoken");
const Notice = require("../model/noticeSchema")
const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});




const authNotice = async (req, res, next) => {
    try {
        //var token = req.headers.authorization.split(' ');
        //token = token[0];
        // const token =  req.cookies.jwtoken; // req.body.token || req.query.token; // ||
        // const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const root = await Notice.find();
        console.log(root);

        if(!root) {
           return res.send("user not found");
        }

        req.root = root;

        next();

    } catch(err) {
        return res.status(401).send('Unauthorized: No Token Provided');
        console.log(err);
    }
}

module.exports = authNotice;