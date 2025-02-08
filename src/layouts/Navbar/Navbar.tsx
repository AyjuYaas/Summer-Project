import React, { useState, useEffect, useRef } from "react";

import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";

import "./styles/Navbar.css";

import Logo from "./items/Logo";
import PageLink from "./items/PageLink";
import NavLogin from "./items/NavLogin";

export default function Navbar(): React.ReactElement {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isBodyOverflowHidden, setIsBodyOverflowHidden] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const logStatus = true;

  useEffect(() => {
    if (isBodyOverflowHidden) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible"; // Reset overflow when component unmounts
    };
  }, [isBodyOverflowHidden]);
  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive-nav");
    setIsBodyOverflowHidden((prevState) => !prevState);
  };

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

  return (
    <div className={scrolling ? "nav nav-scroll" : "nav"}>
      <Logo />

      <div ref={navRef} className="nav-inner">
        <PageLink />
        <NavLogin logStatus={logStatus} />
      </div>

      <button className="mobile-menu" onClick={showNavbar}>
        {isBodyOverflowHidden ? <MdClose /> : <IoMdMenu />}
      </button>
    </div>
  );
}
