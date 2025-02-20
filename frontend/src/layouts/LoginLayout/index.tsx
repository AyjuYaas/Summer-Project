import { JSX, useEffect } from "react";
import LoginForm from "./LoginForm";

const LoginLayout = (): JSX.Element => {
  useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
};
export default LoginLayout;
