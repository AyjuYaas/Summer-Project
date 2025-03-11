import { JSX, useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import { useMatchStore } from "../../../store/useMatchStore";
import { useParams } from "react-router-dom";

const Header = (): JSX.Element => {
  const { matches, getMatches } = useMatchStore();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  const match = matches.find((m) => m._id === id);

  return (
    <div className="w-full text-xl">
      <div className="flex justify-between gap-5">
        <div className="flex gap-2 items-center">
          <img
            src={match?.image}
            alt={match?.name}
            className="size-15 rounded-full object-cover border-2 border-[#45646d]"
          />
          <span className="font-bold text-[#45646d]">{match?.name}</span>
        </div>
        <div className="flex gap-7 text-3xl items-center text-[var(--text)]">
          <span className="cursor-pointer hover:text-[var(--highlight)]">
            <IoIosCall />
          </span>
          <span className="cursor-pointer hover:text-[var(--highlight)]">
            <IoVideocam />
          </span>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};
export default Header;
