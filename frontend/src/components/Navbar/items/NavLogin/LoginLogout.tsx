import { JSX } from "react";
import { Link } from "react-router-dom";

import "../../styles/navlogin.css";
import { useAuthStore } from "../../../../store/useAuthStore";

const LoginLogout = (): JSX.Element => {
  // ============ Handle Login of User ===============
  const { authUser, authType, logout } = useAuthStore();
  return (
    <>
      {authUser ? (
        <div className="logout-menu">
          <Link
            to={authType === "user" ? "/user/home" : "/therapist/home"}
            className="profile-pic-div"
          >
            <img
              src={authUser.image}
              alt="profile-pic"
              className="profile-pic"
            />
          </Link>
          <button className="btn outline-btn logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/user/login" className="btn outline-btn">
          Login
        </Link>
      )}
    </>
  );
};
export default LoginLogout;
