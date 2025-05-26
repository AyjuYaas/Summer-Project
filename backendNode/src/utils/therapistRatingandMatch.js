import Match from "../models/match.model.js";
import Review from "../models/review.model.js";

export default async function therapistRatingandMatch(therapistId) {
  const stats = await Review.aggregate([
    // Match reviews for the therapist
    { $match: { therapist: therapistId } },

    // Group to compute average rating and count
    {
      $group: {
        _id: null,
        rating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const matchesCount = await Match.countDocuments({
    therapist: therapistId,
    status: { $in: ["Accept"] }, // Filter as needed
  });

  // Default values if no reviews exist
  const { rating = 0, reviewCount = 0 } = stats[0] || {};

  return {
    rating: parseFloat(rating.toFixed(1)), // Round to 1 decimal
    reviewCount,
    totalMatches: matchesCount,
  };
}
