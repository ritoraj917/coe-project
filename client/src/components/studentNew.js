import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom'
import './signup.css';

const Student = () => {

  const history = useNavigate();
  const [student, setStudent] = useState({firstName:"", lastName:"", rollNumber:"", registrationNumber:"", yearOfRegistration:"", email:"", yearOfEnroll:"", department:"", image:""});

  const postData = async (e) => {
    e.preventDefault();
    const {firstName, lastName, rollNumber, registrationNumber, yearOfRegistration, email, yearOfEnroll, department, image} = student;

    const res = await fetch("/auth/student", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        firstName:firstName, lastName:lastName, rollNumber:rollNumber, registrationNumber:registrationNumber,
        yearOfRegistration:yearOfRegistration, email: email, yearOfEnroll: yearOfEnroll, department: department, image:image
      })
    });

    const data = await res.json();
    console.log(data);

    if(!data) {
      window.alert("Invalid Registration");
      console.log("Invalid registration"); }
      else {
        window.alert("Registration Successful");
      console.log("Registration Successful");

      // history.pushState("/Signin");
      //history("/Signin", {replace: true});
      }
  }

  const [result, setResult] = useState({rollNumber:"", semester:""});

  const [regist, setRegist] = useState({rollNumber:"", year:""});

  const [admit, setAdmit] = useState({rollNumber:"", semester:""});

  const [studentResult, setStudentResult] = useState({rollNumber:"", semester:"",
  subjectOneName:"", subjectOneCode:"", subjectOneCredit:"", subjectOnePoint:"",
  subjectTwoName:"", subjectTwoCode:"", subjectTwoCredit:"", subjectTwoPoint:"",
  subjectThreeName:"", subjectThreeCode:"", subjectThreeCredit:"", subjectThreePoint:"",
  subjectFourName:"", subjectFourCode:"", subjectFourCredit:"", subjectFourPoint:"",
  subjectFiveName:"", subjectFiveCode:"", subjectFiveCredit:"", subjectFivePoint:"",
})

  const updateScore = async (e) => {
    e.preventDefault();
    
    const { rollNumber, semester, subjectOneName, subjectOneCode, subjectOneCredit, subjectOnePoint,
    subjectTwoName, subjectTwoCode, subjectTwoCredit, subjectTwoPoint,
    subjectThreeName, subjectThreeCode, subjectThreeCredit, subjectThreePoint,
    subjectFourName, subjectFourCode, subjectFourCredit, subjectFourPoint,
    subjectFiveName, subjectFiveCode, subjectFiveCredit, subjectFivePoint } = studentResult;
  
    const res = await fetch('/auth/studentScore', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          rollNumber:rollNumber, semester:semester, subjectOneName:subjectOneName, subjectOneCode:subjectOneCode, 
          subjectOneCredit:subjectOneCredit, subjectOnePoint:subjectOnePoint,
    subjectTwoName:subjectTwoName, subjectTwoCode:subjectTwoCode, subjectTwoCredit:subjectTwoCredit, 
    subjectTwoPoint:subjectTwoPoint, subjectThreeName:subjectThreeName, subjectThreeCode:subjectThreeCode, 
    subjectThreeCredit:subjectThreeCredit, subjectThreePoint:subjectThreePoint,
    subjectFourName:subjectFourName, subjectFourCode:subjectFourCode, subjectFourCredit:subjectFourCredit, 
    subjectFourPoint:subjectFourPoint,subjectFiveName:subjectFiveName, subjectFiveCode:subjectFiveCode, 
    subjectFiveCredit:subjectFiveCredit, subjectFivePoint:subjectFivePoint
        })
    });
    //setUserData({...userData, message: ""});
  }

  const updateResult = async (e) => {
    e.preventDefault();
    
    const { rollNumber, semester } = result;
  
    const res = await fetch('/auth/resultPdf', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          rollNumber:rollNumber, semester:semester })
    });
    //setUserData({...userData, message: ""});
    if(res)
    {
      window.alert("Result Downloaded");
      const rs = await fetch('/auth/resultSend', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          rollNumber:rollNumber, semester:semester })
    });
      if(rs) {window.alert("Result Sent Successfully");}
      else {window.alert("Error");}
    }
    else {
      window.alert("Error. Try again later.");
    }
  }

  const updateRegist = async (e) => {
    e.preventDefault();
    
    const { rollNumber, year } = regist;
  
    const res = await fetch('/auth/registPdf', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          rollNumber:rollNumber, year:year })
    });
    //setUserData({...userData, message: ""});
    if(res)
    {
      window.alert("Registration Certificate Downloaded");
      const rs = await fetch('/auth/registSend', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          rollNumber:rollNumber, year:year })
    });
      if(rs) {window.alert("Registration Certificate Sent Successfully");}
      else {window.alert("Error");}
    }
    else {
      window.alert("Error. Try again later.");
    }
  }

  const updateAdmit = async (e) => {
    e.preventDefault();
    
    const { rollNumber, semester } = admit;
  
    const res = await fetch('/auth/admitPdf', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          rollNumber:rollNumber, semester:semester })
    });
    //setUserData({...userData, message: ""});
    if(res)
    {
      window.alert("Admit Downloaded");
      const rs = await fetch('/auth/admitSend', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
          rollNumber:rollNumber, semester:semester })
    });
      if(rs) {window.alert("Admit Sent Successfully");}
      else {window.alert("Error");}
    }
    else {
      window.alert("Error. Try again later.");
    }
  }

  const handleScore = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudentResult({...studentResult, [name]:value })
  }

    const handleInputs = (e) => {
      let name, value;
      name = e.target.name;
      value = e.target.value;
      setStudent({ ...student, [name]:value});
}
    
