const express = require('express');
const User = require('../model/teacherSchema');
const Notice = require('../model/noticeSchema');
const Student = require('../model/studentSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const authNotice = require('../middleware/authNotice');
const authResult = require('../middleware/authResult');
const PDFDocument = require('pdfkit');
const PDFdoc = require('pdfkit-table');
const fs = require('fs');
require('../db/conn');

const multer = require('multer');
const cors = require('cors');

const sgmail = require('@sendgrid/mail');

const dotenv = require("dotenv");
dotenv.config({ path: './config.env'});

const jwt = require('jsonwebtoken'); 
const { compare } = require('bcryptjs');

const API_KEY = process.env.SENDGRID_API_KEY;

const cookieParser =require("cookie-parser");
const path = require('path');
router.use(cookieParser())

// router.get('/', (req, res) => {
//     res.send('Hello World from the server router JS');
// });

sgmail.setApiKey(API_KEY);

const file_no = 1;

//router.use(express.static(__dirname+"./public"));

const storageNew = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now()+'_'+file.originalname);
    }
});

const uploadStudent = multer({
    storage:storageNew
}).single('file');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname) // + file.originalname
    }
});

const upload = multer({storage}).single('file');

router.post('/upload', (req,res) => {
    upload(req, res, (err) => {
        if(err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(req.file); 
    })
});

router.post('/sendFile', authenticate, (req, res) => {
    try {
        pathToAttachment = `${Date.now()}-File_No_${file_no}.pdf`;
        //pathToAttachment = `${doc}`;
        attachment = fs.readFileSync(pathToAttachment).toString("base64");
        
        const rslt = {
            to: [`${resultFind.email}`],
            from: 'rb2240@it.jgec.ac.in',
            subject: `Result of Semester ${req.body.semester}`,
            html: `<h4>Student Name: ${resultFind.firstName} ${resultFind.lastName}</h4>
            <p></p><h4>Roll No: ${resultFind.rollNumber}</h4><p></p>
            <h4>Registration No: ${resultFind.registrationNumber} of ${resultFind.yearOfEnroll}</h4><p></p>
            <h4>Hereby attached is the Result of Semester ${req.body.semester}</h4>
            <p></p><h4>Do not reply to this email or forward this to anyone. In case of any query or doubt related to result please contact your CR and so the respective authority on that 
            matter.</h4>`,
            AddAttachment: `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`,
            attachments: [
                {
                  content: attachment,
                  filename: `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`,
                  type: "application/pdf",
                  disposition: "attachment"
                }
              ]
        };
    
        sgmail.send(rslt)
        .then(response => console.log(rslt))
        .catch(error => console.log(error.message));
        
        return res.status(200).send({message: "success"});
       } catch(error) 
       { console.log(error); }
})


router.post('/register', async(req, res) => {
     const {firstName, lastName, empID, email, password, cpassword, department, yearOfJoin, designation, duty } = req.body;
    //  if(!firstName || !lastName || !empID || !email || password || !cpassword || !department || !yearOfJoin || !designation || !duty) {
    //      return res.sendStatus(422).send({error: "Please fill the fields properly"});
    //  }
    try {

    const userExist = await User.findOne({email: email})

    if(userExist) {
        return res.sendStatus(422).send({error: "Email already exist"});
    }
    // const user = new User({firstName, lastName, empID, email, password, cpassword, department, yearOfJoin, designation, duty});
    // const userRegister = await user.save();
    const user = await User.create({firstName, lastName, empID, email, password, cpassword, department, yearOfJoin, designation, duty})

    if(user) {
        return res.sendStatus(201).send(user);
    } else {
        return res.sendStatus(500).send({error: "Failed to register"});
    }
    /*    .then((userExist) => {
            if(userExist) {
                return res.sendStatus(422).send({error: "Email already exist"});
            }
            const user = new User({firstname, lastname, empid, email, department, yearofjoin, work});
            user.save().then(() => {
                res.sendStatus(201).send({message: "user registered successfully"});
            }).catch((err) => res.sendStatus(500).send({error: "Failed to register"}));
        }).catch((err) => {console.log(err); });*/
    }  catch(err) {
        console.log(err);
    }
});

router.post('/student', uploadStudent, async(req, res) => {
    const {firstName, lastName, rollNumber, registrationNumber, yearOfRegistration, email, yearOfEnroll, department, image} = req.body;
    //const image = req.file.filename;
   //  if(!firstName || !lastName || !empID || !email || password || !cpassword || !department || !yearOfJoin || !designation || !duty) {
   //      return res.sendStatus(422).send({error: "Please fill the fields properly"});
   //  }
   try {

   const userExist = await Student.findOne({email: email})

   if(userExist) {
       return res.sendStatus(422).send({error: "Email already exist"});
   }
   // const user = new User({firstName, lastName, empID, email, password, cpassword, department, yearOfJoin, designation, duty});
   // const userRegister = await user.save();
   const user = await Student.create({firstName, lastName, rollNumber, registrationNumber, yearOfRegistration, email, yearOfEnroll, department, image})

   if(user) {
       return res.sendStatus(201).send(user);
   } else {
       return res.sendStatus(500).send({error: "Failed to register"});
   }
   /*    .then((userExist) => {
           if(userExist) {
               return res.sendStatus(422).send({error: "Email already exist"});
           }
           const user = new User({firstname, lastname, empid, email, department, yearofjoin, work});
           user.save().then(() => {
               res.sendStatus(201).send({message: "user registered successfully"});
           }).catch((err) => res.sendStatus(500).send({error: "Failed to register"}));
       }).catch((err) => {console.log(err); });*/
   }  catch(err) {
       console.log(err);
   }
});

router.post('/home', authenticate, async(req, res) => {
    const {noticeID, noticeBody, noticeDate, noticeByName, noticeByEmail, noticeByEmpID} = req.body;
   //  if(!firstName || !lastName || !empID || !email || password || !cpassword || !department || !yearOfJoin || !designation || !duty) {
   //      return res.sendStatus(422).send({error: "Please fill the fields properly"});
   //  }
   try {

//    const userExist = await User.findOne({email: email})

//    if(userExist) {
//        return res.sendStatus(422).send({error: "Email already exist"});
//    }
   // const user = new User({firstName, lastName, empID, email, password, cpassword, department, yearOfJoin, designation, duty});
   // const userRegister = await user.save();
   const user = await Notice.create({noticeID, noticeBody, noticeDate, noticeByName, noticeByEmail, noticeByEmpID})

   if(user) {
       return res.sendStatus(201).send(user);
   } else {
       return res.sendStatus(500).send({error: "Failed to add notice"});
   }
   /*    .then((userExist) => {
           if(userExist) {
               return res.sendStatus(422).send({error: "Email already exist"});
           }
           const user = new User({firstname, lastname, empid, email, department, yearofjoin, work});
           user.save().then(() => {
               res.sendStatus(201).send({message: "user registered successfully"});
           }).catch((err) => res.sendStatus(500).send({error: "Failed to register"}));
       }).catch((err) => {console.log(err); });*/
   }  catch(err) {
       console.log(err);
   }
});

router.post('/about', async(req, res) => {
    const {firstName, empID, email, department, yearOfJoin, designation, duty } = req.body;
   //  if(!firstName || !lastName || !empID || !email || password || !cpassword || !department || !yearOfJoin || !designation || !duty) {
   //      return res.sendStatus(422).send({error: "Please fill the fields properly"});
   //  }
   try {

   const userExist = await User.updateOne({email: req.body.email}, {$set:{firstName: req.body.firstName,
    empID: req.body.empID, email: req.body.email, department: req.body.department, 
    yearOfJoin: req.body.yearOfJoin, designation: req.body.designation, duty: req.body.duty
}});

   if(userExist) {
       return res.sendStatus(201).send(userExist);
   }
   // const user = new User({firstName, lastName, empID, email, password, cpassword, department, yearOfJoin, designation, duty});
   // const userRegister = await user.save();
   /*    .then((userExist) => {
           if(userExist) {
               return res.sendStatus(422).send({error: "Email already exist"});
           }
           const user = new User({firstname, lastname, empid, email, department, yearofjoin, work});
           user.save().then(() => {
               res.sendStatus(201).send({message: "user registered successfully"});
           }).catch((err) => res.sendStatus(500).send({error: "Failed to register"}));
       }).catch((err) => {console.log(err); });*/
   }  catch(err) {
       console.log(err);
   }
});

router.post('/signin', async(req, res) => {
    console.log(req.body);
    try {
        //let token;
        const {empID, email, password} = req.body;
        if(!empID || !email || !password) {
            return res.sendStatus(400).send({error:"Invalid Input"});
        }

        const UserLogin = await User.findOne({ email });
        console.log(UserLogin);

        if(UserLogin) {
            const isMatch = await bcrypt.compare(password, UserLogin.password);

            const token = await UserLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 7200000),
                httpOnly: true
            });

            
            // const token = jwt.sign(
            //     { user_id: UserLogin._id, email },
            //     process.env.SECRET_KEY,
            //     {
            //       expiresIn: "2h",
            //       httpOnly: true
            //     }
            //   );
        
              // save user token
              UserLogin.token = token;
            
            if(!(password === UserLogin.password)) {
                return res.sendStatus(400).send({error: 'Invalid credentials'});
            } else {
    
               return res.send({message: 'user signin successful'});
            }
        }


        if(!UserLogin) {
            return res.send({error: "User signin failed"});
        } else {
            return res.send({message: "User signin successful"});
        }

    } catch(err) {
        console.log(err);
    }
})

