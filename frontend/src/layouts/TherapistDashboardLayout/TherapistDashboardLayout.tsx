import { JSX } from "react";
import WelcomeTherapist from "./WelcomeTherapist";
import { useAuthStore } from "../../store/useAuthStore";
import Connections from "./Connections";
import PendingRequests from "./PendingRequests";

interface Therapist {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  imagePublicId: string;
  phone: string;
  gender: string;
  specification: string[];
  experience: number;
  qualification: string[];
  availability: boolean;
  matched_user: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

const TherapistDashboardLayout = (): JSX.Element => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex flex-col px-5 md:px-20 py-5 gap-10 text-main-text relative">
      <div className="flex flex-col gap-10 md:flex-row justify-between items-center">
        <WelcomeTherapist
          id={authUser?._id || ""}
          image={authUser?.image || ""}
          name={authUser?.name || ""}
          reviewCount={(authUser as unknown as Therapist).reviewCount}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-5 pb-10">
        <Connections />

        <PendingRequests />
      </div>
    </div>
  );
};
export default TherapistDashboardLayout;
