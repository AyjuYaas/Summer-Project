import { JSX, useEffect, useState } from "react";
import { useMatchStore } from "../../../store/useMatchStore";
import IndividualTherapist from "../../../components/IndividualTherapist";
import ReactLoading from "react-loading";
import OpenTherapist from "./OpenTherapist";

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

const Recommendation = (): JSX.Element => {
  const {
    recommendations,
    getRecommendations,
    loadingRecommendations: loading,
  } = useMatchStore();

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );

  const handleTherapist = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
  };

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  return (
    <div className=" w-full rounded-4xl p-10 bg-[var(--cbg-three)] flex flex-col gap-4 self-end">
      <div className="flex flex-col text-2xl md:text-4xl">
        <span>Recommended</span>
        <span className="font-fancy tracking-widest">Therapists</span>
        <span className="text-lg">
          According to your problem, We Recommend:
        </span>
        <hr />
      </div>
      <div className="flex gap-10 flex-wrap justify-center md:justify-start">
        {loading ? (
          <div className="flex flex-col">
            <ReactLoading type="bubbles" color="#303b36" />
            <h3>Loading Recommendations</h3>
          </div>
        ) : (
          recommendations.map((therapist) => (
            <div key={therapist._id} onClick={() => handleTherapist(therapist)}>
              <IndividualTherapist therapist={therapist} />
            </div>
          ))
        )}
      </div>

      {selectedTherapist && (
        <OpenTherapist
          therapist={selectedTherapist}
          onClose={() => setSelectedTherapist(null)}
        />
      )}
    </div>
  );
};
export default Recommendation;
