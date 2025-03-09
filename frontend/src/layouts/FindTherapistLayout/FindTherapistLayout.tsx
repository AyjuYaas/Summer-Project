import { JSX } from "react";
import Recommendation from "./components/Recommendation";
import OtherTherapist from "./components/OtherTherapist";
import UpdateProblem from "./components/UpdateProblem";
import { useAuthStore } from "../../store/useAuthStore";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  gender: string;
  image: string;
  imagePublicId: string;
  problemText: string;
  // problems: Problems[];
  selected_therapists: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const FindTherapistLayout = (): JSX.Element => {
  const { authUser } = useAuthStore();

  return (
    <>
      {!(authUser as unknown as User).problemText ? (
        <div className="flex min-h-[calc(100vh-6rem)] justify-center items-center text-xl text-[var(--text)]">
          Update your Problem field to Start Finding Therapist.
        </div>
      ) : (
        <div className="flex flex-col gap-10 py-10">
          <Recommendation />
          <OtherTherapist />
        </div>
      )}
      <UpdateProblem />
    </>
  );
};
export default FindTherapistLayout;
