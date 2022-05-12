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

 var firstname = ["Sourav", "Anindita", "Nilotpal", "Dipak", "Sampa", "Arun", "Satyajit"];
 var lastname = ["Ghosh", "Dasgupta", "Sengupta", "Acharya", "Bhattacharya", "Mondal", "Das", "Sarkar"];
 var id = 1000;
 var email = ["dgce@gmail.com","adce@gmail.com","ssce@gmail.com","mace@gmail.com","mbce@gmail.com","mmce@gmail.com"];
 var department = ["Civil Engineering", "Information Technology", "Computer Science & Engineering", "Electronics & Communication Engineering", "Electrical Engineering", "Mechanical Engineering"];
 var work = ["COE", "Head Examination", "Assistant Examination Controller"];
 var year = [2002, 1996, 2005, 2015, 2009, 1994, 2013, 2012];
                      
 async function run() {
    try { 
         for(let i=0; i<10; i++) {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("Admins");
         //await col.deleteMany();
         // Construct a document                                                                                                                                                              
         let personDocument = {
            "firstName": firstname[randomNumber(1,7)-1],
             "lastName": lastname[randomNumber(1,8)-1], // June 23, 1912                                                                                                                                 
             "empID": id+=1,  // June 7, 1954      
             "department": department[randomNumber(1,6)-1],  
             "yearOfJoin": year[randomNumber(1,8)-1],
             "currentDuty": work[randomNumber(1,3)-1],                                                                
             "email": email[randomNumber(1,6)-1]     
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