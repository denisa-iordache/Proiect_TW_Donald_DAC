import React from "react";
import { useState } from "react";

import Axios  from "axios";

function Register() {

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

    return (
        <React.Fragment>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet"></link>
        <link href="./css/Form.css"></link>
        <div className="App">
          <div className="registration">
            <h1>Registration</h1>
            <label>Nume</label>
            <input
              type="text"
              onChange={(e) => {
                setNameReg(e.target.value);
              }}
            />
            <label>Prenume</label>
            <input
              type="text"
              onChange={(e) => {
                setPrenameReg(e.target.value);
              }}
            />
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
            <label>Parola</label>
            <input
              type="password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
            <button onClick={register}>Register</button>
          </div>
        </div>  
        </React.Fragment>
      );
 }

export default Register