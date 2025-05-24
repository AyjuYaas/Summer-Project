import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const buildTherapistAggregation = ({
  matchedTherapistIds,
  preferredLanguage,
  preferredGender,
  predictedProblemList,
  scoringWeights,
}) => {
  return [
    {
      $match: {
        _id: { $nin: matchedTherapistIds.map((id) => new ObjectId(id)) },
        availability: true,
        validationStatus: "approved",
      },
    },
    {
      $addFields: {
        // Match score for language
        languageMatch: {
          $cond: [
            { $in: [preferredLanguage, "$languages"] },
            scoringWeights.languageMatch,
            0,
          ],
        },

        // Match score for gender
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

        // Score for rating
        ratingScore: {
          $multiply: ["$rating", scoringWeights.ratingMultiplier],
        },

        // Score for experience
        experienceScore: {
          $multiply: [
            { $ln: { $add: ["$experience", 1] } },
            scoringWeights.experiencePerYear,
          ],
        },

        // Score for specialization match (at least one matching problem)
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
            scoringWeights.specializationMatch || 2, // You can customize the weight
            0,
          ],
        },
      },
    },
    {
      $addFields: {
        totalScore: {
          $add: [
            "$languageMatch",
            "$genderMatch",
            "$ratingScore",
            "$experienceScore",
            "$specializationMatch",
          ],
        },
      },
    },
    {
      $sort: { totalScore: -1 },
    },
    {
      $limit: 10, // Top 10, or change to any number
    },
  ];
};
