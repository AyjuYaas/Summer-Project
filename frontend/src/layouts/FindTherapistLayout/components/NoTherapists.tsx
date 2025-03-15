import { JSX } from "react";
import { PiEmptyFill } from "react-icons/pi";

const NoTherapists = ({ label }: { label: string }): JSX.Element => {
  return (
    <div className="text-xl text-[var(--text)] flex w-full justify-center items-center h-full p-10 gap-2 flex-wrap">
      <PiEmptyFill size={40} />
      <span>Sorry!! No {label} Therapists At the Moment.</span>
    </div>
  );
};
export default NoTherapists;
