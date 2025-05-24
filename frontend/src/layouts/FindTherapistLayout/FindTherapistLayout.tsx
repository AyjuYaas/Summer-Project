import { JSX, useEffect, useState } from "react";
import Recommendation from "./components/Recommendation";
import OtherTherapist from "./components/OtherTherapist";
import { useUserStore } from "../../store/useUserStore";
import ProblemBar from "../UserDashboardLayout/components/ProblemBar";
import { useMatchStore } from "../../store/useMatchStore";

const FindTherapistLayout = (): JSX.Element => {
  const { preference, getPreference, resetPreference } = useUserStore();
  const { resetRecommendations, resetTherapists } = useMatchStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleProblemBar = () => {
    if (!isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    getPreference();

    return () => {
      resetPreference();
      resetRecommendations();
      resetTherapists();
      document.body.style.overflowY = "visible";
    };
  }, [getPreference, resetPreference, resetRecommendations, resetTherapists]);

  return (
    <>
      {!preference ? (
        <div className="flex min-h-[calc(100vh-6rem)] justify-center items-center text-xl text-main-text">
          Update your Problem field to Start Finding Therapist.
        </div>
      ) : (
        <div className="flex flex-col gap-10 py-10">
          <Recommendation />
          <OtherTherapist />
        </div>
      )}
      {isOpen ? (
        <ProblemBar
          preference={preference}
          toggleProblemBar={toggleProblemBar}
        />
      ) : (
        <button
          onClick={toggleProblemBar}
          className="bg-[#83699d] hover:bg-[#894971] p-4 font-semibold text-white rounded-2xl cursor-pointer duration-100 text-xl absolute bottom-5 right-5"
        >
          Edit Your Problem & Preference
        </button>
      )}
    </>
  );
};
export default FindTherapistLayout;
