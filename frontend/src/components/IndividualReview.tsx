import StarRating from "./StarRating";

interface Review {
  _id: string;
  user: { name: string; image: string };
  therapist: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

const IndividualReview = (review: Review) => {
  return (
    <div className="bg-[#2f4858] min-w-75 h-max overflow-hidden relative p-5 rounded-2xl gap-3 shadow-xl text-base md:text-xl flex flex-col justify-center cursor-pointer duration-75 my-7 hover:shadow-2xl">
      <div className="flex items-center justify-start gap-3">
        <img
          src={review.user.image}
          alt=""
          className="size-12 bg-white rounded-full"
        />
        <div>
          <p className="font-bold text-white">
            {review.user.name.split(" ")[0]}
          </p>
          <StarRating rating={review.rating} color="text-yellow-400" />
        </div>
      </div>
      <p className="text-lg text-left text-white">
        <span className="font-bold text-[#d09998]">Review: </span>
        {review.reviewText}
      </p>
    </div>
  );
};
export default IndividualReview;
