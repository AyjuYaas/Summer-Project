import { JSX, useEffect, useRef } from "react";
import { useMatchStore } from "../../../store/useMatchStore";

interface Props {
  toggleRemoveOption: () => void;
  id: string;
  name: string;
}

const ConfirmRemoveRequestPrompt = ({
  toggleRemoveOption,
  id,
  name,
}: Props): JSX.Element => {
  const { loadingRemoveRequest, deleteRequest } = useMatchStore();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        toggleRemoveOption();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleRemoveOption]);

  const sendDeleteQuery = () => {
    deleteRequest(id);
    toggleRemoveOption();
  };

  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 h-screen w-full backdrop-blur-xs flex justify-center items-center self-center justify-self-center">
      <div
        className="relative w-max h-auto bg-white rounded-xl shadow-2xl flex flex-col gap-4"
        ref={menuRef}
      >
        <div className="text-2xl text-center mb-2 px-7 pt-7 text-main-text">
          <h1 className="font-bold ">Remove {name}?</h1>
          <p className="text-sm">Are you sure you remove the request?</p>
        </div>
        <div className="flex gap-2 bg-gray-200 justify-around p-4 rounded-b-xl">
          <button
            className="rounded-xl p-2 px-5 text-main-text hover:underline cursor-pointer"
            onClick={toggleRemoveOption}
          >
            Cancel
          </button>
          <button
            className={`rounded-xl p-2 px-5 text-white ${
              loadingRemoveRequest
                ? "bg-zinc-500 cursor-not-allowed"
                : "bg-red-700 hover:bg-red-600 cursor-pointer"
            } `}
            onClick={sendDeleteQuery}
          >
            {loadingRemoveRequest ? "Removing.." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveRequestPrompt;
