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
            <BrowserRouter>
                <Header/>
                <Routes>
                     <Route path='/home' element={<Home/>}/>
                     <Route path='/register' element={<Register/>}/>
                     <Route path='/login' element={<Login/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </React.Fragment>
    )
}

export default Main;