import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/JGEC_logo.png'
import './signup.css';

const Signup = () => {

  const history = useNavigate();

  const [user, setUser] = useState({
    firstName: "", lastName: "", empID: "", email: "", password: "", cpassword: "", department: "", yearOfJoin: "", designation: "", duty: ""
  });
  let name, value;
  const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]:value});
  }

  const PostData = async (e) => {
    e.preventDefault();
    const {firstName, lastName, empID, email, password, cpassword, department, yearOfJoin, designation, duty} = user;

    const res = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        firstName:firstName, lastName:lastName, empID:empID, email:email,
        password:password, cpassword:cpassword, department:department,
        yearOfJoin:yearOfJoin, designation:designation, duty:duty
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
      history("/signin", {replace: true});
      }
  }
  

  return (
    <><p></p>
     <div className='container'>
       <div className='row'>
         <div className='col-lg-3'></div>
         <div className='col-lg-6'>
           <div id='ui'>

             <form method='POST' className='form-group'>
               <div className='row'>
                 <div className='col-lg-6'>
                   <label>First Name:</label>
                   <input type='text' name='firstName' className='form-control'
                     autoComplete='off'
                     value={user.firstName}
                     onChange={handleInputs}
                   placeholder='Enter Your First Name'>
                   </input>
                 </div>

                 <div className='col-lg-6'>
                   <label>Last Name:</label>
                   <input type='text' name='lastName' className='form-control' 
                     autoComplete='off'
                     value={user.lastName}
                     onChange={handleInputs}
                   placeholder='Enter Your Last Name'>
                   </input>
                 </div>
               </div><p></p>

               <label>Employee ID:</label>
               <input type='ID' name='empID' className='form-control' 
                 autoComplete='off'
                 value={user.empID}
                 onChange={handleInputs}
               placeholder='Enter Your Employee ID'></input><p></p>

               <label>E-mail:</label>
               <input type='email' name='email' className='form-control' 
                 autoComplete='off'
                 value={user.email}
                 onChange={handleInputs}
               placeholder='Enter Your Email'></input><p></p>
               
               <div className='row'>
                 <div className='col-lg-6'>
                   <label>Password:</label>
                   <input type='password' name='password' className='form-control' 
                     autoComplete='off'
                     value={user.password}
                     onChange={handleInputs}
                   placeholder='example- Smith@123'>
                   </input>
                 </div>

                 <div className='col-lg-6'>
                   <label>Confirm Password:</label>
                   <input type='password' name='cpassword' className='form-control' 
                     autoComplete='off'
                     value={user.cpassword}
                     onChange={handleInputs}
                   placeholder='Re-enter your password'>
                   </input>
                 </div>
               </div><p></p>

               <label>Department:</label>
               <input type='text' name='department' className='form-control' 
                 autoComplete='off'
                 value={user.department}
                 onChange={handleInputs}
               placeholder='Enter Your Department Name'></input><p></p>

               <label>Date of Joining:</label>
               <input type='date' name='yearOfJoin' className='form-control' 
                 autoComplete='off'
                 value={user.yearOfJoin}
                 onChange={handleInputs}
               placeholder='Enter Your Joining Date'></input><p></p>

               <label>Designation:</label>
               <input type='text' name='designation' className='form-control' 
                 autoComplete='off'
                 value={user.designation}
                 onChange={handleInputs}
               placeholder='Enter Your Designation'></input><p></p>

               <label>Current Duty:</label>
               <input type='text' name='duty' className='form-control' 
                 autoComplete='off'
                 value={user.duty}
                 onChange={handleInputs}
               placeholder='Enter Your Exam Duty (If any)'></input><p></p>
               <input type="submit" value="Signup" id="button" onClick={PostData} />

             </form>

           </div>
         </div>

       </div>

     </div>

    </>
  )
}

export default Signup;