import { JSX, useEffect } from "react";
import { IoVideocam } from "react-icons/io5";
import { useMatchStore } from "../../../store/useMatchStore";
import { useParams } from "react-router-dom";
import { useMessageStore } from "../../../store/useMessageStore";
import { useNavigate } from "react-router-dom";

const Header = (): JSX.Element => {
  const { matches, getMatches } = useMatchStore();
  const { getVideoToken } = useMessageStore();
  const navigate = useNavigate();

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    getMatches();
  }, [getMatches]);

  const openVideoCall = () => {
    getVideoToken(id || "");
    navigate(`/video-call/${id}`);
  };

  const match = matches.find((m) => m._id === id);

  return (
    <div className="w-full text-xl px-4 pt-4">
      <div className="flex justify-between gap-5">
        <div className="flex gap-2 items-center">
          <img
            src={match?.image}
            alt={match?.name}
            className="size-15 rounded-full object-cover border-2 border-[#45646d] bg-white"
          />
          <span className="font-bold text-[#45646d]">{match?.name}</span>
        </div>
        <div className="flex gap-5 text-3xl items-center text-main-text">
          <span
            className="cursor-pointer hover:text-highlight"
            onClick={openVideoCall}
          >
            <IoVideocam />
          </span>
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
};
export default Header;
