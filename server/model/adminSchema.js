const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    department: {
        type: String,
        required: true
    },
    yearOfJoin: {
        type: Number,
        required: true
    },
    currentDuty: {
        type: String,
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
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;