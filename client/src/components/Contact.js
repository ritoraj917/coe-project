import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css';

const Contact = () => {

  const history = useNavigate();
  const [userData, setUserData] = useState({name:"", email:"", recipient:"", message:""});

  const userContact = async () => {
    try {
        const res = await fetch('/auth/getData', {
        method:"GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, firstName:data.firstName, email:data.email});

      if(!(res.status === 200)) {
        const error = new Error(res.error);
        // throw error;
        return res.send({message: error});
      }
    } catch (err) {
      console.log(err);
      history("/contact", {replace: true});
    }
  }

  useEffect(() => { 
      userContact(); 
    }, []);

  const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setUserData({...userData, [name]:value })
  }

  const contactForm = async (e) => {
      e.preventDefault();
      
      const { firstName, email, recipient, message } = userData;

      const res = await fetch('/auth/contact', {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
            firstName:firstName, email:email, recipient:recipient, message:message
          })
      });

      const data = await res.json();
      console.log(data);

      if(!data) { console.log("message not sent"); }
      else { alert("Message sent succesfully"); }
      //setUserData({...userData, message: ""});
  }

    return (
      <div className='container'>
        <div className='row'>
        <div className='col-lg-3'></div>
         <div className='col-lg-6'>
        <div id='ui'>
        <form method='POST' className="form-group">
            <h2>Contact Form</h2><p></p>

            <label>Name:</label>
            <input name='firstName' className='form-control' value={userData.firstName} onChange={handleInput} placeholder='enter your firstname' /><p></p>

            <label>Your Email:</label>
            <input name='email' className='form-control' value={userData.email} onChange={handleInput} placeholder='enter your email' /><p></p>

            <label>Reciepient's Email:</label>
            <input name='recipient' className='form-control' onChange={handleInput} placeholder="enter receiver's email" /><p></p>

            <label>Message:</label>
            <textarea name='message' className='form-control' onChange={handleInput} placeholder='enter your message'></textarea><p></p>

            <div className='form-group form-button'>
              <input type="submit" id="button" value="Send"
               onClick={contactForm} />
            </div>

        </form>
        </div>
        </div>
        </div>
        </div>
    )
};

export default Contact;