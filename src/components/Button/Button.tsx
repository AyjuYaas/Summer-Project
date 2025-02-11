import React from "react";
import "./button.css";
import { Link } from "react-router-dom";

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
  return (
    <>
      {to ? (
        <Link to={to} className={type + "-btn btn"}>
          {content}
        </Link>
      ) : (
        <div className={type + "-btn btn"}>{content}</div>
      )}
    </>
  );
}
