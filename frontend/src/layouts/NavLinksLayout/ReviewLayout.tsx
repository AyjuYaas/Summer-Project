import { JSX } from "react";
import Footer from "../../components/Footer";
import reviews from "./data/reviews";
import IndividualReview from "./data/IndividualReview";

const ReviewLayout = (): JSX.Element => {
  return (
    <div>
      <div className="text-xl md:text-3xl font-bold text-center mt-10 text-[var(--text)]">
        <h1>
          Hear from Some of Our{" "}
          <span style={{ color: "var(--highlight)" }}>Satisfied</span> Users:
        </h1>
      </div>
      <div className="p-5 md:p-10 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center min-h-70 gap-8">
        {reviews.map((reviewer, index: number) => (
          <IndividualReview
            key={index}
            name={reviewer.name}
            rating={reviewer.rating}
            review={reviewer.review}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};
export default ReviewLayout;
