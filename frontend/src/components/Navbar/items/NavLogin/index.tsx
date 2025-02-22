import { JSX } from "react";
import Button from "../../../Button/Button";
import LoginLogout from "./LoginLogout";

import "../../styles/navlogin.css";

interface NavLinkProps {
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavLogin({ setOpenNavbar }: NavLinkProps): JSX.Element {
  return (
    <div className="nav-login" onClick={() => setOpenNavbar(false)}>
      <LoginLogout />
      <Button to="/find-therapist" content="get started" type="filled" />
    </div>
  );
}
