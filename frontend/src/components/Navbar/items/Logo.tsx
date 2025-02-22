import { JSX } from "react";
import logo from "../../../assets/images/Logo.png";
import "../styles/logo.css";

export default function Logo(): JSX.Element {
  return (
    <>
      <img src={logo} className="logo-img" />
      <div className="logo-txt">
        <span>Thera</span>
        <span>Find</span>
      </div>
    </>
  );
}
