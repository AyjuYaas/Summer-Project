import { JSX, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useMatchStore } from "../../../store/useMatchStore";
import { RequestingUser } from "../../../types/match.types";
import { axiosInstance } from "../../../lib/Axios";

interface Props {
  user: RequestingUser;
  onClose: () => void;
}

interface UserPreference {
  preferredGender: string;
  preferredLanguage: string;
  problemText: string;
  predictedProblems: string[];
}

const OpenRequestingUser = ({ user, onClose }: Props): JSX.Element => {
  const { respondRequest } = useMatchStore();

  const handleResponse = async (response: string) => {
    respondRequest(user.requestId, response);

    onClose();
  };

  const [userPreference, setUserPreference] = useState<UserPreference>({
    preferredGender: "",
    preferredLanguage: "",
    problemText: "",
    predictedProblems: [],
  });

  useEffect(() => {
    const getUserPreference = async () => {
      try {
        const res = await axiosInstance.get(
          `/matches/user-preference/${user._id}`
        );
        setUserPreference(res.data.preference);
      } catch (error) {
        console.error("Error fetching user preference:", error);
      }
    };

    getUserPreference();
  }, [user]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCLickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleCLickOutside);

    return () => {
      document.removeEventListener("mousedown", handleCLickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 h-screen w-full backdrop-blur-xs flex justify-center items-center self-center justify-self-center">
      <div
        className="relative w-auto sm:w-max h-auto bg-cbg-one px-2 py-10 rounded-lg shadow-2xl flex flex-col gap-3 items-center"
        ref={menuRef}
      >
        <div className="flex flex-col  gap-2 text-xl font-bold text-main-text justify-center items-center">
          <div className="flex flex-col gap-2 items-center min-w-50 w-auto">
            {/* image  */}
            <img
              src={user.image}
              alt={`${user.name}-img`}
              className="size-19 md:size-30 rounded-full object-cover bg-white border-3 border-main-text"
            />

            {/* Name */}
            <span className="text-center text-highlight">
              <span className="text-[#894971]">{user.name}</span> sent you a
              request
            </span>

            {/* Gender */}
            <div className="font-medium">
              <span className="font-bold">Gender: </span>
              {user.gender}
            </div>
          </div>

          <div className="self-start px-3">
            <div className="text-2xl">
              <h1>User Preferences</h1>
            </div>

            <div>
              <h1 className="text-highlight">
                Preferred Language:{" "}
                <span className="font-medium text-main-text">
                  {userPreference.preferredLanguage}
                </span>
              </h1>

              <h1 className="text-highlight">
                Preferred Gender:{" "}
                <span className="font-medium text-main-text">
                  {userPreference.preferredGender}
                </span>
              </h1>
            </div>
          </div>

          {/* Problem Statement */}
          <div className="flex flex-col p-3 max-w-180 w-auto">
            <span className="text-2xl">Their Problem Description</span>{" "}
            <span className="font-medium bg-white p-2 rounded-xl min-h-20 w-full  h-50 overflow-y-auto">
              {userPreference.problemText}
            </span>
          </div>
        </div>

        <div className="w-full flex justify-around">
          <button
            className={`text-white font-bold px-10 py-3 rounded-4xl duration-150 cursor-pointer bg-[#45646d] hover:bg-[#628182]`}
            onClick={() => handleResponse("Accept")}
          >
            Accept
          </button>
          <button
            className={`text-white font-bold px-10 py-3 rounded-4xl duration-150 cursor-pointer bg-[#8b4969] hover:bg-red-700`}
            onClick={() => handleResponse("Reject")}
          >
            Reject
          </button>
        </div>
        <button
          className="absolute top-5 right-4 bg-main-text text-white size-8 text-2xl flex justify-center items-center rounded-full cursor-pointer hover:bg-red-700 duration-75"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
export default OpenRequestingUser;
