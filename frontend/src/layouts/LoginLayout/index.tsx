import { JSX, useEffect } from "react";
import AuthForm from "./AuthForm";

const LoginLayout = (): JSX.Element => {
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <>
      <AuthForm />
    </>
  );
};
export default LoginLayout;
