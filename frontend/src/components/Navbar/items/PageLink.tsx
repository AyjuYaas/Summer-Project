import { JSX } from "react";
import { NavLink } from "react-router-dom";

import { pageLinks } from "./link-data";

import "./../styles/pagelink.css";

interface PageLink {
  name: string;
  link: string;
}

export default function PageLink(): JSX.Element {
  return (
    <ul className="nav-links">
      {pageLinks.map(({ name, link }: PageLink, index: number) => (
        <li key={index}>
          <NavLink to={link} className="nav-link-items">
            {name}
          </NavLink>
          <hr className="nav-link-hr" />
        </li>
      ))}
    </ul>
  );
}
