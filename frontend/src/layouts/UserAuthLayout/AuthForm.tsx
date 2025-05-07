import { JSX, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";

const AuthForm = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-120 lg:max-w-160 bg-cbg-five p-10 md:p-15 rounded-2xl flex flex-col items-center justify-between shadow-2xl xl:text-xl">
        <div className="text-4xl font-bold text-main-text my-3 mb-3 w-full">
          <p className="flex flex-col justify-start items-start gap-1">
            {isLogin ? (
              <>
                <span className="font-light">Login to</span>
                <span className="font-fancy tracking-wider">TheraFind</span>
              </>
            ) : (
              <>
                <span className="font-light">Register by</span>
                <span className="font-fancy tracking-wider">
                  Creating an Account
                </span>
              </>
            )}
          </p>
        </div>
        <div className="w-full">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 xl:text-lg">
              {isLogin ? "New to Therafind?" : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="cursor-pointer text-highlight mt-2 hover:text-yellow-800 font-medium transition-colors duration-200"
            >
              {isLogin ? "Create a new account" : "Login to your account"}
            </button>
          </div>
        </div>
      </div>
      <Link
        to="/therapist/login"
        className="text-highlight text-center font-bold hover:text-emerald-500 transition-colors duration-200 underline underline-offset-2 mt-5 xl:text-lg"
      >
        Switch to Therapist Mode?
      </Link>
    </div>
  );
};
export default AuthForm;
