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
    return (
        <React.Fragment>
            <Header/>
            <div>Hello World from MainComponent -- Test!</div>
            <BrowserRouter>
                <Routes>
                     <Route path='/home' element={<Home/>}/>
                     <Route path='/register' element={<Register/>}/>
                     <Route path='/login' element={<Login/>}/>
                     {/* <Redirect to='/home'/> */}
                </Routes>
            </BrowserRouter>
            <Footer/>
        </React.Fragment>
    )
}

export default Main;