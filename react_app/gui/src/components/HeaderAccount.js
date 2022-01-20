import React from "react";
import ReactFragment from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <div className="header">
        <Link to="/home" className="logo">
          Bug Tracker
        </Link>
        <div className="header-right">
          <Link to="/home">Home</Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
