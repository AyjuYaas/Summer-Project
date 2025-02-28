import { JSX } from "react";
import LoginLogout from "./LoginLogout";

import "../../styles/navlogin.css";
import { Link } from "react-router-dom";

interface NavLinkProps {
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavLogin({ setOpenNavbar }: NavLinkProps): JSX.Element {
  return (
    <div className="nav-login" onClick={() => setOpenNavbar(false)}>
      <LoginLogout />

      <Link to="/find-therapist" className="btn filled-btn">
        Get Started
      </Link>
    </div>
  );
}