router.get('/about', authenticate , async (req, res) => {
    console.log('hello about');
    res.send(req.rootUser);
    //res.send({message: "About successful"});
})

router.get('/task', authenticate , (req, res) => {
    //console.log('hello about');
    res.send(req.rootUser);
})

router.get('/getData', authenticate, (req, res) => {
    //console.log('hello my about');
    res.send(req.rootUser);
})

router.get('/home', authNotice, (req, res) => {
    //console.log('hello my about');
    res.send(req.root);
})

router.post('/contact', authenticate, async (req, res) => {
    
        const {firstName, email, recipient, message} = req.body;
        if(!firstName || !email || !recipient || !message) {
            console.log("empty");
            return res.json({error: "please fill the form carefully"});
        }
        try {
        const userContact = await User.findOne({_id:req.userID});
        const userSend = await User.findOne({email: req.body.recipient});
        if(userContact && userSend) {
            const userMessage = await userContact.addMessage(firstName, email, recipient, message);
            await userContact.save();
            const userRec = await userSend.addMessage(firstName, email, recipient, message);
            await userSend.save();
            res.status(201).json({message: "success"});

            const msg = {
                to: [`${req.body.recipient}`,`${req.body.email}`],
                from: 'rb2240@it.jgec.ac.in',
                subject: `admin mail sent from ${req.body.firstName}`,
                text: `${req.body.message}`,
                html: `<h4>${req.body.message}</h4>`
            };

            sgmail.send(msg)
            .then(response => console.log(msg))
            .catch(error => console.log(error.message));
        }
    }
    catch(error) {
        console.log(error);
    }
})

