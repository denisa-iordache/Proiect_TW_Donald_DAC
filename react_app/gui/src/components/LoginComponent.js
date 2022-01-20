import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { useNavigate } from "react-router";

import Axios from "axios";
import Home from "./HomepageComponent";

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
        alert("Combinatie incorecta de username si parola!");
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        localStorage.setItem("loginstatus", setLoginStatus);
        <Link to="/home">sf</Link>;
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
          <button onClick={login}>Verifica date</button>
          {loginStatus && <Link to="/home"><button onClick={login}>Login membru</button></Link>}
          {loginStatus && <Link to="/testerHomepage"><button onClick={login}>Login tester</button></Link>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
