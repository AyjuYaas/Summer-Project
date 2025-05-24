import { JSX } from "react";
import WelcomeTherapist from "./WelcomeTherapist";
import { useAuthStore } from "../../store/useAuthStore";
import Connections from "./Connections";
import PendingRequests from "./PendingRequests";
import { Therapist } from "../../types/therapist.types";
import { IoIosWarning } from "react-icons/io";

const TherapistDashboardLayout = (): JSX.Element => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex flex-col px-5 md:px-20 py-5 gap-10 text-main-text relative">
      {(authUser as unknown as Therapist).validationStatus === "pending" && (
        <div className="w-full self-center bg-yellow-200 text-yellow-800 border border-yellow-300 rounded-lg p-4 flex items-center gap-2 justify-center gap-5">
          <IoIosWarning className="size-10" />
          <p className="">
            Your account is currently under review. You will be notified once it
            is approved. Until then you won't be displayed to the users.
          </p>
        </div>
      )}

      {(authUser as unknown as Therapist).validationStatus === "rejected" && (
        <div className="w-full self-center bg-red-200 text-red-800 border border-red-300 rounded-lg p-4 flex items-center gap-2 justify-center gap-5">
          <IoIosWarning className="size-10" />
          <p className="">
            Your account has been rejected. You will not be matched with any of
            the User. Contact the admin for any changes and queries
          </p>
        </div>
      )}
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