router.post('/task', authenticate, async (req, res) => {
    
    const {firstName, email, phone, description, semester, reciever, deadline} = req.body;
    if(!firstName || !email || !phone || !description || !semester || !reciever || !deadline) {
        console.log("empty");
        return res.json({error: "please fill the form carefully"});
    }
    try {
    const userTask = await User.findOne({_id:req.userID});
    console.log(req.body);
    const userAssign = await User.findOne({email:req.body.reciever});
    console.log(userAssign);
    if(userTask && userAssign) {
        const userMessage = await userTask.addTask(firstName, email, phone, description, semester, reciever, deadline);
        await userTask.save();
        const userAtask = await userAssign.addTask(firstName, email, phone, description, semester, reciever, deadline);
        await userAssign.save();

        const tsk = {
            to: [`${req.body.reciever}`,`${req.body.email}`],
            from: 'rb2240@it.jgec.ac.in',
            subject: `duty assigned by ${req.body.firstName}`,
            html: `<h4>Description:${req.body.description} for semester no. ${req.body.semester}.<p></p> In case of query please contact: ${req.body.email} or +91${req.body.phone}</h4>`
        };

        sgmail.send(tsk)
        .then(response => console.log(tsk))
        .catch(error => console.log(error.message));

        res.status(201).json({message: "success"});
    }
    // if(userAssign) {
        
    //     res.status(201).json({message: "success"});
    // }
}
catch(error) {
    console.log(error);
}
})

