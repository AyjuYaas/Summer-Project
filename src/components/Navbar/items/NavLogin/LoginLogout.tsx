import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Button from "../../../Button/Button";

import "../../styles/navlogin.css";

const LoginLogout = (): React.ReactElement => {
  // ============ Handle Login of User ===============
  const [logStatus, setLogStatus] = useState<boolean>(false); // Starting as logged in for testing
  const changeLogin = () => setLogStatus((prevState) => !prevState);
  return (
    <>
      {logStatus ? (
        <>
          <Link to="/profile" className="profile-pic">
            <CgProfile />
          </Link>
          <span onClick={() => changeLogin()} className="btn-holder">
            <Button content="logout" type="outline" />
          </span>
        </>
      ) : (
        <div onClick={() => changeLogin()} className="btn-holder">
          <Button content="login" type="outline" />
        </div>
      )}
    </>
  );
};
export default LoginLogout;
