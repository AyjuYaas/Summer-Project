import { JSX, useEffect } from "react";

import Landing from "./Landing";
import Description from "./Description";
import WhyTheraFind from "./WhyTheraFind";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export function HomeLayout(): JSX.Element {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <Navbar />
      <Landing />
      <Description />
      <WhyTheraFind />
      <Footer />
    </>
  );
}
