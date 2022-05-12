const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});


const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    empID: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    yearOfJoin: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    duty: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            firstName: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            recipient: {
                type: String,
                require: true
            },
            message: {
                type: String,
                require: true
            }
        }
    ],
    task: [
        {
            firstName: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            semester: {
                type: Number,
                required: true
            },
            reciever: {
                type: String,
                required: true
            },
            deadline: {
                type: Date,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
      ],
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

teacherSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch(err) {
        console.log(err);
    }
}

teacherSchema.methods.addMessage = async function (firstName, email, recipient, message) {
    try {
        this.messages = this.messages.concat({firstName, email, recipient, message});
        await this.save();
        return this.messages;
    } catch(error) {
        console.log(error);
    }
}

teacherSchema.methods.addTask = async function (firstName, email, phone, description, semester, reciever, deadline) {
    try {
        this.task = this.task.concat({firstName, email, phone, description, semester, reciever, deadline});
        await this.save();
        return this.task;
    } catch(error) {
        console.log(error);
    }
}

const User = mongoose.model('Professor', teacherSchema);

module.exports = User;