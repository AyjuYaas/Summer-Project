import { JSX, useEffect, useState } from "react";
import IndividualTherapist from "./IndividualTherapist";
import { axiosInstance } from "../../../lib/Axios";

interface Therapist {
  name: string;
  image: string;
  experience: number;
  rating: number;
  specialization: string[];
}

const Therapists = (): JSX.Element => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    getTherapist();
  }, []);

  const getTherapist = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/all-therapist");
      console.log(response.data.therapist);
      setTherapists(response.data.therapist || []);
    } catch (error) {
      console.log(`Error fetching therapists: ${error}`);
    }
  };

  return (
    <div className="relative bg-[var(--cbg-three)] rounded-[40px] sm:rounded-[80px] text-[var(--text)] shadow-2xl gap-5 min-w-70 pr-10 md:pr-15 max-w-350">
      <div className=" flex justify-end pt-10 pl-10 md:pt-10 md:pl-15">
        <h1 className="flex flex-col text-3xl sm:text-5xl lg:text-7xl items-end">
          <span className="text-2xl sm:text-4xl lg:text-5xl">Meet Our</span>
          <span className="font-bold font-fancy tracking-widest">
            Therapists
          </span>
        </h1>
      </div>
      <div className="h-auto flex justify-start items-center gap-10 py-10 pl-10 md:py-15 md:pl-15 overflow-x-auto scrollbar z-1 relative">
        {therapists.map((therapist: Therapist, index: number) => (
          <>
            <div key={index} className="inline-block">
              <IndividualTherapist key={index} therapist={therapist} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
export default Therapists;
