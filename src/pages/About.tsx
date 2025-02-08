import React from "react";
import Navbar from "../layouts/Navbar";

export default function About(): React.ReactElement {
  return (
    <div>
      <Navbar />
      <h1 className="top">This is About page</h1>
    </div>
  );
}
