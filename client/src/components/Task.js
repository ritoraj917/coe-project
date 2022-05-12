// import React from 'react'
// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import { useNavigate, Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import TableFooter from '@mui/material/TableFooter';
import "./task.css";
import { Typography } from '@mui/material';
import FileUpload from './fileUpload';
import axios from 'axios';



// let jobs = ['Question Paper Odd Sem','Question Paper Odd Sem','Marks Submission Odd Sem','Marks Submission Odd Sem' ]
// let sem = [1, 2, 3, 4, 5, 6, 7, 8];
// let name = ['Satyaki Roy', 'Ashish Chowdhury', 'Anindita Das', 'Debmalya Barui', 'Md Asraf Hossain', 'Yasmin Parvin', 'Ajit Mondal', 'Shefali Karmakar'];
// let emails = ['srcs@gmail.com', 'acit@gmail.com', 'adece@gmail.com', 'dbce@gmail.com', 'mahme@gmail.com', 'ypee@gmail.com', 'amce@gmail.com', 'skcs@gmail.com']
// let phones = 9932012048;
// let dates = ['17-Jan-2020', '05-Apr-2021', '26-May-2021', '02-Sep-2021', '08-Mar-2021', '23-Jan-2022'];
// for(let i=0; i<14; i++) {
//   users[i] = {
//     Controler: name[Math.floor(Math.random()*name.length)],
//     email: emails[Math.floor(Math.random()*emails.length)],
//     phone: phones+=1,
//     jobTitle: jobs[Math.floor(Math.random()*jobs.length)],
//     Semester: sem[Math.floor(Math.random()*sem.length)],
//     deadline: dates[Math.floor(Math.random()*dates.length)],
//     status: statuses[Math.floor(Math.random()*statuses.length)]
//   }
// }

