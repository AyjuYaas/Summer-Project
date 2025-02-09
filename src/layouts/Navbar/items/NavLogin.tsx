import React from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

import "../styles/navlogin.css";
import Button from "../../../components/Button";

interface Prop {
  logStatus: boolean;
}

export default function NavLogin({ logStatus }: Prop): React.ReactElement {
  return (
    <div className="nav-login">
      {logStatus ? (
        <>
          <NavLink to="/profile" className="profile-pic">
            <CgProfile />
          </NavLink>
          <Button content="logout" type="outline" />
        </>
      ) : (
        <>
          <Button to="/login" content="login" type="outline" />
        </>
      )}
      <Button to="/find-therapist" content="get started" type="filled" />
    </div>
  );
}
