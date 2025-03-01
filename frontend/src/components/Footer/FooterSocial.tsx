import { JSX } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const FooterSocial = (): JSX.Element => {
  const date = new Date().getFullYear();
  return (
    <div className="w-full mt-30 flex flex-col gap-7 justify-around items-center text-xl capitalize text-[var(--white-text)] font-bold md:flex-row">
      <span className="font-extrabold">Copyright &copy; {date}</span>
      <span>Sayujya Satyal</span>
      <span>BIM 2021, Summer Project</span>

      <div className="flex gap-6 text-4xl text-[var(--link-text)]">
        <a
          href="https://www.facebook.com"
          target="_blank"
          className="hover:text-[var(--button)]"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          className="hover:text-[var(--button)]"
        >
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};
export default FooterSocial;
