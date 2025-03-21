import { JSX, useState } from "react";
import { FaGrinStars } from "react-icons/fa";
import AllReviews from "./components/AllReviews";

interface Props {
  id: string;
  image: string;
  name: string;
  reviewCount: number;
}

const WelcomeTherapist = ({
  id,
  image,
  name,
  reviewCount,
}: Props): JSX.Element => {
  const [openReview, setOpenReview] = useState<boolean>(false);
  return (
    <div className="text-3xl lg:text-4xl flex flex-col md:flex-row justify-between w-full text-main-text font-semibold items-center gap-5">
      <div className="flex gap-5">
        <img
          src={image}
          alt="profile-pic"
          className="size-30 rounded-full bg-white"
        />
        <div className="flex flex-col justify-center items-center md:items-start">
          <span>Welcome,</span>
          <span className="font-fancy tracking-wider">{name}</span>
          <span className="text-lg flex items-center gap-1">
            <FaGrinStars className="text-main-text" />
            Total Reviews: {reviewCount}
          </span>
        </div>
      </div>
      <div>
        <button
          className="bg-cbg-one p-5 text-xl rounded-4xl font-bold shadow-2xl hover:bg-[#7fc3d2] cursor-pointer relative hover:-translate-y-2 transition-all duration-250 ease-in-out"
          onClick={() => setOpenReview(true)}
        >
          View Your Reviews
        </button>
      </div>

      {openReview && (
        <AllReviews id={id} onClose={() => setOpenReview(false)} />
      )}
    </div>
  );
};
export default WelcomeTherapist;
