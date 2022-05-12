const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const auth = require('./router/auth')
const cookieParser = require("cookie-parser");

dotenv.config({ path: './config.env'});
require('./db/conn');
//const User = require('./model/teacherSchema');
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;



// middleware

// const middleware = (req, res, next) => {
//     console.log('hello middleware');
// }

//middleware();

app.get('/', (req, res) => {
    res.send('Hello World from the server');
});

app.use("/auth", auth);
// app.get('/about', (req, res) => {
//     res.send('Hello About World from the server');
// });

// app.get('/about', (req, res) => {
//     res.send('Hello Contact World from the server');
// });

app.get('/signin', (req, res) => {
    res.send('Hello Signin Contact World from the server');
});

app.get('/signup', (req, res) => {
    res.send('Hello Signup Contact World from the server');
});

app.listen(PORT, () => {
    console.log(`server running at p_no ${PORT}`);
})