//console.log(users);
const Task = () => {


  const history = useNavigate();
  const [userData, setUserData] = useState({firstName:"", email:"", phone:"", description:"", Semester: "", reciever: "", deadline: ""});
  // const [users, setUsers] = useState([{}]);
  const [users, setUsers] = useState([]);
  

  const callAboutPage = async () => {
    try {
      const res = await fetch('/auth/task', {
        method:"GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      //console.log(data);

      setUsers(data.task);
      console.log(users);

      if(!(res.status === 200)) {
        const error = new Error(res.error);
        throw error;
      }


    } catch (err) {
      console.log(err);
      history("/Signin", {replace: true});
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  const userTask = async () => {
    try {
        const res = await fetch('/auth/getData', {
        method:"GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      //console.log(data);
      setUserData({...userData, firstName:data.firstName, email:data.email});
      // setUsers({...users, task:data.task});
      // console.log(typeof(users));
      // console.log(users);

      // setUsers((users) => [
      //   ...users, ...json.map(({data.task}) => ({
      //     firstName,
      //   email,
      //   phone,
      //   description,
      //   semester,
      //   reciever,
      //   deadline
      //   }))
      // ]);
      
      //users.push(data.task);


      if(!(res.status === 200)) {
        const error = new Error(res.error);
        // throw error;
        return res.send({message: error});
      }
    } catch (err) {
      console.log(err);
      history("/about", {replace: true});
    }
  }
  useEffect(() => { 
    userTask(); 
  }, []);

  const onInputChange = (e) => {
    console.log(e.target.value);
  }
  

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData, [name]:value })
}


const taskForm = async (e) => {
  e.preventDefault();
  
  const { firstName, email, phone, description, semester, reciever, deadline } = userData;

  const res = await fetch('/auth/task', {
      method: "POST",
      headers: {
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
        firstName:firstName, email:email, phone:phone, description:description, semester:semester, reciever:reciever, deadline:deadline
      })
  });

  const data = await res.json();
  console.log(data);

  if(!data) { console.log("task not added"); }
  else { alert("Task added succesfully"); }
  //setUserData({...userData, message: ""});
}

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); }

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   const data = new FormData();

  //  data.append(file);

  //  axios.post('auth/upload', data)
  //      .then((e) => {
  //        console.log('success');
  //      })
  //      .catch(
  //        console.error('Error', e)
  //      )
  // };


    // const callAboutPage = async () => {
    //   try {
    //     const res = await fetch('/auth/task', {
    //       method:"GET",
    //       headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //       },
    //       credentials: "include"
    //     });
  
    //     const data = await res.json();
    //     //console.log(data);

    //     setUsers(data.task);
    //     console.log(users);
  
    //     if(res.status === 200) {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
  
  
    //   } catch (err) {
    //     console.log(err);
    //     history("/Signin", {replace: true});
    //   }
    // }
  
    // useEffect(() => {
    //   callAboutPage();
    // }, []);

  return (
    <div className='container'>
    <div className='btn'>
      <Popup trigger={<button type="submit" id="button">+Create Task</button>} position="right center">
        <div className='x'>
      <form method='POST' className='form-group'>
        <div className='row'>
              <div className='col-lg-4'>
               <label>Controller Name:</label>
               <input type='text' name='firstName' className='form-control' 
                 
                 value={userData.firstName}
                 onChange={handleInput}
               placeholder='Enter Your Name'></input></div>
               <div className='col-lg-4'>
               <label>Controller Email:</label>
               <input type='email' name='email' className='form-control' 
                 
                 value={userData.email}
                 onChange={handleInput}
               placeholder='Enter Your Email'></input></div>
               <div className='col-lg-4'>
               <label>Controller Phone Number:</label>
               <input type='number' name='phone' className='form-control' 
                 
                 onChange={handleInput}
                 
               placeholder='Enter Your Phone Number'></input></div></div>
               <div className='row'>
               <div className='col-lg-6'>
               <label>Task Description:</label>
               <input type='text' name='description' className='form-control' 
                 
                 onChange={handleInput}
                 
               placeholder='Enter Task Description'></input></div>
               <div className='col-lg-4'>
               <label>Semester Number:</label>
               <input type='number' name='semester' className='form-control' 
                 
                 onChange={handleInput}
                 
               placeholder='Enter Your Department Name'></input></div></div>
               <div className='row'>
                 <div className='col-lg-6'>
               <label>Receiver's Email:</label>
               <input type='email' name='reciever' className='form-control' 
                 
                 onChange={handleInput}
                 
               placeholder='Enter Your Email'></input></div>
               <div className='col-lg-6'>
               <label>Deadline:</label>
               <input type='date' name='deadline' className='form-control' 
                 
                 onChange={handleInput}
                 
               placeholder='Enter Deadline Date'></input></div></div><p></p>
               <input type="submit" value="Post" id="button" onClick={taskForm} />
            </form></div>
        </Popup></div>
    <TableContainer component={Paper} className='tableContainer'>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableHeaderCell' >Controller Info</TableCell>
            <TableCell className='tableHeaderCell'>Description</TableCell>
            <TableCell className='tableHeaderCell'>Reciever</TableCell>
            <TableCell className='tableHeaderCell'>Deadline</TableCell>
            <TableCell className='tableHeaderCell'>Upload Document</TableCell>
            {/* <TableCell className='tableHeaderCell'>Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                <Grid container>
                  <Grid item lg={2}><Avatar alt={row.firstName} src='.' /></Grid>
              <Grid item lg={8}><Typography>{row.firstName}</Typography>
              <Typography>{row.email}</Typography>
              <Typography>{row.phone}</Typography></Grid></Grid>
              </TableCell>
              <TableCell >
                <Typography>{row.description}</Typography>
                <Typography>Semester: {row.semester}</Typography>
              </TableCell>
              <TableCell >
                <Typography>Assigned To: {row.reciever}</Typography>
              </TableCell>
              <TableCell >
              {row.deadline}
              </TableCell>
              <TableCell >
              <Typography><FileUpload /></Typography>
              </TableCell>
              {/* <TableCell >
              <Typography><input type="submit" value="Submit" id="button" /></Typography>
              </TableCell> */}
              {/* <TableCell >
              <Typography className='status' style={{
                backgroundColor: ((row.status === 'Active' && 'lightgreen') ||
                (row.status === 'Pending' && 'lightsalmon') ||
                (row.status === 'Block' && 'grey'))
              }}>{row.status}</Typography>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className='page'>
        <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Task;