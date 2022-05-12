const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 
const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});


const fileSchema = new mongoose.Schema({
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
    }
});

const File = mongoose.model('Files', fileSchema);

module.exports = File;