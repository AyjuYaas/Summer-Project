import { JSX, useEffect } from "react";
import AuthFormTherapist from "./AuthFormTherapist";

const TherapistAuthLayout = (): JSX.Element => {
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <>
      <AuthFormTherapist />
    </>
  );
};
export default TherapistAuthLayout;
