import { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/navlogin.css";
import { useAuthStore } from "../../../../store/useAuthStore";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import defaultImage from "../../../../assets/images/default-profile.jpg";

const LoginLogout = (): JSX.Element => {
  // ============ Handle Login of User ===============
  const { authUser, authType, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      {authUser ? (
        <div className="logout-menu">
          <Link
            to={
              authType === "user"
                ? "/user/home"
                : authType === "therapist"
                ? "/therapist/home"
                : "/admin/home"
            }
            className="profile-pic-div"
          >
            <img
              src={authUser.image || defaultImage}
              alt="profile-pic"
              className="profile-pic"
            />
          </Link>
          <div className="profile-buttons">
            <Link
              to={
                authType === "user"
                  ? "/user/update-profile"
                  : authType === "therapist"
                  ? "/therapist/update-profile"
                  : "/admin/update-profile"
              }
              className={`btn filled-btn `}
              aria-label="profile settings"
            >
              <RiUserSettingsFill />
            </Link>
            <button
              className="btn outline-btn"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <IoLogOut />
            </button>
          </div>
        </div>
      ) : (
        <>
          <Link to="/user/login" className="btn outline-btn">
            Login
          </Link>
          <Link to="/get-started" className="btn filled-btn">
            Get Started
          </Link>
        </>
      )}
    </>
  );
};

export default LoginLogout;
