import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './signup.css';

import { UserContext } from '../App';

const Signin = () => {

  const {state, dispatch} = useContext(UserContext); 

  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [empID, setEmpID] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('/auth/signin', {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
         empID: empID, 
         email: email,
         password: password
      })
    //   const data = await res.json();
    // if(res.status===400|| !data) {
    //   window.alert('Invalid Credentials');
    // } else {
      
    //   //window.alert('Login Successful');
    //   history("/About", {replace: true});
    });

    const data = await res.json();
    console.log(data);
    if(res.status===400|| !data) {
      window.alert('Invalid Credentials');
    } else {
      dispatch({type:"USER", payload:true})
      //window.alert('Login Successful');
      history("/About", {replace: true});
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

               <label>Employee ID:</label>
               <input type='ID' name='empID' className='form-control' 
               value={empID}
               onChange={(e) => setEmpID(e.target.value)}
               placeholder='Enter Your Employee ID'></input><p></p>

               <label>E-mail:</label>
               <input type='email' name='email' className='form-control' 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder='Enter Your Email'></input><p></p>
            
                   <label>Password:</label>
                   <input type='password' name='password' className='form-control' 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder='example- Smith@123'>
                   </input><p></p>
              <div className='form-group form-button'>
              <input type="submit" value="Login" id="button" className='form-submit' 
               value = "Log In" onClick={loginUser} />
              </div>
             </form>

           </div>
         </div>

       </div>

     </div></>
  )
}

export default Signin;