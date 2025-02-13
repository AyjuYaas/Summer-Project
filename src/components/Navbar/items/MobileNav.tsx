import React, { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";

interface Prop {
  showNavbar: () => void;
}

const MobileNav = ({ showNavbar }: Prop): React.ReactElement => {
  // =========== To stop body from scrolling when navbar is pulled ===========
  const [isBodyOverflowHidden, setIsBodyOverflowHidden] =
    useState<boolean>(false);

  useEffect(() => {
    if (isBodyOverflowHidden) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
    return () => {
      document.body.style.overflowY = "visible"; // Reset overflow when component unmounts
    };
  }, [isBodyOverflowHidden]);

  const menuIconSwitch = () => {
    setIsBodyOverflowHidden((prevState) => !prevState);
    showNavbar();
  };

  return (
    <button className="mobile-menu" onClick={menuIconSwitch}>
      {isBodyOverflowHidden ? <MdClose /> : <IoMdMenu />}
    </button>
  );
};
export default MobileNav;
