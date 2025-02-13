import React from "react";

import Landing from "./Landing";
import Description from "./Description";
import WhyTheraFind from "./WhyTheraFind";
import Navbar from "../../components/Navbar";

export function HomeLayout(): React.ReactElement {
  return (
    <>
      <Navbar />
      <Landing />
      <Description />
      <WhyTheraFind />
    </>
  );
}
