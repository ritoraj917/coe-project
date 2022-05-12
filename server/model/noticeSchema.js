const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});


const noticeSchema = new mongoose.Schema({
    noticeID: {
        type: Number,
        required: true
    },
    noticeBody: {
        type: String,
        required: true
    },
    noticeDate: {
        type: Date,
        required: true
    },
    noticeByName: {
                type: String,
                require: true
            },
    noticeByEmail: {
                type: String,
                require: true
            },
    noticeByEmpID: {
                type: String,
                require: true
            }
    //  _id: {
    //      type: String,
    //      required: true
    //  } 
     /*,
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true 
    }*/
});

// teacherSchema.methods.generateAuthToken = async function() {
//     try {
//         let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token: token});
//         await this.save();
//         return token;
//     } catch(err) {
//         console.log(err);
//     }
// }

// teacherSchema.methods.addMessage = async function (firstName, email, recipient, message) {
//     try {
//         this.messages = this.messages.concat({firstName, email, recipient, message});
//         await this.save();
//         return this.messages;
//     } catch(error) {
//         console.log(error);
//     }
// }

// teacherSchema.methods.addTask = async function (firstName, email, phone, description, semester, reciever, deadline) {
//     try {
//         this.task = this.task.concat({firstName, email, phone, description, semester, reciever, deadline});
//         await this.save();
//         return this.task;
//     } catch(error) {
//         console.log(error);
//     }
// }

const Notice = mongoose.model('Notices', noticeSchema);

module.exports = Notice;