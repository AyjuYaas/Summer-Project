import { JSX, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import StarRating from "../../../components/StarRating";
import { useMatchStore } from "../../../store/useMatchStore";

interface Therapist {
  _id: string;
  name: string;
  image: string;
  specialization: string[];
  experience: number;
  qualification: string[];
  gender: string;
  rating: number;
}
interface Props {
  therapist: Therapist;
  onClose: () => void;
}

const OpenTherapist = ({ therapist, onClose }: Props): JSX.Element => {
  const { selectTherapist, loadingSelection } = useMatchStore();
  const handleConnection = async () => {
    selectTherapist(therapist._id);
    onClose();
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCLickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Element)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleCLickOutside);

    return () => {
      document.removeEventListener("mousedown", handleCLickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed z-100 top-0 bottom-0 left-0 right-0 h-screen w-full backdrop-blur-xs flex justify-center items-center self-center justify-self-center">
      <div
        className="relative w-max h-auto bg-[var(--cbg-two)] px-8 py-10 rounded-4xl flex flex-col gap-5 items-center"
        ref={menuRef}
      >
        {/* Name and Image gender rating */}
        <div className="flex gap-12 text-xl font-bold text-[var(--text)] justify-center items-center">
          <div className="flex flex-col gap-2 items-center">
            {/* image  */}
            <img
              src={therapist.image}
              alt={`${therapist.name}-img`}
              className="size-30 rounded-full"
            />

            {/* Name */}
            <span className="text-center text-[var(--highlight)]">
              {therapist.name}
            </span>

            {/* Gender */}
            <span className="font-medium">{therapist.gender}</span>

            {/* Rating */}
            <span>
              <StarRating rating={therapist.rating} color="text-yellow-500" />
            </span>
          </div>

          {/* Experience Specialization Qualification */}
          <div className="flex flex-col gap-4">
            {/* Experience */}
            <div className="flex flex-col">
              <span className="text-[var(--highlight)]">Experience</span>{" "}
              <span className="font-medium">{therapist.experience} years</span>
            </div>

            {/* Specialization */}
            <div>
              <span className="text-[var(--highlight)]">Specialization</span>
              <ul className="font-medium list-disc ml-6">
                {therapist.specialization.map((field, index: number) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>

            {/* Qualification */}
            <div>
              <span className="text-[var(--highlight)]">Qualification</span>
              <ul className="font-medium list-disc ml-6">
                {therapist.qualification.map((field, index: number) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <button
            className={`text-white font-bold px-10 py-3 rounded-4xl duration-150 ${
              loadingSelection
                ? "cursor-not-allowed bg-[#87a8c1]"
                : "cursor-pointer bg-[#8b4969] hover:bg-[#2f4858]"
            }`}
            onClick={handleConnection}
          >
            Connect Now
          </button>
        </div>
        <button
          className="absolute top-4 right-4 bg-[var(--text)] text-white size-8 text-2xl flex justify-center items-center rounded-full cursor-pointer"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
export default OpenTherapist;
