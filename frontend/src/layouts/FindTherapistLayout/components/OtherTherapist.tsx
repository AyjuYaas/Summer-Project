import { JSX, useEffect, useState } from "react";
import { useMatchStore } from "../../../store/useMatchStore";
import IndividualTherapist from "../../../components/IndividualTherapist";
import ReactLoading from "react-loading";
import OpenTherapist from "./OpenTherapist";
import NoTherapists from "./NoTherapists";
import { matchedTherapists } from "../../../types/match.types";

const OtherTherapist = (): JSX.Element => {
  const {
    therapists,
    getTherapists,
    loadingTherapists: loading,
    hasMore,
  } = useMatchStore();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (hasMore) {
      getTherapists(page);
    }
  }, [getTherapists, hasMore, page]);

  const increasePage = () => {
    setPage(page + 1);
  };

  const [selectedTherapist, setSelectedTherapist] =
    useState<matchedTherapists | null>(null);

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

  const handleTherapist = (therapist: matchedTherapists) => {
    setSelectedTherapist(therapist);
  };

  return (
    <div className="w-full rounded-4xl p-10 bg-cbg-four flex flex-col gap-4 self-end">
      <div className="flex flex-col text-4xl">
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
          therapists.map((therapist, index: number) => (
            <div key={index} onClick={() => handleTherapist(therapist)}>
              <IndividualTherapist therapist={therapist} />
            </div>
          ))
        )}
      </div>
      {hasMore && (
        <div
          className="bg-[#2f4858] p-3 px-10 font-bold text-white rounded-lg shadow-2xl mx-auto text-lg cursor-pointer hover:bg-[#628182] mt-10"
          onClick={increasePage}
        >
          Load More
        </div>
      )}

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
