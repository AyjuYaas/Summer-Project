import { JSX, useEffect, useState } from "react";
import { axiosInstance } from "../../lib/Axios";
import Footer from "../../components/Footer";
import IndividualTherapist from "./data/IndividualTherapist";
import "./therapistList.css";

interface Therapist {
  name: string;
  image: string;
  experience: number;
  rating: number;
  specialization: string[];
}

const AllTherapist = (): JSX.Element => {
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
    <div>
      <div className="w-full p-5 relative">
        <div className="therapist-bg flex-col xl:flex-row px-8 py-10 gap-5">
          <div className=" flex flex-col items-center justify-center p-3 bg-amber-500 self-center md:ml-[-2rem] md:self-start md:mt-20 ">
            <h1 className="text-2xl font-bold text-[var(--white-text)] md:text-5xl">
              <span>Meet </span>Our
              <span> Therapists:</span>
            </h1>
          </div>
          <div className="w-full h-full flex flex-wrap justify-center items-center gap-10">
            {therapists.map((therapist: Therapist, index: number) => (
              <IndividualTherapist key={index} therapist={therapist} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default AllTherapist;
