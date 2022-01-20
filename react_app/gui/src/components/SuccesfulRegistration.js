import React from "react";
import { Link } from "react-router-dom";

import '../css/Succesful.css';

function SuccesfulRegistration() {
    return(
        <div>
            <p>Te-ai inregistrat cu succes. Iti poti accesa contul apasand pe butonul de mai jos.</p>
            <Link to="/login">
                  <button >Autentifica-te in cont</button>
            </Link>
        </div>
        
    )
}

export default SuccesfulRegistration