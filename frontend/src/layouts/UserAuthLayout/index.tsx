import { JSX, useEffect } from "react";
import AuthForm from "./AuthForm";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const UserAuthLayout = (): JSX.Element => {
  const location = useLocation();
  const message: string = location.state?.message;

  useEffect(() => {
    document.title = "Login";
    if (message) {
      toast.error(message);
    }
  }, []);

  return (
    <>
      <AuthForm />
    </>
  );
};
export default UserAuthLayout;