const handleResult = (e) => {
  let name, value;
  name = e.target.name;
  value = e.target.value;
  setResult({ ...result, [name]:value});
}

const handleAdmit = (e) => {
  let name, value;
  name = e.target.name;
  value = e.target.value;
  setAdmit({ ...admit, [name]:value});
}

const handleRegist = (e) => {
  let name, value;
  name = e.target.name;
  value = e.target.value;
  setRegist({ ...regist, [name]:value});
}

    return (
      <div className='container'>

<div className='btn'>
    <Popup trigger={<button type="submit" id="button">Update Results</button>} position='bottom left'>
        <div className='x'>
      <form method='POST' className='form-group'>
        <div className='row'>
              <div className='col-lg-4'>
               <label>Student's Roll Number:</label>
               <input type='number' name='rollNumber' className='form-control' 
                 
                 onChange={handleScore}
               placeholder='Enter Roll Number'></input></div>
               <div className='col-lg-4'>
               <label>Current Semester:</label>
               <input type='number' name='semester' className='form-control' 
                 
                 onChange={handleScore}
               placeholder='Enter Semester'></input></div></div>
               <div className='row'>
               <div className='col-lg-2'>
              
               <label>Name of First Subject:</label>
               <input type='text' name='subjectOneName' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Code of First Subject:</label>
               <input type='text' name='subjectOneCode' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Credit of First Subject:</label>
               <input type='number' name='subjectOneCredit' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
                 <div className='col-lg-2'>
               <label>Points Gained on Subject:</label>
               <input type='number' name='subjectOnePoint' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <p></p>
               <div className='col-lg-2'>
              
               <label>Name of Second Subject:</label>
               <input type='text' name='subjectTwoName' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Code of Second Subject:</label>
               <input type='text' name='subjectTwoCode' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Credit of Second Subject:</label>
               <input type='number' name='subjectTwoCredit' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
                 <div className='col-lg-2'>
               <label>Points Gained on Subject:</label>
               <input type='number' name='subjectTwoPoint' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               </div> <p></p>
               <div className='row'>
               <div className='col-lg-2'>
              
               <label>Name of Third Subject:</label>
               <input type='text' name='subjectThreeName' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Code of Third Subject:</label>
               <input type='text' name='subjectThreeCode' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Credit of Third Subject:</label>
               <input type='number' name='subjectThreeCredit' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
                 <div className='col-lg-2'>
               <label>Points Gained on Subject:</label>
               <input type='number' name='subjectThreePoint' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               </div> <p></p>
               <div className='row'>
               <div className='col-lg-2'>
              
               <label>Name of Fourth Subject:</label>
               <input type='text' name='subjectFourName' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Code of Fourth Subject:</label>
               <input type='text' name='subjectFourCode' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Credit of Fourth Subject:</label>
               <input type='number' name='subjectFourCredit' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
                 <div className='col-lg-2'>
               <label>Points Gained on Subject:</label>
               <input type='number' name='subjectFourPoint' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               </div> <p></p>
               <div className='row'>
               <div className='col-lg-2'>
              
               <label>Name of Fifth Subject:</label>
               <input type='text' name='subjectFiveName' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Code of Fifth Subject:</label>
               <input type='text' name='subjectFiveCode' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <div className='col-lg-2'>
               <label>Credit of Fifth Subject:</label>
               <input type='number' name='subjectFiveCredit' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
                 <div className='col-lg-2'>
               <label>Points Gained on Subject:</label>
               <input type='number' name='subjectFivePoint' className='form-control' 
                 
                 onChange={handleScore}
                 
               placeholder=''></input></div>
               <p></p>
               <input type="submit" value="Post" id="button" onClick={updateScore} /></div>
            </form></div>
        </Popup>
    </div>

        <div className='row'>
        <div className='col-lg-3'></div>
         <div className='col-lg-6'>
        <div id='ui'>
        <form method='POST' className="form-group" encType='multipart/form-data'>
            <h2>Add Student:</h2><p></p>

            <label>Firstname:</label>
            <input type='text' name='firstName' className='form-control' onChange={handleInputs} placeholder='enter firstname' /><p></p>

            <label>Lastname:</label>
            <input type='text' name='lastName' className='form-control' onChange={handleInputs} placeholder='enter lastname' /><p></p>

            <label>Roll Number:</label>
            <input type='Number' name='rollNumber' className='form-control' onChange={handleInputs} placeholder="enter roll number" /><p></p>

            <label>Registration Number:</label>
            <input type='Number' name='registrationNumber' className='form-control' onChange={handleInputs} placeholder="enter registration number" /><p></p>
              
            <label>Year of Registration:</label>
            <input type='text' name='yearOfRegistration' className='form-control' onChange={handleInputs} placeholder="enter registration number" /><p></p>

            <label>Email:</label>
            <input type='email' name='email' className='form-control' onChange={handleInputs} placeholder='enter college email' /><p></p>

            <label>Year of Enrollment:</label>
            <input type='date' name='yearOfEnroll' className='form-control' onChange={handleInputs} placeholder='enter academic year of enrollment'></input><p></p>

            <label>Department:</label>
            <input type='text' name='department' className='form-control' onChange={handleInputs} placeholder='enter department' /><p></p>

            <label>Image:</label>
            <input type='file' name='image' className='form-control' onChange={handleInputs} /><p></p>

            <div className='form-group form-button'>
              <input type="submit" id="button" value="Add"
               onClick={postData} />
            </div>

        </form>
        </div>
        <div className='col-lg-3'>
        <div className='btn'>
    <Popup trigger={<button type="submit" id="button">Publish Result</button>} position='bottom left'>
        <div className='x'>
      <form method='POST' className='form-group'>
        <div className='row'>
              <div className='col-lg-4'>
               <label>Student's Roll Number:</label>
               <input type='number' name='rollNumber' className='form-control' 
                 
                 onChange={handleResult}
               placeholder='Enter Roll Number'></input></div>
               <div className='col-lg-4'>
               <label>Current Semester:</label>
               <input type='number' name='semester' className='form-control' 
                 
                 onChange={handleResult}
               placeholder='Enter Semester'></input></div>
               
               <p></p>
               <input type="submit" value="Post" id="button" onClick={updateResult} /></div>
            </form>
            </div>
        </Popup>
    </div>
    <div className='btn'>
    <Popup trigger={<button type="submit" id="button">Publish Registration Certificate</button>} position='bottom left'>
        <div className='x'>
      <form method='POST' className='form-group'>
        <div className='row'>
              <div className='col-lg-4'>
               <label>Student's Roll Number:</label>
               <input type='number' name='rollNumber' className='form-control' 
                 
                 onChange={handleRegist}
               placeholder='Enter Roll Number'></input></div>
               <div className='col-lg-4'>
               <label>Batch of:</label>
               <input type='string' name='year' className='form-control' 
                 
                 onChange={handleRegist}
               placeholder='Enter Year'></input></div>
               
               <p></p>
               <input type="submit" value="Post" id="button" onClick={updateRegist} /></div>
            </form>
            </div>
        </Popup>
    </div>
    <div className='btn'>
    <Popup trigger={<button type="submit" id="button">Publish Admit Card</button>} position='bottom left'>
        <div className='x'>
      <form method='POST' className='form-group'>
        <div className='row'>
              <div className='col-lg-4'>
               <label>Student's Roll Number:</label>
               <input type='number' name='rollNumber' className='form-control' 
                 
                 onChange={handleAdmit}
               placeholder='Enter Roll Number'></input></div>
               <div className='col-lg-4'>
               <label>Semester No:</label>
               <input type='number' name='semester' className='form-control' 
                 
                 onChange={handleAdmit}
               placeholder='Enter semester no'></input></div>
               
               <p></p>
               <input type="submit" value="Post" id="button" onClick={updateAdmit} /></div>
            </form>
            </div>
        </Popup>
    </div>
        </div>
        </div>
        </div>

        

        </div>
    )
};

export default Student;