router.post('/studentScore', authenticate, async (req, res) => {
    
    const {rollNumber, semester, subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
        subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
        subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
        subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
        subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint} = req.body;
    if(!rollNumber || !semester || !subjectOneName || !subjectOneCode || !subjectOneCredit || !subjectOnePoint ||
        !subjectTwoName || !subjectTwoCode || !subjectTwoCredit || !subjectTwoPoint ||
        !subjectThreeName || !subjectThreeCode || !subjectThreeCredit || !subjectThreePoint ||
        !subjectFourName || !subjectFourCode || !subjectFourCredit || !subjectFourPoint ||
        !subjectFiveName || !subjectFiveCode || !subjectFiveCredit || !subjectFivePoint) {
        console.log("empty");
        return res.json({error: "please fill the form carefully"});
    }
    try {
    const userScore = await Student.findOne({rollNumber:req.body.rollNumber});
    console.log(req.body);
    // const userAssign = await User.findOne({email:req.body.reciever});
    // console.log(userAssign);
    if(userScore) {
        if(req.body.semester == 1) {
        const studentScore = await userScore.addResult1(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
            subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
            subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
            subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
            subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
        await userScore.save(); }
        
        else if(req.body.semester == 2) {
            const studentScore = await userScore.addResult2(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
                subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
                subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
                subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
                subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
            await userScore.save(); }

        else if(req.body.semester == 3) {
            const studentScore = await userScore.addResult3(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
                subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
                subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
                subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
                subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
            await userScore.save(); }
        
        else if(req.body.semester == 4) {
            const studentScore = await userScore.addResult4(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
                subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
                subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
                subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
                subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
            await userScore.save(); }
        
        else if(req.body.semester == 5) {
            const studentScore = await userScore.addResult5(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
                subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
                subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
                subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
                subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
            await userScore.save(); }

        else if(req.body.semester == 6) {
            const studentScore = await userScore.addResult6(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
                subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
                subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
                subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
                subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
            await userScore.save(); }
        
        else if(req.body.semester == 7) {
            const studentScore = await userScore.addResult7(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
                subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
                subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
                subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
                subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
            await userScore.save(); }
        
        else if(req.body.semester == 8) {
            const studentScore = await userScore.addResult8(subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
                subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
                subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
                subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
                subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint);
            await userScore.save(); }

        // const rslt = {
        //     to: [`${req.body.reciever}`,`${req.body.email}`],
        //     from: 'rb2240@it.jgec.ac.in',
        //     subject: `duty assigned by ${req.body.firstName}`,
        //     text: `Description:${req.body.description} for ${req.body.semester} semester. In case of query please contact: ${req.body.email} or +91${req.body.phone}`,
        //     html: `<h4>Description:${req.body.description} for ${req.body.semester} semester. In case of query please contact: ${req.body.email} or +91${req.body.phone}</h4>`
        // };

        // sgmail.send(tsk)
        // .then(response => console.log(tsk))
        // .catch(error => console.log(error.message));

        res.status(201).json({message: "success"});
    }
    // if(userAssign) {
        
    //     res.status(201).json({message: "success"});
    // }
}
catch(error) {
    console.log(error);
}
})

router.get('/logout', async (req, res) => {
    console.log('hello logout');
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("logout done");
});

router.post('/resultpdf', authenticate, authResult, (req, res) => {
    
    try {
        const { rollNumber, semester } = req.body;
        const resultFind = req.root; //= Student.findOne({rollNumber:req.body.rollNumber}, {lean: true});

        //console.log(resultFind);

        const curSem = (req.body.semester==1)?resultFind.firstSemester:(req.body.semester==2)?resultFind.secondSemester:(req.body.semester==3)?resultFind.thirdSemester:(req.body.semester==4)?resultFind.fourthSemester:(req.body.semester==5)?resultFind.fifthSemester:(req.body.semester==6)?resultFind.sixthSemester:(req.body.semester==7)?resultFind.seventhSemester:resultFind.eighthSemester;

        console.log(curSem);

    const doct = new PDFDocument(); 
    const doc = new PDFdoc();
    doc.pipe(fs.createWriteStream(`${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`));
    // pathToAttachment = `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`;
    // attachment = fs.readFileSync(pathToAttachment).toString("base64");

    const head = {
        title: "JALPAIGURI GOVERNMENT ENGINEERING COLLEGE",
        subtitle: "A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE",
        headers:["Result of Semester:","Name:","Roll No.","Registration No.","Year"],
        rows:[
            [`${req.body.semester}`,`${resultFind.firstName} ${resultFind.lastName}`,`${resultFind.rollNumber}`,`${resultFind.registrationNumber}`,`${resultFind.yearOfRegistration}`]
        ]
    }

    const table = {
        title: "Grade Card",
        subtitle: "",
        headers: ["Subject Code", "Subject Name", "Points", "Credit", "Credit Points"],
        rows: [
          [`${curSem[0].subjectOneCode}`,`${curSem[0].subjectOneName}`,`${curSem[0].subjectOnePoint}`,`${curSem[0].subjectOneCredit}`,`${curSem[0].subjectOnePoint * curSem[0].subjectOneCredit}`],
          [`${curSem[0].subjectTwoCode}`,`${curSem[0].subjectTwoName}`,`${curSem[0].subjectTwoPoint}`,`${curSem[0].subjectTwoCredit}`,`${curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit}`],
          [`${curSem[0].subjectThreeCode}`,`${curSem[0].subjectThreeName}`,`${curSem[0].subjectThreePoint}`,`${curSem[0].subjectThreeCredit}`,`${curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit}`],
          [`${curSem[0].subjectFourCode}`,`${curSem[0].subjectFourName}`,`${curSem[0].subjectFourPoint}`,`${curSem[0].subjectFourCredit}`,`${curSem[0].subjectFourPoint * curSem[0].subjectFourCredit}`],
          [`${curSem[0].subjectFiveCode}`,`${curSem[0].subjectFiveName}`,`${curSem[0].subjectFivePoint}`,`${curSem[0].subjectFiveCredit}`,`${curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit}`],
          ["","", "Total:", `${curSem[0].subjectOneCredit+curSem[0].subjectTwoCredit+curSem[0].subjectThreeCredit+curSem[0].subjectFourCredit+curSem[0].subjectFiveCredit}`, `${curSem[0].subjectOnePoint * curSem[0].subjectOneCredit+curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit+curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit+curSem[0].subjectFourPoint * curSem[0].subjectFourCredit+curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit}`],
          ["","","SGPA:", `Semester No ${req.body.semester}`, `${(curSem[0].subjectOnePoint * curSem[0].subjectOneCredit+curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit+curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit+curSem[0].subjectFourPoint * curSem[0].subjectFourCredit+curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit)/(curSem[0].subjectOneCredit+curSem[0].subjectTwoCredit+curSem[0].subjectThreeCredit+curSem[0].subjectFourCredit+curSem[0].subjectFiveCredit)}`],
        ],
      };
    // doc.image('./JGEC_logo.png', {
    //     fit: [250, 300],
    //     align: 'center',
    //     valign: 'center'
    //   })

    // doc
    //   .fontSize(15)
    //   .text('JALPAIGURI GOVERNMENT ENGINEERING COLLEGE', 100, 100, { align: 'center'});
    // doc.moveDown();
    // doc
    //   .fontSize(10)
    //   .text('A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE', 100, 100, { align: 'center'});
    // doc.moveDown();
    // doc
    //   .fontSize(5)
    //   .text('AFFILIATED TO MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY', 100, 100, { align: 'center'});

    // doc
    //   .fontSize(20)
    //   .text('Grade Card', 100, 100, { align: 'center'});

    // doc.moveDown();
    // doc
    //   .fontSize(10)
    //   .text(`For the Semester No. ${req.body.semester} Examination of 2020-21 of`,100,100);
    //   doc.moveDown();
    //   doc
    //   .fontSize(10)
    //          .text(`Name: ${resultFind.firstName} ${resultFind.lastName} Roll No. ${resultFind.rollNumber}`,100,100);
    //          doc.moveDown();
    //          doc
    //          .fontSize(10)
    //          .text(`Registration No. ${resultFind.registrationNumber} Of ${resultFind.yearOfEnroll}` , 100, 100);
    
    doc.table(head, { width: 500, columnSize:[100,200,100,100,100], align:'center', fontSize:25, x:30, y:40});
    doc.table( table, { width: 500, columnSize:[100,200,100,100,100], align:'center'});
    doc.end();

    

    return res.status(200).send({message: "success"});
    }
    catch(error) {
        console.log(error);
    }
})

router.post('/resultSend', authResult, authenticate, (req, res) => {
   
    try {
    const { rollNumber, semester } = req.body;
        const resultFind = req.root;

    pathToAttachment = `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`;
    //pathToAttachment = `${doc}`;
    attachment = fs.readFileSync(pathToAttachment).toString("base64");
    
    const rslt = {
        to: [`${resultFind.email}`],
        from: 'rb2240@it.jgec.ac.in',
        subject: `Result of Semester ${req.body.semester}`,
        html: `<h4>Student Name: ${resultFind.firstName} ${resultFind.lastName}</h4>
        <p></p><h4>Roll No: ${resultFind.rollNumber}</h4><p></p>
        <h4>Registration No: ${resultFind.registrationNumber} of ${resultFind.yearOfRegistration}</h4><p></p>
        <h4>Hereby attached is the Result of Semester ${req.body.semester}</h4>
        <p></p><h4>Do not reply to this email or forward this to anyone. In case of any query or doubt related to result please contact your CR and so the respective authority on that 
        matter.</h4>`,
        AddAttachment: `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`,
        attachments: [
            {
              content: attachment,
              filename: `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`,
              type: "application/pdf",
              disposition: "attachment"
            }
          ]
    };

    sgmail.send(rslt)
    .then(response => console.log(rslt))
    .catch(error => console.log(error.message));
    
    return res.status(200).send({message: "success"});
   } catch(error) 
   { console.log(error); }
})

router.post('/registpdf', authResult, authenticate, (req, res) => {
    
    try {
        const { rollNumber, year } = req.body;
        const studFind = req.root; //= Student.findOne({rollNumber:req.body.rollNumber}, {lean: true});

        //console.log(resultFind);

        // const curSem = (req.body.semester==1)?resultFind.firstSemester:(req.body.semester==2)?resultFind.secondSemester:(req.body.semester==3)?resultFind.thirdSemester:(req.body.semester==4)?resultFind.fourthSemester:(req.body.semester==5)?resultFind.fifthSemester:(req.body.semester==6)?resultFind.sixthSemester:(req.body.semester==7)?resultFind.seventhSemester:resultFind.eighthSemester;

        // console.log(curSem);

    const doct = new PDFDocument(); 
    //const doc = new PDFdoc();
    doct.pipe(fs.createWriteStream(`${req.body.rollNumber}_Registration_Certificate_of_${req.body.year}.pdf`));
    // pathToAttachment = `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`;
    // attachment = fs.readFileSync(pathToAttachment).toString("base64");

    // const head = {
    //     title: "JALPAIGURI GOVERNMENT ENGINEERING COLLEGE",
    //     subtitle: "A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE",
    //     headers:["Result of Semester:","Name:","Roll No.","Registration No.","Year"],
    //     rows:[
    //         [`${req.body.semester}`,`${resultFind.firstName} ${resultFind.lastName}`,`${resultFind.rollNumber}`,`${resultFind.registrationNumber}`,"2020-21"]
    //     ]
    // }

    // const table = {
    //     title: "Grade Card",
    //     subtitle: "",
    //     headers: ["Subject Code", "Subject Name", "Points", "Credit", "Credit Points"],
    //     rows: [
    //       [`${curSem[0].subjectOneCode}`,`${curSem[0].subjectOneName}`,`${curSem[0].subjectOnePoint}`,`${curSem[0].subjectOneCredit}`,`${curSem[0].subjectOnePoint * curSem[0].subjectOneCredit}`],
    //       [`${curSem[0].subjectTwoCode}`,`${curSem[0].subjectTwoName}`,`${curSem[0].subjectTwoPoint}`,`${curSem[0].subjectTwoCredit}`,`${curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit}`],
    //       [`${curSem[0].subjectThreeCode}`,`${curSem[0].subjectThreeName}`,`${curSem[0].subjectThreePoint}`,`${curSem[0].subjectThreeCredit}`,`${curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit}`],
    //       [`${curSem[0].subjectFourCode}`,`${curSem[0].subjectFourName}`,`${curSem[0].subjectFourPoint}`,`${curSem[0].subjectFourCredit}`,`${curSem[0].subjectFourPoint * curSem[0].subjectFourCredit}`],
    //       [`${curSem[0].subjectFiveCode}`,`${curSem[0].subjectFiveName}`,`${curSem[0].subjectFivePoint}`,`${curSem[0].subjectFiveCredit}`,`${curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit}`],
    //       ["","", "Total:", `${curSem[0].subjectOneCredit+curSem[0].subjectTwoCredit+curSem[0].subjectThreeCredit+curSem[0].subjectFourCredit+curSem[0].subjectFiveCredit}`, `${curSem[0].subjectOnePoint * curSem[0].subjectOneCredit+curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit+curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit+curSem[0].subjectFourPoint * curSem[0].subjectFourCredit+curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit}`],
    //       ["","","SGPA:", `Semester No ${req.body.semester}`, `${(curSem[0].subjectOnePoint * curSem[0].subjectOneCredit+curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit+curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit+curSem[0].subjectFourPoint * curSem[0].subjectFourCredit+curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit)/(curSem[0].subjectOneCredit+curSem[0].subjectTwoCredit+curSem[0].subjectThreeCredit+curSem[0].subjectFourCredit+curSem[0].subjectFiveCredit)}`],
    //     ],
    //   };
    // doc.image('./JGEC_logo.png', {
    //     fit: [250, 300],
    //     align: 'center',
    //     valign: 'center'
    //   })

    // doc
    //   .fontSize(15)
    //   .text('JALPAIGURI GOVERNMENT ENGINEERING COLLEGE', 100, 100, { align: 'center'});
    // doc.moveDown();
    // doc
    //   .fontSize(10)
    //   .text('A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE', 100, 100, { align: 'center'});
    // doc.moveDown();
    // doc
    //   .fontSize(5)
    //   .text('AFFILIATED TO MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY', 100, 100, { align: 'center'});

    // doc
    //   .fontSize(20)
    //   .text('Grade Card', 100, 100, { align: 'center'});

    // doc.moveDown();
    // doc
    //   .fontSize(10)
    //   .text(`For the Semester No. ${req.body.semester} Examination of 2020-21 of`,100,100);
    //   doc.moveDown();
    //   doc
    //   .fontSize(10)
    //          .text(`Name: ${resultFind.firstName} ${resultFind.lastName} Roll No. ${resultFind.rollNumber}`,100,100);
    //          doc.moveDown();
    //          doc
    //          .fontSize(10)
    //          .text(`Registration No. ${resultFind.registrationNumber} Of ${resultFind.yearOfEnroll}` , 100, 100);

    doct
    .fontSize(25)
    .text('Jalpaiguri Government Engineering College', 100, 100);

    doct.moveDown();

    doct
    .fontSize(18)
    .text('A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE');

    doct.moveDown();
    
    doct
    .fontSize(18)
    .text('Affiliated to Maulana Abul Kalam Azad University of Technology');

    doct.moveDown();

    doct
    .fontSize(15)
    .text(`Name of Student: ${studFind.firstName} ${studFind.lastName}`);

    doct.moveDown();
    
    doct
    .fontSize(15)
    .text(`Registration Number: ${studFind.registrationNumber} of ${req.body.year}`);

    doct.moveDown();



    
    // doc.table(head, { width: 500, columnSize:[100,200,100,100,100], align:'center', fontSize:25, x:30, y:40});
    // doc.table( table, { width: 500, columnSize:[100,200,100,100,100], align:'center'});
    doct.end();

    

    return res.status(200).send({message: "success"});
    }
    catch(error) {
        console.log(error);
    }
})

router.post('/registSend', authResult, authenticate, (req, res) => {
   
    try {
    const { rollNumber, year } = req.body;
        const studFind = req.root;

    pathToAttachment = `${req.body.rollNumber}_Registration_Certificate_of_${req.body.year}.pdf`;
    //pathToAttachment = `${doc}`;
    attachment = fs.readFileSync(pathToAttachment).toString("base64");
    
    const rslt = {
        to: [`${studFind.email}`],
        from: 'rb2240@it.jgec.ac.in',
        subject: `Registration Certificate of ${studFind.firstName} ${studFind.lastName}`,
        html: `<h4>Student Name: ${studFind.firstName} ${studFind.lastName}</h4>
        <p></p><h4>Roll No: ${studFind.rollNumber}</h4><p></p>
        <h4>Registration No: ${studFind.registrationNumber} of ${req.body.year}</h4><p></p>
        <h4>Hereby attached is the Registration Certificate of ${req.body.year}</h4>
        <p></p><h4>Do not reply to this email or forward this to anyone. In case of any query or doubt related to result please contact your CR and so the respective authority on that 
        matter.</h4>`,
        AddAttachment: `${req.body.rollNumber}_Registration_Certificate_of_${req.body.year}.pdf`,
        attachments: [
            {
              content: attachment,
              filename: `${req.body.rollNumber}_Registration_Certificate_of_${req.body.year}.pdf`,
              type: "application/pdf",
              disposition: "attachment"
            }
          ]
    };

    sgmail.send(rslt)
    .then(response => console.log(rslt))
    .catch(error => console.log(error.message));
    
    return res.status(200).send({message: "success"});
   } catch(error) 
   { console.log(error); }
})

router.post('/admitPdf', authResult, authenticate, (req, res) => {
    
    try {
        const { rollNumber, semester } = req.body;
        const studFind = req.root; //= Student.findOne({rollNumber:req.body.rollNumber}, {lean: true});

        //console.log(resultFind);

        // const curSem = (req.body.semester==1)?resultFind.firstSemester:(req.body.semester==2)?resultFind.secondSemester:(req.body.semester==3)?resultFind.thirdSemester:(req.body.semester==4)?resultFind.fourthSemester:(req.body.semester==5)?resultFind.fifthSemester:(req.body.semester==6)?resultFind.sixthSemester:(req.body.semester==7)?resultFind.seventhSemester:resultFind.eighthSemester;

        // console.log(curSem);

    const doct = new PDFDocument(); 
    //const doc = new PDFdoc();
    doct.pipe(fs.createWriteStream(`${req.body.rollNumber}_Admit_Card_of_${req.body.semester}.pdf`));
    // pathToAttachment = `${resultFind.rollNumber}_RESULT_SEM-${req.body.semester}.pdf`;
    // attachment = fs.readFileSync(pathToAttachment).toString("base64");

    // const head = {
    //     title: "JALPAIGURI GOVERNMENT ENGINEERING COLLEGE",
    //     subtitle: "A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE",
    //     headers:["Result of Semester:","Name:","Roll No.","Registration No.","Year"],
    //     rows:[
    //         [`${req.body.semester}`,`${resultFind.firstName} ${resultFind.lastName}`,`${resultFind.rollNumber}`,`${resultFind.registrationNumber}`,"2020-21"]
    //     ]
    // }

    // const table = {
    //     title: "Grade Card",
    //     subtitle: "",
    //     headers: ["Subject Code", "Subject Name", "Points", "Credit", "Credit Points"],
    //     rows: [
    //       [`${curSem[0].subjectOneCode}`,`${curSem[0].subjectOneName}`,`${curSem[0].subjectOnePoint}`,`${curSem[0].subjectOneCredit}`,`${curSem[0].subjectOnePoint * curSem[0].subjectOneCredit}`],
    //       [`${curSem[0].subjectTwoCode}`,`${curSem[0].subjectTwoName}`,`${curSem[0].subjectTwoPoint}`,`${curSem[0].subjectTwoCredit}`,`${curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit}`],
    //       [`${curSem[0].subjectThreeCode}`,`${curSem[0].subjectThreeName}`,`${curSem[0].subjectThreePoint}`,`${curSem[0].subjectThreeCredit}`,`${curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit}`],
    //       [`${curSem[0].subjectFourCode}`,`${curSem[0].subjectFourName}`,`${curSem[0].subjectFourPoint}`,`${curSem[0].subjectFourCredit}`,`${curSem[0].subjectFourPoint * curSem[0].subjectFourCredit}`],
    //       [`${curSem[0].subjectFiveCode}`,`${curSem[0].subjectFiveName}`,`${curSem[0].subjectFivePoint}`,`${curSem[0].subjectFiveCredit}`,`${curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit}`],
    //       ["","", "Total:", `${curSem[0].subjectOneCredit+curSem[0].subjectTwoCredit+curSem[0].subjectThreeCredit+curSem[0].subjectFourCredit+curSem[0].subjectFiveCredit}`, `${curSem[0].subjectOnePoint * curSem[0].subjectOneCredit+curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit+curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit+curSem[0].subjectFourPoint * curSem[0].subjectFourCredit+curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit}`],
    //       ["","","SGPA:", `Semester No ${req.body.semester}`, `${(curSem[0].subjectOnePoint * curSem[0].subjectOneCredit+curSem[0].subjectTwoPoint * curSem[0].subjectTwoCredit+curSem[0].subjectThreePoint * curSem[0].subjectThreeCredit+curSem[0].subjectFourPoint * curSem[0].subjectFourCredit+curSem[0].subjectFivePoint * curSem[0].subjectFiveCredit)/(curSem[0].subjectOneCredit+curSem[0].subjectTwoCredit+curSem[0].subjectThreeCredit+curSem[0].subjectFourCredit+curSem[0].subjectFiveCredit)}`],
    //     ],
    //   };
    // doc.image('./JGEC_logo.png', {
    //     fit: [250, 300],
    //     align: 'center',
    //     valign: 'center'
    //   })

    // doc
    //   .fontSize(15)
    //   .text('JALPAIGURI GOVERNMENT ENGINEERING COLLEGE', 100, 100, { align: 'center'});
    // doc.moveDown();
    // doc
    //   .fontSize(10)
    //   .text('A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE', 100, 100, { align: 'center'});
    // doc.moveDown();
    // doc
    //   .fontSize(5)
    //   .text('AFFILIATED TO MAULANA ABUL KALAM AZAD UNIVERSITY OF TECHNOLOGY', 100, 100, { align: 'center'});

    // doc
    //   .fontSize(20)
    //   .text('Grade Card', 100, 100, { align: 'center'});

    // doc.moveDown();
    // doc
    //   .fontSize(10)
    //   .text(`For the Semester No. ${req.body.semester} Examination of 2020-21 of`,100,100);
    //   doc.moveDown();
    //   doc
    //   .fontSize(10)
    //          .text(`Name: ${resultFind.firstName} ${resultFind.lastName} Roll No. ${resultFind.rollNumber}`,100,100);
    //          doc.moveDown();
    //          doc
    //          .fontSize(10)
    //          .text(`Registration No. ${resultFind.registrationNumber} Of ${resultFind.yearOfEnroll}` , 100, 100);

    doct
    .fontSize(25)
    .text('Jalpaiguri Government Engineering College');

    doct.moveDown();

    doct
    .fontSize(18)
    .text('A GOVERNMENT AUTONOMOUS ENGINEERING COLLEGE');

    doct.moveDown();
    
    doct
    .fontSize(18)
    .text('Affiliated to Maulana Abul Kalam Azad University of Technology');

    doct.moveDown();

    doct
    .fontSize(15)
    .text(`Name of Student: ${studFind.firstName} ${studFind.lastName}`);

    doct.moveDown();
    
    doct
    .fontSize(15)
    .text(`Registration Number: ${studFind.registrationNumber} of ${studFind.yearOfRegistration}`);

    doct.moveDown();

    doct
    .fontSize(15)
    .text(`Roll Number: ${studFind.rollNumber}`);

    doct.moveDown();

    doct
    .fontSize(15)
    .text(`Admit Card issued for Semester No.: ${req.body.semester}`);

    doct.moveDown();



    
    // doc.table(head, { width: 500, columnSize:[100,200,100,100,100], align:'center', fontSize:25, x:30, y:40});
    // doc.table( table, { width: 500, columnSize:[100,200,100,100,100], align:'center'});
    doct.end();

    

    return res.status(200).send({message: "success"});
    }
    catch(error) {
        console.log(error);
    }
})

router.post('/admitSend', authResult, authenticate, (req, res) => {
   
    try {
    const { rollNumber, semester } = req.body;
        const studFind = req.root;

    pathToAttachment = `${req.body.rollNumber}_Admit_Card_of_${req.body.semester}.pdf`;
    //pathToAttachment = `${doc}`;
    attachment = fs.readFileSync(pathToAttachment).toString("base64");
    
    const rslt = {
        to: [`${studFind.email}`],
        from: 'rb2240@it.jgec.ac.in',
        subject: `Admit Card of Semester No ${req.body.semester} of ${studFind.firstName} ${studFind.lastName}`,
        html: `<h4>Student Name: ${studFind.firstName} ${studFind.lastName}</h4>
        <p></p><h4>Roll No: ${studFind.rollNumber}</h4><p></p>
        <h4>Registration No: ${studFind.registrationNumber} of ${req.body.year}</h4><p></p>
        <h4>Hereby attached is the Admit Card of Semester No. ${req.body.semester}</h4>
        <p></p><h4>Do not reply to this email or forward this to anyone. In case of any query or doubt related to result please contact your CR and so the respective authority on that 
        matter.</h4>`,
        AddAttachment: `${req.body.rollNumber}_Admit_Card_of_${req.body.semester}.pdf`,
        attachments: [
            {
              content: attachment,
              filename: `${req.body.rollNumber}_Admit_Card_of_${req.body.semester}.pdf`,
              type: "application/pdf",
              disposition: "attachment"
            }
          ]
    };

    sgmail.send(rslt)
    .then(response => console.log(rslt))
    .catch(error => console.log(error.message));
    
    return res.status(200).send({message: "success"});
   } catch(error) 
   { console.log(error); }
})

module.exports = router;