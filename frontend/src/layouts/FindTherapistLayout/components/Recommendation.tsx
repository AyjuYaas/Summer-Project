import { JSX, useEffect, useState } from "react";
import { useMatchStore } from "../../../store/useMatchStore";
import IndividualTherapist from "../../../components/IndividualTherapist";
import ReactLoading from "react-loading";
import OpenTherapist from "./OpenTherapist";
import NoTherapists from "./NoTherapists";
import { matchedTherapists } from "../../../types/match.types";

const Recommendation = (): JSX.Element => {
  const {
    recommendations,
    getRecommendations,
    loadingRecommendations: loading,
  } = useMatchStore();

  const [selectedTherapist, setSelectedTherapist] =
    useState<matchedTherapists | null>(null);

  const handleTherapist = (therapist: matchedTherapists) => {
    setSelectedTherapist(therapist);
  };

  useEffect(() => {
    if (selectedTherapist) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
    return () => {
      document.body.style.overflowY = "visible"; // Reset overflow when component unmounts
    };
  }, [selectedTherapist]);

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  return (
    <div className=" w-full rounded-4xl p-10 bg-cbg-three flex flex-col gap-4 self-end">
      <div className="flex flex-col text-4xl">
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
        ) : recommendations.length === 0 ? (
          <NoTherapists label="Recommended" />
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
