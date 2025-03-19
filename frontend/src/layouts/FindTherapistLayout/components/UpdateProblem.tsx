import { JSX, useEffect, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import ProblemBar from "../../UserDashboardLayout/components/ProblemBar";

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

const UpdateProblem = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { authUser } = useAuthStore();

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "visible";
  }, [isOpen]);

  const toggleProblemBar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="h-full flex justify-end items-end">
      {isOpen ? (
        <ProblemBar
          problemText={(authUser as unknown as User).problemText}
          toggleProblemBar={toggleProblemBar}
        />
      ) : (
        <button
          onClick={toggleProblemBar}
          className="bg-footer-bg text-white hover:bg-[#42604c] p-4 font-semibold rounded-2xl cursor-pointer duration-100 text-xl fixed bottom-4 right-4 w-max"
        >
          Edit Your Problem
        </button>
      )}
    </div>
  );
};
export default UpdateProblem;
