const jwt = require("jsonwebtoken");
const Student = require("../model/studentSchema")
const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});


const authResult = async (req, res, next) => {
    try {
        //var token = req.headers.authorization.split(' ');
        //token = token[0];
        // const token =  req.cookies.jwtoken; // req.body.token || req.query.token; // ||
        // const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const roll = req.body.rollNumber;
        const root = await Student.findOne({rollNumber: roll});
        //console.log(root);

        if(!root) {
           return res.send("student not found");
        }

        req.root = root;

        next();

    } catch(err) {
        return res.status(401).send('Unauthorized');
        console.log(err);
    }
}

module.exports = authResult;