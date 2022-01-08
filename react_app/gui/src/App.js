import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
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
        <button onClick={login}>Login</button>
      </div>
      {loginStatus && (
        <button onClick={studentAuthenticated}>Check if authenticated</button>
      )}
    </div>
  );
}

export default App;
