import { JSX, useEffect } from "react";
import IndividualTherapist from "../../../components/IndividualTherapist";
import { useNavStore } from "../../../store/useNavStore";
import ReactLoading from "react-loading";

const Therapists = (): JSX.Element => {
  const { loading, therapists, getTherapists, resetTherapists } = useNavStore();

  useEffect(() => {
    getTherapists();

    return () => {
      resetTherapists();
    };
  }, [getTherapists, resetTherapists]);

  return (
    <div className="relative bg-cbg-three rounded-[40px] sm:rounded-[80px] text-main-text shadow-2xl gap-2 min-w-70 pr-10 md:pr-15 max-w-300">
      <div className=" flex justify-end pt-10 pl-10 md:pt-10 md:pl-15">
        <h1 className="flex flex-col text-3xl sm:text-4xl lg:text-5xl items-end">
          <span className="text-2xl sm:text-3xl lg:text-4xl">Meet Our</span>
          <span className="font-bold font-fancy tracking-widest">
            Therapists
          </span>
        </h1>
      </div>
      <div className="h-auto flex justify-start items-center gap-10 py-10 pl-10 md:py-15 md:pl-15 overflow-x-auto scrollbar-horizontal z-1 relative">
        {loading ? (
          <ReactLoading type="spin" color="#303b36" />
        ) : (
          therapists.map((therapist, index: number) => (
            <div key={index} className="inline-block">
              <IndividualTherapist therapist={therapist} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Therapists;
