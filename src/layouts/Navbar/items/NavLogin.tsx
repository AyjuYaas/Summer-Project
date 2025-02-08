import React from "react";
import { NavLink } from "react-router-dom";

import { CgProfile } from "react-icons/cg";

import "../styles/navlogin.css";

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
          <NavLink to="/logout" className="outline-btn nav-btn">
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login" className="outline-btn nav-btn">
            Login
          </NavLink>
        </>
      )}

      <NavLink to="/start" className="filled-btn nav-btn">
        Get Started
      </NavLink>
    </div>
  );
}
