import { JSX } from "react";
import reviews from "../data/reviews";
import IndividualReview from "./IndividualReview";
import Masonry from "react-masonry-css";

const ReviewLayout = (): JSX.Element => {
  const breakpointColumns = {
    default: 4,
    1500: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className="bg-cbg-four rounded-[40px] sm:rounded-[80px] text-main-text gap-2 pb-10 md:pb-15 max-w-300 shadow-2xl">
      <div className="flex justify-start px-10 pt-10 md:px-15 md:pt-15">
        <h1 className="flex flex-col text-3xl sm:text-4xl lg:text-5xl items-start">
          <span className="text-2xl sm:text-3xl lg:text-4xl">Hear from</span>
          <span className="font-bold font-fancy tracking-wider">
            Our Clients
          </span>
        </h1>
      </div>

      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-8 px-10 relative"
        columnClassName="bg-clip-padding"
      >
        {reviews.map((reviewer, index: number) => (
          <IndividualReview
            key={index}
            name={reviewer.name}
            rating={reviewer.rating}
            review={reviewer.review}
          />
        ))}
      </Masonry>
    </div>
  );
};
export default ReviewLayout;
