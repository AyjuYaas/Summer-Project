import React from "react";
import Button from "../../../Button/Button";
import LoginLogout from "./LoginLogout";

import "../../styles/navlogin.css";

export default function NavLogin(): React.ReactElement {
  return (
    <div className="nav-login">
      <LoginLogout />
      <Button to="/find-therapist" content="get started" type="filled" />
    </div>
  );
}
