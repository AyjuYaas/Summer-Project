import { JSX, useRef, useState, useEffect } from "react";

import "./styles/navbar.css";

import Logo from "./items/Logo";
import NavLink from "./items/NavLink";
import NavLogin from "./items/NavLogin";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Navbar(): JSX.Element {
  // =========== To stop body from scrolling when navbar is pulled ===========
  const [openNavbar, setOpenNavbar] = useState<boolean>(false);

  // ======== For Handling responsiveness of navbar =========
  const navRef = useRef<HTMLDivElement | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const { authType } = useAuthStore();

  useEffect(() => {
    if (openNavbar) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
    return () => {
      document.body.style.overflowY = "hidden"; // Reset overflow when component unmounts
    };
  }, [openNavbar]);

  useEffect(() => {
    const handleCLickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        setOpenNavbar(false);
      }
    };

    document.addEventListener("click", handleCLickOutside);

    return () => {
      document.removeEventListener("click", handleCLickOutside);
    };
  }, []);

  const toggleNavbar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenNavbar((prev) => !prev);
  };

  return (
    <div className="nav" ref={menuRef}>
      <Link
        to={
          !authType
            ? "/"
            : authType === "user"
            ? "/user/home"
            : "/therapist/home"
        }
        className="nav-logo"
        onClick={openNavbar ? toggleNavbar : () => setOpenNavbar(false)}
      >
        <Logo />
      </Link>

      <div
        ref={navRef}
        className={openNavbar ? "nav-inner responsive-nav" : "nav-inner"}
      >
        <NavLink setOpenNavbar={setOpenNavbar} />
        <NavLogin setOpenNavbar={setOpenNavbar} />
      </div>
      <>
        <div className="menu-icon" onClick={toggleNavbar}>
          {openNavbar ? <MdClose /> : <IoMdMenu />}
        </div>
      </>
    </div>
  );
}
