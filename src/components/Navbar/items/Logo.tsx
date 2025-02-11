import React from "react";
import logo from "../../../assets/images/Logo.png";
import "../styles/logo.css";
import { Link } from "react-router-dom";

export default function Logo(): React.ReactElement {
  return (
    <Link to="/" className="nav-logo">
      <img src={logo} className="logo-img" />
      <div className="logo-txt">
        <span>Thera</span>
        <span>Find</span>
      </div>
    </Link>
  );
}
