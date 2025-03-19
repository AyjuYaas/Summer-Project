import { JSX } from "react";
import ReactLoading from "react-loading";

const LoadingMessage = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-xl gap-2 text-main-text">
      <ReactLoading type="bubbles" color="#303b36" />
      <h3>Loading Therapists</h3>
      <p>This might take a moment..</p>
    </div>
  );
};
export default LoadingMessage;
