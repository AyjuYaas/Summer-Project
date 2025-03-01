import { JSX } from "react";
import { BiSolidHappyHeartEyes } from "react-icons/bi";
import StarRating from "../../../components/StarRating";

interface Review {
  name: string;
  rating: number;
  review: string;
}

const IndividualReview = ({ name, rating, review }: Review): JSX.Element => {
  const words = review.split(" ");
  const wordLimit = 15;
  return (
    <section className="bg-[var(--secondary-bg)] w-auto h-50 overflow-hidden p-5 rounded-2xl shadow-xl text-md md:text-xl flex flex-col justify-center hover:scale-102 cursor-pointer duration-75">
      <div className="flex items-center gap-5 font-bold mb-4">
        <BiSolidHappyHeartEyes className="text-5xl text-yellow-600" />
        <div className="">
          <p>{name}</p>
          <StarRating rating={rating} color="[var(--highlight-two)]" />
        </div>
      </div>

      <p>
        <span className="font-bold text-[var(--highlight)]">Review: </span>
        {words.length > wordLimit
          ? `${words.slice(0, wordLimit).join(" ")}...`
          : review}
      </p>
    </section>
  );
};
export default IndividualReview;
