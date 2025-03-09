import { JSX, useEffect } from "react";

import Landing from "./Landing";
import Description from "./Description";
import WhyTheraFind from "./WhyTheraFind";
import Footer from "../../components/Footer";

const HomeLayout = (): JSX.Element => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <>
      <Landing />
      <Description />
      <WhyTheraFind />
      <Footer />
    </>
  );
};
export default HomeLayout;
