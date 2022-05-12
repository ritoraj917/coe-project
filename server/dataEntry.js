const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://ritoraj:ritorajmongo@cluster0.lh7ul.mongodb.net/COE?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "COE";

 function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

 var firstname = ["Soumya", "Sneha", "Chirag", "Abhijit", "Animesh", "Sharmistha", "Aritrika", "Rounak", "Ranajit", "Nilotpal", "Soumyajit", "Koushik", "Anindita", "Oindrila", "Akash", "Charan", "Dibyojyoti", "Hriday", "Paritosh", "Tamaghna", "Tanmoy", "Shreya", "Soumita", "Swarnali"];
 var lastname = ["Ghosh", "Dasgupta", "Sengupta", "Acharya", "Bhattacharya", "Mondal", "Das", "Sarkar", "Banerjee", "Hossain", "Roy", "Saha", "Chatterjee", "Chakraborty", "Debnath", "Sheel", "Alam", "Chowdhury", "Raha", "Acharya", "Moitra", "Chaki", "Singha", "Sinha", "Kole"];
 var rollnumber = 19101101000;
 var registrationnumber = 191010160000;
 var email = ["dgce@gmail.com","adce@gmail.com","ssce@gmail.com","mace@gmail.com","mbce@gmail.com","mmce@gmail.com"];
 var department = "Civil Engineering";
 var work = ["Student"];
                      
 async function run() {
    try { 
         for(let i=0; i<30; i++) {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("Students");
         //await col.deleteMany();
         // Construct a document                                                                                                                                                              
         let personDocument = {
            "firstName": firstname[randomNumber(1,24)-1],
             "lastName": lastname[randomNumber(1,25)-1], // June 23, 1912                                                                                                                                 
             "rollNumber": rollnumber+=1,  // June 7, 1954      
             "registrationNumber": registrationnumber+=1,    
             "yearOfEnroll": 2018,       
             "department": department,   
             "curCGPA": randomNumber(6,10),                                                                                                             
             "email": email[randomNumber(1,6)-1],
             "work": work[randomNumber(0,1)-1]
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc); } 
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);































/*const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env'});
require('./db/conn');
//const User = require('./model/teacherSchema');

app.use(require('./router/auth'));

const PORT = process.env.PORT;

dotenv.config({ path: './config.env'});*/
/*const User = require('./model/teacherSchema');

// Replace the following with your Atlas connection string         
const DB = process.env.DATABASE;                                                                                                                               
const client = new MongoClient(DB);

 // The database to use
 const dbName = "COE";

 /*function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

 var firstname = ["Shailesh", "Debasish", "Arunabha", "Anindita", "Sourav", "Soumen"];
 var lastname = ["Mukherjee", "Das", "Sarkar", "Murmu", "Ghosh", "Chakraborty"];
 var id = 0000;
 var email = ["smcomp@gmail.com","ddomp@gmail.com","ascomp@gmail.com","amcomp@gmail.com","sgcomp@gmail.com","sccomp@gmail.com"];
 var department = "Computer Science & Engineering";
 var year = [2000, 2007, 2004, 2012, 2016, 2002];
 var work = ["Assistant Professor", "Associate Professor"];
 var curduty = [null, "Head Examiner", "Head Scrutinizer"];*/
 /*                     
 async function run() {
    try {
        await client.connect({
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Connected correctly to server");
        const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("Professor");
         // Construct a document                                                                                                                                                              
         let personDocument = {
            "firstName": "Soumen",
            "lastName": "Ghosh", // June 23, 1912                                                                                                                                 
            "empID": 1001,  // June 7, 1954                                                                                                                                  
            "email": "sgcomp@gmail.com",
            "department": "Computer Science & Engineering",
            "yearOfJoin": 2002,
            "work": "Assistant Professor",
            "currentDuty": "Head Examiner"
             /*"firstName": firstname[randomNumber(1,10)-1],
             "lastName": lastname[randomNumber(1,10)-1], // June 23, 1912                                                                                                                                 
             "empID": id+1,  // June 7, 1954                                                                                                                                  
             "email": email[randomNumber(1,10)],
             "department": department,
             "yearOfJoin": year[randomNumber(1,10)-1],
             "work": work[randomNumber(1,2)-1],
             "currentDuty": curduty[randomNumber(1,3)-1]*/
        /* };
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);
        } catch (err) {
         console.log(err.stack);
         process.exit(1);
     }
 
     finally {
        await client.close();
    }
} */