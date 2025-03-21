import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

const StarRating = memo(
  ({
    rating,
    color,
    colorEmpty,
  }: {
    rating: number;
    color: string;
    colorEmpty?: string;
  }) => {
    const fullStars = Math.floor(rating); // Get the number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
      <div className="flex">
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} className={`${color}`} />
        ))}

        {/* Render half star if applicable */}
        {hasHalfStar && <FaStarHalfStroke key="half" className={`${color}`} />}

        {/* Render empty stars (optional for UI balance) */}
        {[...Array(emptyStars)].map((_, index) => (
          <FaStar
            key={`empty-${index}`}
            className={`${colorEmpty || "text-gray-300"}`}
          />
        ))}
      </div>
    );
  }
);

export default StarRating;
