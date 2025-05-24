import Therapist from "../models/therapist.model.js";

export const allTherapist = async (req, res) => {
  const therapists = await Therapist.find({
    validationStatus: "approved",
  })
    .select(
      "_id name image experience rating specialization reviewCount gender totalMatches"
    )
    .limit(6);

  res.status(200).json({
    success: true,
    therapist: therapists,
  });
};
