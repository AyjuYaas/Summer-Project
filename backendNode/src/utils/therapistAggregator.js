import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const buildTherapistAggregation = ({
  matchedTherapistIds,
  preferredLanguage,
  preferredGender,
  predictedProblemList,
  scoringWeights,
  qualificationWeights,
}) => {
  const qualificationBranches = Object.entries(qualificationWeights).map(
    ([qual, weight]) => ({
      case: { $eq: ["$$qual", qual] },
      then: weight,
    })
  );

  return [
    {
      $match: {
        _id: { $nin: matchedTherapistIds.map((id) => new ObjectId(id)) },
        availability: true,
        validationStatus: "approved",
      },
    },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "therapist",
        as: "reviewData",
      },
    },
    {
      $lookup: {
        from: "matches",
        let: { therapistId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$therapist", "$$therapistId"] },
                  { $eq: ["$status", "Accept"] },
                ],
              },
            },
          },
        ],
        as: "matchData",
      },
    },
    {
      $addFields: {
        languageMatch: {
          $cond: [
            { $in: [preferredLanguage, "$languages"] },
            scoringWeights.languageMatch,
            0,
          ],
        },
        genderMatch: {
          $cond: [
            { $eq: [preferredGender, "Any"] },
            0,
            {
              $cond: [
                { $eq: ["$gender", preferredGender] },
                scoringWeights.genderMatch,
                0,
              ],
            },
          ],
        },
        experienceScore: {
          $multiply: [
            { $ln: { $add: ["$experience", 1] } },
            scoringWeights.experiencePerYear,
          ],
        },
        specializationMatch: {
          $cond: [
            {
              $gt: [
                {
                  $size: {
                    $setIntersection: ["$specialization", predictedProblemList],
                  },
                },
                0,
              ],
            },
            scoringWeights.predictedProblemMatch,
            0,
          ],
        },
        avgRating: {
          $ifNull: [{ $avg: "$reviewData.rating" }, 0],
        },
        ratingCount: {
          $size: "$reviewData",
        },
        totalMatches: {
          $size: "$matchData",
        },
        qualificationScore: {
          $sum: {
            $map: {
              input: "$qualification",
              as: "qual",
              in: {
                $switch: {
                  branches: qualificationBranches,
                  default: 0,
                },
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        ratingScore: {
          $multiply: ["$avgRating", scoringWeights.ratingMultiplier || 1],
        },
        matchScore: {
          $multiply: ["$totalMatches", scoringWeights.matchMultiplier || 0.3],
        },
      },
    },
    {
      $addFields: {
        totalScore: {
          $add: [
            "$languageMatch",
            "$genderMatch",
            "$experienceScore",
            "$specializationMatch",
            "$qualificationScore",
            "$ratingScore",
            "$matchScore",
          ],
        },
      },
    },
    { $sort: { totalScore: -1 } },
    { $limit: 10 },
  ];
};
