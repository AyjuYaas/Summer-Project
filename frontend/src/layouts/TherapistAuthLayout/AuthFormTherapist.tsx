import { JSX, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";

const AuthFormTherapist = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-120 lg:max-w-160 bg-[var(--cbg-four)] p-10 md:p-15 rounded-2xl flex flex-col items-center justify-between shadow-2xl xl:text-xl">
        <h2 className="text-3xl font-bold text-[var(--text)] my-3 mb-10 w-full">
          <p className="xl:text-4xl flex flex-col justify-start items-start gap-1">
            {isLogin ? (
              <>
                <span className="font-light">Login as</span>
                <span className="font-fancy tracking-wider">Therapist </span>
              </>
            ) : (
              <>
                <span className="font-light">Join Us By</span>
                <span className="font-fancy tracking-wider">
                  Creating an Account
                </span>
              </>
            )}
          </p>
        </h2>
        <div className="w-full">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 xl:text-lg">
              {isLogin
                ? "Want to register as a Therapist?"
                : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="cursor-pointer text-[var(--highlight)] mt-2 hover:text-yellow-800 font-medium transition-colors duration-200"
            >
              {isLogin ? "Register Yourself Here" : "Login as Therapist"}
            </button>
          </div>
        </div>
      </div>
      <Link
        to="/user/login"
        className="text-[var(--highlight)] text-center font-bold hover:text-emerald-500 transition-colors duration-200 underline underline-offset-2 mt-10 xl:text-2xl"
      >
        Switch to User Mode?
      </Link>
    </div>
  );
};
export default AuthFormTherapist;
