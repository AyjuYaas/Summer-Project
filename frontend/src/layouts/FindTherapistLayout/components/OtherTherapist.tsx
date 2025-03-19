import { JSX, useEffect, useState } from "react";
import { useMatchStore } from "../../../store/useMatchStore";
import IndividualTherapist from "../../../components/IndividualTherapist";
import ReactLoading from "react-loading";
import OpenTherapist from "./OpenTherapist";
import NoTherapists from "./NoTherapists";

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

const OtherTherapist = (): JSX.Element => {
  const {
    therapists,
    getTherapists,
    loadingTherapists: loading,
  } = useMatchStore();

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );

  const handleTherapist = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
  };

  useEffect(() => {
    getTherapists();
  }, [getTherapists]);

  return (
    <div className="w-full rounded-4xl p-10 bg-cbg-four flex flex-col gap-4 self-end">
      <div className="flex flex-col text-2xl md:text-4xl">
        <span>Other</span>
        <span className="font-fancy tracking-widest">Therapists</span>
        <hr />
      </div>
      <div className="flex gap-10 flex-wrap justify-center md:justify-start">
        {loading ? (
          <div className="flex flex-col">
            <ReactLoading type="bubbles" color="#303b36" />
            <h3>Loading Therapists</h3>
          </div>
        ) : therapists.length === 0 ? (
          <NoTherapists label="Associated" />
        ) : (
          therapists.map((therapist) => (
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
export default OtherTherapist;
