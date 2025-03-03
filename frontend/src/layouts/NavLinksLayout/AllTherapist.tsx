import { JSX } from "react";
import Footer from "../../components/Footer";

import ReviewLayout from "./components/ReviewLayout";
import Therapists from "./components/Therapists";

const AllTherapist = (): JSX.Element => {
  return (
    <div>
      <div className="w-full px-1 py-10 sm:px-5 lg:px-10 relative flex flex-col gap-20">
        <div>
          <Therapists />
        </div>
        <div className="ml-auto">
          <ReviewLayout />
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default AllTherapist;
