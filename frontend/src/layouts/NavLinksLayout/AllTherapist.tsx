import { JSX, useEffect, useState } from "react";
import { axiosInstance } from "../../lib/Axios";

interface Therapist {
  name: string;
  image: string;
  experience: number;
  rating: number;
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
      <div>
        {therapists.map((therapist: Therapist, index: number) => (
          <section key={index}>
            <h1>{therapist.name}</h1>
            <p>{therapist.rating}</p>
            <p>{therapist.experience}</p>
          </section>
        ))}
      </div>
    </div>
  );
};
export default AllTherapist;
