import React from "react";
import { useEffect, useState } from "react";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Register from "./RegisterComponent";
import Login from "./LoginComponent";
import Home from "./HomepageComponent";

import Axios from "axios";

import {Routes, Route, Redirect, BrowserRouter} from 'react-router-dom';

function Main() {
    
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [NameReg, setNameReg] = useState("");
  const [PrenameReg, setPrenameReg] = useState(""); 
  const [EmailReg, setEmailReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:8080/studentsregister", {
      username: usernameReg,
      parola: passwordReg,
      nume: NameReg,
      prenume: PrenameReg,
      email: EmailReg,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const login = () => {
    Axios.post("http://localhost:8080/studentslogin", {
      username: username,
      parola: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/studentslogin").then((response) => {
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.student.username);
      }
    });
  }, []);

  const studentAuthenticated = () => {
    Axios.get("http://localhost:8080/studentAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };
    return (
        <React.Fragment>
            <Header/>
            <div>Hello World from MainComponent -- Test!</div>
            <BrowserRouter>
                <Routes>
                     <Route path='/home' element={<Home/>}/>
                     <Route path='/register' element={<Register/>}/>
                     <Route path='/login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </React.Fragment>
    )
}

export default Main;