import { JSX, useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import RemoveTherapist from "./RemoveTherapist";

interface Props {
  id: string;
  image: string;
  name: string;
}

const IndividualMessage = ({ id, image, name }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);

  const toggleRemoveOption = () => {
    setRemoveOpen(!removeOpen);
    setIsOpen(false);
  };

  return (
    <div className="flex gap-3 items-center justify-center mb-5 hover:bg-[#aabbae] p-2 rounded-xl transition-colors duration-200 cursor-pointer">
      <Link to={`/chat/${id}`} className="w-full">
        <div className="flex items-center gap-3 w-full pr-5">
          <img
            src={image}
            alt={`${name}'s avatar`}
            className="size-12 object-cover rounded-full border-2 bg-white"
          />
          <h2 className="font-semibold text-[var(--text)] text-xl">{name}</h2>
        </div>
      </Link>

      <div className="relative h-full flex items-center justify-center">
        {/* Settings Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl rounded-full cursor-pointer hover:bg-[var(--text)]"
        >
          <BsThreeDots className="hover:text-white" />
        </button>
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-8 w-45 bg-red-700 text-white rounded-lg shadow-xl z-10 text-lg">
            <ul>
              <button
                className="p-2 hover:bg-red-600 cursor-pointer rounded-lg w-full text-start"
                onClick={toggleRemoveOption}
              >
                Remove Therapist
              </button>
            </ul>
          </div>
        )}
      </div>
      {removeOpen && (
        <RemoveTherapist
          toggleRemoveOption={() => setRemoveOpen(false)}
          id={id}
        />
      )}
    </div>
  );
};
export default IndividualMessage;
