import { JSX, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useMatchStore } from "../../../store/useMatchStore";

interface RequestingUser {
  _id: string;
  name: string;
  gender: string;
  image: string;
  problemText: string;
  requestId: string;
}

interface Props {
  user: RequestingUser;
  onClose: () => void;
}

const OpenRequestingUser = ({ user, onClose }: Props): JSX.Element => {
  const { respondRequest } = useMatchStore();

  const handleResponse = async (response: string) => {
    respondRequest(user.requestId, response);

    onClose();
  };

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
        className="relative w-max h-auto bg-[var(--cbg-two)] px-8 py-10 rounded-4xl flex flex-col gap-5 items-center"
        ref={menuRef}
      >
        <div className="flex gap-12 text-xl font-bold text-[var(--text)] justify-center items-center">
          <div className="flex flex-col gap-2 items-center ">
            {/* image  */}
            <img
              src={user.image}
              alt={`${user.name}-img`}
              className="size-19 md:size-30 rounded-full object-"
            />

            {/* Name */}
            <span className="text-center text-[var(--highlight)]">
              {user.name}
            </span>

            {/* Gender */}
            <span className="font-medium">{user.gender}</span>
          </div>

          {/* Problem Statement */}
          <div className="flex flex-col p-3">
            <span className="text-[var(--highlight)]">
              Their Problem Description
            </span>{" "}
            <span className="font-medium bg-white p-2 rounded-xl min-h-20">
              {user.problemText}
            </span>
          </div>
        </div>

        <div className="w-full flex justify-around">
          <button
            className={`text-white font-bold px-10 py-3 rounded-4xl duration-150 cursor-pointer bg-green-600 hover:bg-green-500`}
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
      </div>
      <button
        className="absolute top-4 right-4 bg-[var(--text)] text-white size-8 text-2xl flex justify-center items-center rounded-full cursor-pointer"
        onClick={onClose}
      >
        <IoMdClose />
      </button>
    </div>
  );
};
export default OpenRequestingUser;
