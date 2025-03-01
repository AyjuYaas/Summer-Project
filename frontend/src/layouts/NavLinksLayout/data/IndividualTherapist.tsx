import { JSX } from "react";
import StarRating from "../../../components/StarRating";

interface Therapist {
  name: string;
  image: string;
  experience: number;
  rating: number;
  specialization: string[];
}

interface IndividualTherapist {
  therapist: Therapist;
}

const IndividualTherapist = ({
  therapist,
}: IndividualTherapist): JSX.Element => {
  return (
    <section className="bg-[#dce1de]/60 p-5 md:p-10 w-80 h-130 flex flex-col gap-8 justify-center items-center rounded-2xl shadow-xl hover:scale-105 cursor-pointer text-xl lg:text-2xl overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-5 rounded-2xl">
        <div className="flex flex-col gap-5 justify-center items-center md:flex-row">
          {/* Image of Therapist */}
          <img
            src={therapist.image}
            alt={`${therapist.name}-profile`}
            className="h-20 rounded-full md:h-30 3xl:h-40"
          />

          {/* Name and Rating of Therapist */}
          <div className="flex flex-col justify-center items-center gap-5 md:items-start">
            <h1 className="font-bold w-full">{therapist.name}</h1>
            <StarRating rating={therapist.rating} color="yellow-500" />
          </div>
        </div>

        {/* Experience  */}
        <p className="flex flex-col items-center font-bold gap-2">
          <span className="text-[#2d6a4f]">Experience:</span>
          {therapist.experience} years
        </p>

        {/* Specialization  */}
        <div className="flex flex-col items-center font-bold">
          <span className="text-[#2d6a4f] mb-2">Specialization:</span>{" "}
          <ul className="font-medium flex flex-col  gap-1 justify-center items-center">
            {therapist.specialization
              .slice(0, 2)
              .map((content: string, index: number) => (
                <li key={index} className="text-center md:text-start">
                  [{content}]
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default IndividualTherapist;
