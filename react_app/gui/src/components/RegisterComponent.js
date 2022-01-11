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
      );
 }

export default Register