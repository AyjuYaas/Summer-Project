import { JSX } from "react";
import { BiSolidHappyHeartEyes } from "react-icons/bi";
import StarRating from "../../../components/StarRating";

interface Review {
  name: string;
  rating: number;
  review: string;
}

const IndividualReview = ({ name, rating, review }: Review): JSX.Element => {
  return (
    <section className="bg-primary-bg w-auto h-max overflow-hidden relative p-5 rounded-2xl shadow-xl text-md md:text-xl flex flex-col justify-center cursor-pointer duration-75 my-7 hover:shadow-2xl">
      <div className="flex items-center gap-5 font-bold mb-4">
        <BiSolidHappyHeartEyes className="text-5xl text-yellow-600" />
        <div className="">
          <p>{name}</p>
          <StarRating rating={rating} color="text-footer-bg" />
        </div>
      </div>

      <p>
        <span className="font-bold text-highlight">Review: </span>

        {review}
      </p>
    </section>
  );
};
export default IndividualReview;
