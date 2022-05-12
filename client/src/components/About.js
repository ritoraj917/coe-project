import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom'
import logo from '../images/JGEC_logo.png'
import './About.css'
import './task.css'

const About = () => {

  const history = useNavigate();
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({
    firstName: "", empID: "", email: "", department: "", yearOfJoin: "", designation: "", duty: ""
  });

  const callAboutPage = async () => {
    try {
        const res = await fetch('/auth/about', {
        method:"GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);
      setUser({...user, firstName:data.firstName, empID: data.empID, email: data.email, 
        department: data.department, yearOfJoin: data.yearOfJoin, designation: data.designation, duty: data.duty});

      if(!(res.status === 200)) {
        const error = new Error(res.error);
        // throw error;
        return res.send({message: error});
      }
    } catch (err) {
      console.log(err);
      history("/signin", {replace: true});
    }
  }
  useEffect(() => { callAboutPage(); }, []);


  const PostData = async (e) => {
    e.preventDefault();
    const {firstName, empID, email, department, yearOfJoin, designation, duty} = user;

    const res = await fetch("/auth/about", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        firstName:firstName, empID:empID, email:email,
        department:department, yearOfJoin:yearOfJoin, designation:designation, duty:duty
      })
    });

    const data = await res.json();
    console.log(data);

    if(!data) {
      window.alert("Invalid Update"); }
      else {
        window.alert("Updated Successfully");

      // history.pushState("/Signin");
      history("/Signin", {replace: true});
      }
  }

  

  const handleTask = (e) => {
    history("/Task", {replace: true});
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...userData, [name]:value })
}

  return (
    <div id="x" className='card'>
    <div className='container emp-profile'>
      <form method="GET">
        <div className='row'>
          <div className='col-md-4'>
            <img src={logo} alt='logo' id='im' /><p></p>
            <input type='submit' className='profile-edit-btn' name='btnAddMore' id='button' value='Change Profile Photo' />
          </div>
         <div className='col-md-6'>
            <div className='card'>
              {/* <div className='row'>
              <h5 className='col-md-6'>Name: xyz<p></p></h5>
              <h5 className='col-md-6'>Employee ID: 123<p></p></h5></div>
              <div className='row'>
              <h5 className='col-md-6'>Email: xyz@gmail.com<p></p></h5>
              <h5 className='col-md-6'>Department: IT<p></p></h5></div>
              <div className='row'>
              <h5 className='col-md-4'>Date of Joining: 12-Apr-2007<p></p></h5>
              <h5 className='col-md-4'>Designation: Assistant Professor<p></p></h5>
              <h5 className='col-md-4'>Current Duty: HE<p></p></h5></div>
              <input type='submit' className='profile-edit-btn' name='btnAddMore' id='button' value='Go To Task' /> */}
              <div>
              <h5>Name:</h5><h5> {userData.firstName} <p></p></h5>
              <h5>Employee ID:</h5><h5> {userData.empID}<p></p></h5></div>
              <div><hr></hr>
              <h5>Email:</h5><h5> {userData.email}<p></p></h5>
              <h5>Department:</h5><h5> {userData.department}<p></p></h5></div>
              <div><hr></hr>
              <h5>Date of Joining:</h5><h5> {userData.yearOfJoin}<p></p></h5>
              <h5>Designation:</h5><h5> {userData.designation}<p></p></h5>
              <h5>Current Duty:</h5><h5> {userData.duty}<p></p></h5></div>
              <input type='submit' onClick={handleTask} className='profile-edit-btn' name='btnAddMore' id='button' value='Go To Task' />

            </div>
            </div>
          
            </div>
            </form>

        {/* <div className='col-md-2'> */}
          <div className='btn'>
      <Popup trigger={<button type="submit" id="button">Edit Profile</button>} position="right corner">
        <div className='x'>
      <form method='POST' className='form-group'>
        <div className='row'>
              <div className='col-lg-4'>
               <label>First Name:</label>
               <input type='text' name='firstName' className='form-control' 
                 
                 value={user.firstName}
                 onChange={handleInput}
               placeholder='Enter Your Name'></input></div>
               <div className='col-lg-4'>
               <label>Employee ID:</label>
               <input type='ID' name='empID' className='form-control' 
                 value={user.empID}
                 onChange={handleInput}
               placeholder='Enter Your Email'></input></div>
               <div className='col-lg-4'>
               <label>Email:</label>
               <input type='email' name='email' className='form-control' 
                 value={user.email} 
                 onChange={handleInput}></input></div></div>
               <div className='row'>
               <div className='col-lg-6'>
               <label>Department:</label>
               <input type='text' name='department' className='form-control' 
                 value={user.department} 
                 onChange={handleInput}></input></div>
               <div className='col-lg-4'>
               <label>yearOfJoin:</label>
               <input type='date' name='yearOfJoin' className='form-control' 
                 value={user.yearOfJoin} 
                 onChange={handleInput}></input></div></div>
               <div className='row'>
                 <div className='col-lg-6'>
               <label>Designation:</label>
               <input type='test' name='designation' className='form-control' 
                 value={user.designation} 
                 onChange={handleInput}></input></div>
               <div className='col-lg-6'>
               <label>Duty:</label>
               <input type='text' name='duty' className='form-control' 
                 value={user.duty} 
                 onChange={handleInput}></input></div></div><p></p>
               <input type="submit" value="Post" id="button" onClick={PostData} />
            </form></div>
        </Popup></div>
          {/* </div> */}
       {/* </div>
      </form> */}
    </div>
    </div>
  )
};

export default About;