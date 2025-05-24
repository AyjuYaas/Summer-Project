import { JSX, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useMatchStore } from "../../../store/useMatchStore";
import IndividualReview from "../../../components/IndividualReview";
import Masonry from "react-masonry-css";
import TherapistDetails from "./TherapistDetails";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaRegFrownOpen } from "react-icons/fa";
import { matchedTherapists } from "../../../types/match.types";

interface Props {
  therapist: matchedTherapists;
  onClose: () => void;
}

const OpenTherapist = ({ therapist, onClose }: Props): JSX.Element => {
  const {
    selectTherapist,
    loadingSelection,
    reviews,
    getReviews,
    loadingReview,
    resetReviews,
  } = useMatchStore();

  const masonryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getReviews(therapist._id);

    return () => {
      resetReviews();
    };
  }, [getReviews, therapist._id, resetReviews]);

  useEffect(() => {
    const handlePopState = () => {
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose]);

  const scrollToMasonry = () => {
    masonryRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleConnection = async () => {
    await selectTherapist(therapist._id);
    onClose();
  };

  const breakpointColumns =
    reviews.length < 4
      ? {
          default: reviews.length,
          1500: reviews.length,
          900: 2,
          600: 1,
        }
      : {
          default: 4,
          1500: 3,
          900: 2,
          600: 1,
        };

  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 h-screen w-full flex justify-center items-center self-center justify-self-center overflow-y-auto scrollbar">
      <div className="absolute top-0 w-full h-max min-h-screen bg-[#e5e5e5] px-8 py-10 flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center gap-10">
          {/* Therapist Details */}
          <div>
            <TherapistDetails {...therapist} />
          </div>

          <div className="flex gap-5">
            <button
              className={`text-white font-bold px-10 py-3 rounded-4xl duration-150 ${
                loadingSelection
                  ? "cursor-not-allowed bg-[#87a8c1]"
                  : "cursor-pointer bg-[#8b4969] hover:bg-[#2f4858]"
              }`}
              onClick={handleConnection}
            >
              Connect Now
            </button>
            <div
              className="text-2xl flex items-center gap-2 font-bold text-highlight hover:text-green-600 cursor-pointer"
              onClick={scrollToMasonry}
            >
              Reviews <FaChevronCircleDown />
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-cbg-three rounded-2xl text-main-text gap-2 max-w-400 shadow-2xl">
            <div className="flex justify-start px-10 pt-10 pb-5 md:px-15">
              <h1 className="flex flex-col text-3xl sm:text-4xl lg:text-5xl items-start w-full">
                <span className="text-2xl sm:text-3xl lg:text-4xl">User</span>
                <span
                  className="font-bold font-fancy tracking-wider"
                  ref={masonryRef}
                >
                  Reviews
                </span>
              </h1>
            </div>
            {loadingReview ? (
              "Loading..."
            ) : reviews.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex gap-8 px-10 relative max-h-120 h-auto overflow-y-auto scrollbar"
                columnClassName="bg-clip-padding "
              >
                {reviews.map((review, index: number) => (
                  <IndividualReview key={index} {...review} />
                ))}
              </Masonry>
            ) : (
              <div className="text-xl px-10 pb-10 md:px-15 flex items-center gap-3">
                <FaRegFrownOpen size={30} />
                Sorry No Reviews for this Therapist Yet
              </div>
            )}
          </div>
        </div>
        <button
          className="fixed top-4 right-7 bg-main-text text-white size-8 text-2xl flex justify-center items-center rounded-full cursor-pointer hover:bg-red-800"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
export default OpenTherapist;
