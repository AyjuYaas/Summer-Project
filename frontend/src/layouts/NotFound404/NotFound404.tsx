import { JSX } from "react";
import Button from "../../components/Button/Button";
import "./styles.css";

export default function NotFound404(): JSX.Element {
  return (
    <div className="not-found">
      <p>404</p>
      <span>Error Page</span>
      <Button to="/" type="filled" content="Go to Home" />
    </div>
  );
}
