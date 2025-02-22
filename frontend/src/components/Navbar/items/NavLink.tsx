import React, { JSX } from "react";
import { NavLink } from "react-router-dom";

import { navLinks } from "./link-data";

import "./../styles/navlink.css";

interface PageLink {
  name: string;
  path: string;
}

interface NavLinkProps {
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PageLink({ setOpenNavbar }: NavLinkProps): JSX.Element {
  return (
    <ul className="nav-links">
      {navLinks.map(({ name, path }: PageLink, index: number) => (
        <li key={index}>
          <NavLink
            to={path}
            className="nav-link-items"
            onClick={() => setOpenNavbar(false)}
          >
            {name}
          </NavLink>
          <hr className="nav-link-hr" />
        </li>
      ))}
    </ul>
  );
}
