import { JSX } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function NotFound404(): JSX.Element {
  return (
    <div className="not-found">
      <p>404</p>
      <span>Error Page</span>
      <Link
        to="/"
        className=" btn filled-btn"
        style={{ fontSize: "2vw", width: "20vw" }}
      >
        Go to home
      </Link>
    </div>
  );
}
