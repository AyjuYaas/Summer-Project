import { JSX } from "react";
import { SiFonoma } from "react-icons/si";
import { Link } from "react-router-dom";

const NoMatches = (): JSX.Element => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center  text-center text-xl gap-2 text-main-text justify-self-center self-center mt-5">
      <SiFonoma className="text-3xl" />
      <h1 className="font-bold">No Conversations Here</h1>
      <h2>Begin searching for a therapist to start a session</h2>
      <Link to="/user/find-therapist" className="text-lg underline">
        Click Here to Start Finding
      </Link>
    </div>
  );
};
export default NoMatches;
