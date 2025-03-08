import { JSX } from "react";

import { Link } from "react-router-dom";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import Break from "../Break";

const Footer = (): JSX.Element => {
  return (
    <div className="w-full bg-[var(--footer-bg)] p-5">
      <div className="flex flex-col gap-9 justify-around items-center my-15 relative md:flex-row">
        <h1 className="text-xl lg:text-3xl font-extrabold text-[var(--white-text)] text-center md:text-start">
          FIND YOUR MENTAL HEALTH SOLUTION AT THERAFIND
        </h1>
        <Link
          className="btn filled-btn text-2xl font-bold"
          style={{ width: "max-content" }}
          to="/get-started"
        >
          Get Started
        </Link>
      </div>

      <Break />

      <FooterLinks />

      <FooterSocial />
    </div>
  );
};
export default Footer;
