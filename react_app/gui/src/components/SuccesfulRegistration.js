import React from "react";
import { Link } from "react-router-dom";

import '../css/Succesful.css';

function SuccesfulRegistration() {
    return(
        <div>Succesful Registration!
            <Link to="/login">
                  <button >Autentifica-te in cont</button>
            </Link>
        </div>
        
    )
}

export default SuccesfulRegistration