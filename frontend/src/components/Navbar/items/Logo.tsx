import { JSX } from "react";
import logo from "../../../assets/images/Logo.png";
import "../styles/logo.css";

export default function Logo(): JSX.Element {
  return (
    <>
      <div className="logo-holder">
        <img src={logo} className="logo-img" alt="logo" />
      </div>
      <div className="logo-txt">
        <span>Thera</span>
        <span>Find</span>
      </div>
    </>
  );
}
