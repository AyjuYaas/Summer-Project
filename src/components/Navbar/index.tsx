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

  console.log("render nav");
  return (
    <div className="nav">
      <Logo />

      <div ref={navRef} className="nav-inner">
        <PageLink />
        <NavLogin />
      </div>

      <MobileNav showNavbar={showNavbar} />
    </div>
  );
}
