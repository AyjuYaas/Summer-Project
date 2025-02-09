import React from "react";
import Navbar from "../layouts/Navbar";
import Landing from "../layouts/Home/Landing";
import Description from "../layouts/Home/Description";

export default function Home(): React.ReactElement {
  return (
    <div>
      <Navbar />
      <Landing />
      <Description />
    </div>
  );
}
