import React from "react";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

import Axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [loginStatus, setLoginStatus] = useState(false);
  
    Axios.defaults.withCredentials = true;

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
        <div className="App">
          <div className="login">
            <h1>Login</h1>
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label>Parola</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Link to="/loginSuccesful">
                <button onClick={login}>Login</button>
            </Link>
          </div>
          {loginStatus && (
            <button onClick={studentAuthenticated}>Check if authenticated</button>
          )}
        </div>
        </React.Fragment>
      );
}

export default Login