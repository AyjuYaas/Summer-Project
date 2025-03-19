import { JSX } from "react";
import WelcomeTherapist from "./WelcomeTherapist";
import { useAuthStore } from "../../store/useAuthStore";
import Connections from "./Connections";
import PendingRequests from "./PendingRequests";

const TherapistDashboardLayout = (): JSX.Element => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex flex-col px-5 md:px-20 py-5 gap-10 text-main-text relative">
      <div className="flex flex-col gap-10 md:flex-row justify-between items-center">
        <WelcomeTherapist
          image={authUser?.image || ""}
          name={authUser?.name || ""}
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <Connections />

        <PendingRequests />
      </div>
    </div>
  );
};
export default TherapistDashboardLayout;
