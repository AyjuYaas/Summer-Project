import Therapist from "../models/therapist.model.js";

export const allTherapist = async (req, res) => {
  const therapists = await Therapist.find({
    rating: { $gt: 3.5 },
  })
    .select("name image experience rating specialization reviewCount")
    .limit(6);

  res.status(200).json({
    success: true,
    therapist: therapists,
  });
};
