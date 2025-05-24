import { JSX, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useMatchStore } from "../../../store/useMatchStore";
import Masonry from "react-masonry-css";
import { FaRegFrownOpen } from "react-icons/fa";
import IndividualReview from "../../../components/IndividualReview";

interface Props {
  id: string;
  onClose: () => void;
}

const AllReviews = ({ id, onClose }: Props): JSX.Element => {
  const { reviews, getReviews, loadingReview, resetReviews } = useMatchStore();

  const masonryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getReviews(id);

    return () => {
      resetReviews();
    };
  }, [getReviews, id, resetReviews]);

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

  const breakpointColumns =
    reviews.length < 4
      ? {
          default: reviews.length,
          1300: reviews.length,
          1160: 2,
          800: 1,
        }
      : {
          default: 4,
          1300: 3,
          1160: 2,
          800: 1,
        };

  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 h-screen w-full backdrop-blur-xs flex justify-center items-center self-center justify-self-center overflow-y-auto scrollbar">
      <div className="top-0 w-max h-max px-8 py-10 flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <div
            className="relative bg-cbg-three rounded-2xl text-main-text gap-2 max-w-400 w-full shadow-2xl"
            ref={menuRef}
          >
            <div className="flex justify-start px-10 pt-10 pb-5 md:px-15">
              <h1 className="flex flex-col text-3xl sm:text-4xl lg:text-5xl items-start w-full">
                <span className="text-2xl sm:text-3xl lg:text-4xl">Your</span>
                <span
                  className="font-bold font-fancy tracking-wider"
                  ref={masonryRef}
                >
                  User Reviews
                </span>
              </h1>
            </div>
            {loadingReview ? (
              "Loading..."
            ) : reviews.length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex gap-8 px-10 relative max-h-120 h-auto overflow-y-auto scrollbar"
                columnClassName="bg-clip-padding"
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
            <button
              className="absolute top-4 right-4 bg-main-text text-white size-8 text-2xl flex justify-center items-center rounded-full cursor-pointer hover:bg-red-800"
              onClick={onClose}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllReviews;
