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
    <section className="w-60 h-auto sm:w-80 md:w-90 lg:h-140 flex flex-col hover:shadow-2xl rounded-4xl shadow-2xs duration-75 cursor-pointer text-xl sm:text-2xl overflow-hidden">
      <div className="flex flex-col rounded-2xl h-full">
        <div className=" bg-[#1d2b36] p-10 flex flex-col gap-5 justify-center items-center lg:flex-row w-full">
          {/* Image of Therapist */}
          <img
            src={therapist.image}
            alt={`${therapist.name}-profile`}
            className="h-20 rounded-full lg:h-40 3xl:h-40 border-3"
          />

          {/* Name and Rating of Therapist */}
          <div className="flex flex-col justify-center items-center gap-5 lg:items-start">
            <h1 className="font-extrabold w-full text-[white] text-center lg:text-end text-xl md:text-2xl lg:text-3xl ">
              {`${therapist.name.split(" ").slice(0, 1)} 
                ${therapist.name.split(" ").slice(1, 2)}`}
            </h1>
            <div className="lg:self-end">
              <StarRating rating={therapist.rating} color="text-yellow-300" />
            </div>
          </div>
        </div>

        <div className="bg-[#f0f8ff] w-full h-full flex flex-col justify-center gap-10 px-2 py-10 items-center">
          {/* Experience  */}
          <p className="flex flex-col items-center font-bold">
            <span className="text-[#00927f] text-lg sm:text-xl xl:text-2xl">
              Experience
            </span>
            <span
              className="font-medium text-2xl md:text-3xl"
              style={{
                background:
                  "-webkit-radial-gradient(circle, #2b5876 0%, #4e4376 51%, #2b5876 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {therapist.experience} years
            </span>
          </p>

          {/* Specialization  */}
          <div className="flex flex-col items-center font-bold">
            <span className="text-[#00927f] text-lg sm:text-xl xl:text-2xl">
              Specialization
            </span>{" "}
            <ul
              className="flex flex-col justify-center items-center font-extrabold text-lg md:text-xl lg:text-2xl"
              style={{
                background:
                  "-webkit-radial-gradient(circle, #2b5876 0%, #4e4376 51%, #2b5876 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {therapist.specialization
                .slice(0, 2)
                .map((content: string, index: number) => (
                  <li key={index} className="text-center font-medium">
                    {content}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default IndividualTherapist;
