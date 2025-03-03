import { JSX } from "react";
import { navLinks } from "../Navbar/items/link-data";
import logoImage from "./../../assets/images/Logo.png";
import { Link, NavLink } from "react-router-dom";

interface PageLink {
  name: string;
  path: string;
}

const FooterLinks = (): JSX.Element => {
  return (
    <div className="w-full my-15 grid grid-row-2 justify-center gap-10 md:grid-rows-1 md:grid-cols-2 md:gap-0 ">
      <div className="bg-[var(--primary-bg)] p-8 rounded-full max-w-max max-h-max my-auto mx-auto md:p-15">
        <img src={logoImage} alt="logo" className="h-10 w-10 md:h-25 md:w-25" />
      </div>

      <div className="w-full flex justify-center items-center flex-col gap-10 lg:flex-row lg:justify-around lg:items-start">
        <div className="flex flex-col text-xl capitalize text-[var(--link-text)] font-medium max-w-max gap-5 items-center">
          <h1 className="text-[var(--white-text)]">Company</h1>
          <ul className="flex flex-col gap-3 justify-center items-center">
            {navLinks.map(({ name, path }: PageLink, index: number) => (
              <li key={index} className="hover:text-[var(--button)]">
                <NavLink to={path}>{name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className=" flex flex-col text-xl text-[var(--link-text)] font-medium gap-5 items-center justify-center items-center">
          <h1 className="text-[var(--white-text)]">Associate With Us</h1>
          <div className="flex flex-col gap-3 items-center justify-center">
            <Link to="/user/login" className="hover:text-[var(--button)]">
              Register as User
            </Link>
            <Link to="/therapist/login" className="hover:text-[var(--button)]">
              Register as Therapist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FooterLinks;
