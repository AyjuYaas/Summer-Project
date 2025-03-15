import "./VideoToast.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMessageStore } from "../../store/useMessageStore";
import { FaPhone } from "react-icons/fa";

interface Match {
  id: string;
  image: string;
  name: string;
}

interface CustomToastProps {
  t: any; // This could be the toast object or a type like `Toast` if it's available from the toast package
  match: Match;
  message: string;
  senderLink: string;
}

const VideoToast: React.FC<CustomToastProps> = ({
  t,
  match,
  message,
  senderLink,
}) => {
  const navigate = useNavigate();
  const { getVideoToken } = useMessageStore();

  const handleOpenVideoCall = () => {
    getVideoToken(match.id || "");
    toast.dismiss(t.id); // Dismiss the toast immediately
    navigate(senderLink);
  };

  const handleClose = () => {
    toast.dismiss(t.id); // Dismiss the toast immediately
  };

  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-[var(--cbg-two)] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div
        className="flex-1 w-0 p-4 cursor-pointer flex items-center"
        onClick={handleOpenVideoCall}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full bg-white"
              src={match?.image}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{match?.name}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="call-icon-container">
        <FaPhone className="call-icon rotate-shake" />
      </div>
      <div
        className="flex border-l border-gray-200 cursor-pointer"
        onClick={handleClose}
      >
        <button className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center cursor-pointer justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default VideoToast;
