import React, {useState, useEffect} from 'react'
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

const Home = () => {

  //const history = useNavigate();
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({noticeID:"", noticeBody:"", noticeDate:"", noticeByName:"",
  noticeByEmail:"", noticeByEmpID:""});


  const userHomepage = async () => {
    try {
        const res = await fetch('/auth/home', {
        method:"GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUser(data);
      setShow(true);

      if(!(res.status === 200)) {
        const error = new Error(res.error);
        // throw error;
        return res.send({message: error});
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => { 
      userHomepage(); 
    }, []);

    const taskForm = async (e) => {
      e.preventDefault();
      
      const { noticeID, noticeBody, noticeDate, noticeByName, noticeByEmail, noticeByEmpID } = userData;
    
      const res = await fetch('/auth/home', {
          method: "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
            noticeID: noticeID, noticeBody:noticeBody, noticeDate:noticeDate, 
            noticeByName:noticeByName, noticeByEmail:noticeByEmail, noticeByEmpID:noticeByEmpID
          })
      });
    
      const data = await res.json();
      console.log(data);
    
      if(!data) { alert("Notice not added"); }
      else { alert("Notice added succesfully"); }
      //setUserData({...userData, message: ""});
    }

    const handleInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setUserData({...userData, [name]:value })
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); }

  return (
    <div className='container'>
    <div className='btn'>
      <Popup trigger={<button type="submit" id="button">+Create Notice</button>} position="right center">
        <div className='x'>
      <form method='POST' className='form-group'>
        <div className='row'>
              <div className='col-lg-4'>
               <label>Notice Number:</label>
               <input type='text' name='noticeID' className='form-control' 
                 
                value={userData.noticeID}
                 onChange={handleInput}
               placeholder='Enter Notice Number'></input></div>
               <div className='col-lg-4'>
               <label>Write the Notive here:</label>
               <input type='text' name='noticeBody' className='form-control' 
                 
                value={userData.noticeBody}
                 onChange={handleInput}
               placeholder='Notice Body...'></input></div>
               <div className='col-lg-4'>
               <label>Date:</label>
               <input type='Date' name='noticeDate' className='form-control' 
                 value = {userData.noticeDate}
                 onChange={handleInput}
                 
               placeholder='Enter the date posted...'></input></div></div>
               <div className='row'>
               <div className='col-lg-6'>
               <label>Your Name:</label>
               <input type='text' name='noticeByName' className='form-control' 
                 value = {userData.noticeByName}
                 onChange={handleInput}
                 
               placeholder='Your Name...'></input></div>
               <div className='col-lg-4'>
               <label>Your Email:</label>
               <input type='email' name='noticeByEmail' className='form-control' 
                 value = {userData.noticeByEmail}
                 onChange={handleInput}
                 
               placeholder='Enter Your Email...'></input></div></div>
               <div className='row'>
                 <div className='col-lg-6'>
               <label>Your Employee ID:</label>
               <input type='number' name='noticeByEmpID' className='form-control' 
                 value = {userData.noticeByEmpID}
                 onChange={handleInput}
                 
               placeholder='Enter Your Employee ID...'></input></div>
               </div><p></p>
               <input type="submit" value="Post" id="button" onClick={taskForm} />
            </form></div>
        </Popup></div>
    <TableContainer component={Paper} className='tableContainer'>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableHeaderCell' >Notice Number</TableCell>
            <TableCell className='tableHeaderCell'>Description</TableCell>
            <TableCell className='tableHeaderCell'>Date Posted</TableCell>
            <TableCell className='tableHeaderCell'>Noticed By</TableCell>
            {/* <TableCell className='tableHeaderCell'>Upload Document</TableCell>
            <TableCell className='tableHeaderCell'>Submit</TableCell>
            <TableCell className='tableHeaderCell'>Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                <Grid container item lg={2}>
                  {/* <Grid item lg={2}><Avatar alt={row.noticeID} src='.' /></Grid> */}
              <Typography>{row.noticeID}</Typography></Grid></TableCell>
              <TableCell ><Typography>{row.noticeBody}</Typography></TableCell>
              <TableCell ><Typography>{row.noticeDate}</Typography>
              </TableCell>
              <TableCell >
                <Grid container>
              <Grid item lg={8}><Typography>{row.noticeByName}</Typography>
              <Typography>{row.noticeByEmail}</Typography>
              <Typography>{row.noticeByEmpID}</Typography></Grid></Grid>
              </TableCell>
              {/* <TableCell >
              {row.deadline}
              </TableCell>
              <TableCell >
              <Typography><FileUpload /></Typography>
              </TableCell>
              <TableCell >
              <Typography><input type="submit" value="Submit" id="button" /></Typography>
              </TableCell>
              <TableCell >
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
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableFooter>
      </Table>
    </TableContainer></div>
  )
}

export default Home;