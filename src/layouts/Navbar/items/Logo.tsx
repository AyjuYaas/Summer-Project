import React from "react";
import logo from "../../../assets/images/Logo.png";
import "../styles/logo.css";
import { useNavigate } from "react-router-dom";

export default function Logo(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate("/")}>
      <img src={logo} className="logo-img" />
      <div className="logo-txt">
        <span>Thera</span>
        <span>Find</span>
      </div>
    </div>
  );
}
