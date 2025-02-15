import { JSX, useState } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Button from "../../../Button/Button";

import "../../styles/navlogin.css";

const LoginLogout = (): JSX.Element => {
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
          <button onClick={() => changeLogin()} className="btn-holder">
            <Button content="logout" type="outline" />
          </button>
        </>
      ) : (
        <Button to="/login" content="login" type="outline" />
      )}
    </>
  );
};
export default LoginLogout;
