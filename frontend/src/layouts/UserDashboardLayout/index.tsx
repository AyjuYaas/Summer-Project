import { useAuthStore } from "../../store/useAuthStore";
import WelcomeUser from "./WelcomeUser";
import Connections from "./Connections";
import PredictedProblem from "./PredictedProblem";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Problems {
  problem: string;
  score: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  imagePublicId: string;
  problemText: string;
  problems: Problems[];
  selected_therapists: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const UserDashboardLayout = () => {
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth;
  }, [checkAuth]);

  return (
    <div className="flex flex-col px-5 md:px-20 py-10 gap-10 text-[var(--text)] relative">
      <div className="flex flex-col gap-10 md:flex-row justify-between items-center">
        <WelcomeUser
          image={authUser?.image || ""}
          name={authUser?.name || ""}
        />

        <Link
          to="/"
          className="w-max h-max p-5 rounded-2xl bg-[var(--button)] text-xl font-semibold hover:bg-emerald-900 hover:text-white transition-colors duration-150"
        >
          Start Exploring Therapists
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-20">
        <Connections />

        <PredictedProblem
          problems={(authUser as unknown as User).problems}
          problemText={(authUser as unknown as User).problemText}
        />
      </div>
    </div>
  );
};
export default UserDashboardLayout;
