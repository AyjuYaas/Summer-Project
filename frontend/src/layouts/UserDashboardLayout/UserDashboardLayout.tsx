import { useAuthStore } from "../../store/useAuthStore";
import Connections from "./Connections";
import PredictedProblem from "./PredictedProblem";
import { Link } from "react-router-dom";
import WelcomeUser from "./WelcomeUser";

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
  const { authUser } = useAuthStore();

  return (
    <div className="flex flex-col px-5 md:px-20 py-5 gap-10 text-main-text relative">
      <div className="flex flex-col gap-10 md:flex-row justify-between items-center">
        <WelcomeUser
          image={authUser?.image || ""}
          name={authUser?.name || ""}
        />

        <Link
          to="/user/find-therapist"
          className="w-max h-max p-5 rounded-2xl bg-cbg-two hover:bg-[#8b4969] hover:text-white text-xl font-semibold transition-colors duration-150 text-center"
        >
          Start Exploring Therapists
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 pb-10">
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
