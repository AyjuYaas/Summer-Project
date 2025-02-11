import React, { useState, useEffect, useRef, useCallback } from "react";

import "./styles/navbar.css";

import Logo from "./items/Logo";
import PageLink from "./items/PageLink";
import NavLogin from "./items/NavLogin";
import MobileNav from "./items/MobileNav";

export default function Navbar(): React.ReactElement {
  // ======== For Handling responsiveness of navbar =========
  const navRef = useRef<HTMLDivElement | null>(null);

  const showNavbar = () => {
    navRef.current?.classList.toggle("responsive-nav");
  };

  // =========== To change the style while scrolling ===========
  const [scrolling, setScrolling] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    if (scrolling !== isScrolled) {
      setScrolling(isScrolled);
    }
  }, [scrolling]);

  console.log("rendering");
  return (
    <div className={scrolling ? "nav nav-scroll" : "nav"}>
      <Logo />

      <div ref={navRef} className="nav-inner">
        <PageLink />
        <NavLogin />
      </div>

      <MobileNav showNavbar={showNavbar} />
    </div>
  );
}
