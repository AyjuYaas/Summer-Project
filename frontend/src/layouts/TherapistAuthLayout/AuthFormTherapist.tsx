import { JSX, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";

const AuthFormTherapist = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col justify-center items-center p-4 bg-[var(--primary-bg)]">
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-bold text-[var(--text)] my-3">
          {isLogin ? (
            <p>
              Login as{" "}
              <span className="text-[var(--highlight-two)]">Therapist</span>
            </p>
          ) : (
            <p>
              Register as an{" "}
              <span className="text-[var(--highlight-two)]">Therapist</span>
            </p>
          )}
        </h2>
        <div className="p-8">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              {isLogin
                ? "Want to register as a Therapist?"
                : "Already have an account?"}
            </p>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="cursor-pointer text-[var(--highlight-two)] mt-2 hover:text-orange-400 font-medium transition-colors duration-200"
            >
              {isLogin ? "Register Yourself Here" : "Login as Therapist"}
            </button>
          </div>
        </div>
      </div>
      <Link
        to="/user/login"
        className="text-[var(--highlight)] font-bold hover:text-emerald-500 transition-colors duration-200 underline underline-offset-2"
      >
        Switch to User Mode?
      </Link>
    </div>
  );
};
export default AuthFormTherapist;
