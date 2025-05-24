import { memo, useRef, useEffect, useCallback, JSX } from "react";
import "./styles/navbar.css";
import Logo from "./items/Logo";
import NavLink from "./items/NavLink";
import NavLogin from "./items/NavLogin";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

type NavbarProps = {
  openNavbar: boolean;
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = memo(function Navbar({
  openNavbar,
  setOpenNavbar,
}: NavbarProps): JSX.Element {
  const navRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const authType = useAuthStore((state) => state.authType); // Optimized selector

  // Memoized toggle function
  const toggleNavbar = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpenNavbar((prev) => !prev);
    },
    [setOpenNavbar]
  );

  useEffect(() => {
    document.body.style.overflowY = openNavbar ? "hidden" : "visible";
    return () => {
      document.body.style.overflowY = "visible";
    };
  }, [openNavbar]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        setOpenNavbar(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenNavbar]);

  return (
    <div className="nav" ref={menuRef}>
      <Link
        to={
          !authType
            ? "/"
            : authType === "user"
            ? "/user/home"
            : authType === "therapist"
            ? "/therapist/home"
            : "/admin/home"
        }
        className="nav-logo"
        onClick={openNavbar ? toggleNavbar : () => setOpenNavbar(false)}
      >
        <Logo />
      </Link>

      <div
        ref={navRef}
        className={`${openNavbar ? "nav-inner responsive-nav" : "nav-inner"}`}
      >
        <NavLink setOpenNavbar={setOpenNavbar} />
        <NavLogin setOpenNavbar={setOpenNavbar} />
      </div>

      <div className="menu-icon" onClick={toggleNavbar}>
        {openNavbar ? <MdClose /> : <IoMdMenu />}
      </div>
    </div>
  );
});

export default Navbar;
