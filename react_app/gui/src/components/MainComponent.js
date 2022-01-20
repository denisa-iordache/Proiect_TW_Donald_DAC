import React from "react";
import { useEffect, useState } from "react";

import Header from "./HeaderComponent";
import Header2 from "./HeaderAccount";
import Footer from "./FooterComponent";
import Register from "./RegisterComponent";
import Login from "./LoginComponent";
import Home from "./HomepageComponent";
import SuccesfulLogin from "./SuccessfulLogin";
import SuccesfulRegistration from "./SuccesfulRegistration";
import TesterHome from "./TesterHomepage";

import Axios from "axios";

import { Routes, Route, Redirect, BrowserRouter } from "react-router-dom";
import DefaultHome from "./DefaultHome";

function Main() {
  if (localStorage.getItem("token") != null) {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header2 />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginSuccesful" element={<SuccesfulLogin />} />
            <Route
              path="/registerSuccesful"
              element={<SuccesfulRegistration />}
            />
            <Route path="/testerHomepage" element={<TesterHome />} />
            <Route path="/defaultHomePage" element={<DefaultHome />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loginSuccesful" element={<SuccesfulLogin />} />
            <Route
              path="/registerSuccesful"
              element={<SuccesfulRegistration />}
            />
            <Route path="/testerHomepage" element={<TesterHome />} />
            <Route path="/defaultHomePage" element={<DefaultHome />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
  // return (
  //     <React.Fragment>
  //         <BrowserRouter>
  //             <Header/>
  //             <Routes>
  //                  <Route path='/home' element={<Home/>}/>
  //                  <Route path='/register' element={<Register/>}/>
  //                  <Route path='/login' element={<Login/>}/>
  //                  <Route path='/loginSuccesful' element={<SuccesfulLogin/>}/>
  //                  <Route path='/registerSuccesful' element={<SuccesfulRegistration/>}/>
  //                  <Route path='/testerHomepage' element={<TesterHome/>}/>
  //             </Routes>
  //             <Footer/>
  //         </BrowserRouter>
  //     </React.Fragment>
  // )
}

export default Main;
