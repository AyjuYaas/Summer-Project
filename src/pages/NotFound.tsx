import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <p>404</p>
      <span>Error Page</span>
      <button className="filled-btn" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
}
