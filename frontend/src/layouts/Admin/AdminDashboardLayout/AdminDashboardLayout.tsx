import { JSX } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import PendingTherapists from "./Components/PendingTherapists";
import TherapistStatusChart from "./Components/TherapistStatusChart";

const AdminDashboardLayout = (): JSX.Element => {
  const { authUser } = useAuthStore();

  return (
    <div className="flex flex-col p-4 gap-10">
      <div className="text-3xl md:text-4xl font-bold text-main-text flex flex-col ml-20">
        <span className="font-light">Welcome,</span>
        <span className="font-fancy tracking-wider">{authUser?.name}</span>
      </div>

      <div className=" flex flex-col-reverse md:flex-row justify-center items-center md:items-start md:justify-around gap-10 w-full">
        <div className="bg-cbg-one pl-10 py-10 w-max flex flex-col gap-5 max-h-140 rounded-lg">
          <div className="flex flex-col text-2xl md:text-4xl text-main-text">
            <span className="font-light">Manage</span>
            <span className="font-bold font-fancy tracking-wider">
              Pending Therapists
            </span>
          </div>

          <div className="flex h-90">
            <PendingTherapists />
          </div>
        </div>

        <div className="w-100">
          <TherapistStatusChart />
        </div>
      </div>
    </div>
  );
};
export default AdminDashboardLayout;
