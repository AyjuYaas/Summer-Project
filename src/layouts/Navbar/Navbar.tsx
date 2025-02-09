import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";

import "./styles/navbar.css";

import Logo from "./items/Logo";
import PageLink from "./items/PageLink";
import NavLogin from "./items/NavLogin";

export default function Navbar(): React.ReactElement {
  // const navigate = useNavigate();

  // ======== For Handling responsiveness of navbar =========
  const navRef = useRef<HTMLDivElement | null>(null);

  // =========== To stop body from scrolling when navbar is pulled ===========
  const [isBodyOverflowHidden, setIsBodyOverflowHidden] =
    useState<boolean>(false);

  useEffect(() => {
    if (isBodyOverflowHidden) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
    return () => {
      document.body.style.overflowY = "visible"; // Reset overflow when component unmounts
    };
  }, [isBodyOverflowHidden]);

  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive-nav");
    setIsBodyOverflowHidden((prevState) => !prevState);
  };

  // =========== To change the style while scrolling ===========
  const [scrolling, setScrolling] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  // ============ Handle Login of User ===============
  const [logStatus, setLogStatus] = useState<boolean>(true); // Starting as logged in for testing

  return (
    <div className={scrolling ? "nav nav-scroll" : "nav"}>
      <Logo />

      <div ref={navRef} className="nav-inner">
        <PageLink />
        <span onClick={(prev) => setLogStatus(!prev)}>
          <NavLogin logStatus={logStatus} />
        </span>
      </div>

      <button className="mobile-menu" onClick={showNavbar}>
        {isBodyOverflowHidden ? <MdClose /> : <IoMdMenu />}
      </button>
    </div>
  );
}
