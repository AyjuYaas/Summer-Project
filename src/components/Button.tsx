import React from "react";
import "./../assets/styles/button.css";
import { NavLink, useNavigate } from "react-router-dom";

interface Prop {
  content: string;
  type: string;
  to?: string;
}
export default function Button({
  content,
  type,
  to,
}: Prop): React.ReactElement {
  const navigate = useNavigate();
  return (
    <>
      {to ? (
        <NavLink to={to} className={type + "-btn btn"}>
          {content}
        </NavLink>
      ) : (
        <span className={type + "-btn btn"} onClick={() => navigate("/")}>
          {content}
        </span>
      )}
    </>
  );
}
