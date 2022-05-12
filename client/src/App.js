import React, { createContext, useReducer } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Task from "./components/Task";
import Contact from "./components/Contact";
import Logout from "./components/Logout";
import Student from "./components/studentNew";

import { initialState, reducer } from './reducer/UseReducer';

export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="about" element={<About />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="task" element={<Task />} />
      <Route path="studentNew" element={<Student />} />
      <Route path="contact" element={<Contact />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  )
}



const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState); //init

  return (
    <BrowserRouter>
    <UserContext.Provider value={{state, dispatch}}>
    <Navbar />
    <Routing />
    </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
