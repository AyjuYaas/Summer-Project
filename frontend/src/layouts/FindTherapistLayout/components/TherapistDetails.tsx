import { JSX } from "react";
import StarRating from "../../../components/StarRating";

interface Props {
  image: string;
  name: string;
  gender: string;
  rating: number;
  reviewCount: number;
  experience: number;
  specialization: string[];
  qualification: string[];
}

const TherapistDetails = ({
  image,
  name,
  gender,
  rating,
  reviewCount,
  experience,
  specialization,
  qualification,
}: Props): JSX.Element => {
  return (
    <div className="flex flex-col text-xl font-bold text-main-text gap-7 bg-cbg-four max-w-300 w-auto p-6 rounded-2xl shadow-2xl">
      <div className="flex flex-col text-5xl text-start gap-1">
        <span className="font-light">Therapist</span>
        <span className="font-fancy">Details</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12 justify-between w-full">
        <div className="flex flex-col gap-2 items-center w-full">
          {/* image  */}
          <img
            src={image}
            alt={`${name}-img`}
            className="size-30 rounded-full border-3"
          />

          {/* Name */}
          <span className="text-center text-[#2f4858] font-fancy text-3xl">
            {name}
          </span>

          {/* Gender */}
          <span className="font-medium">
            <span className="font-bold text-[#2f4858]">Gender:</span> {gender}
          </span>

          {/* Rating */}
          <span>
            <StarRating
              rating={rating}
              color="text-yellow-600"
              colorEmpty="text-gray-600"
            />
          </span>

          <span className="font-medium">
            <span className="font-bold text-[#2f4858]">Total Reviews:</span>{" "}
            {reviewCount}
          </span>
        </div>

        {/* Experience Specialization Qualification */}
        <div className="flex flex-col gap-7 text-start w-full">
          {/* Experience */}
          <div className="flex flex-col">
            <span className="text-[#2f4858] font-extrabold font-fancy text-2xl">
              Experience
            </span>{" "}
            <span className="font-medium">{experience} years</span>
          </div>

          {/* Specialization */}
          <div>
            <span className="text-[#2f4858] font-extrabold font-fancy text-2xl">
              Specializations
            </span>
            <ul className="font-medium list-disc ml-6">
              {specialization.map((field, index: number) => (
                <li key={index}>{field}</li>
              ))}
            </ul>
          </div>

          {/* Qualification */}
          <div className="w-full">
            <span className="text-[#2f4858] font-extrabold font-fancy text-2xl">
              Qualifications
            </span>
            <ul className="font-medium list-disc pl-6 w-full">
              {qualification.map((field, index: number) => (
                <li key={index} className="break-words md:whitespace-nowrap">
                  {field}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TherapistDetails;
