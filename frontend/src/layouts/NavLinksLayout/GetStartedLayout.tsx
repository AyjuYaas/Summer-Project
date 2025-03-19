import { JSX } from "react";
import { FaArrowDown } from "react-icons/fa";
import Footer from "../../components/Footer";
import logoImage from "../../assets/images/Logo.png";
import { IoEnterSharp } from "react-icons/io5";
import { RiUserShared2Fill } from "react-icons/ri";
import { GrSelect } from "react-icons/gr";
import { MdConnectWithoutContact } from "react-icons/md";
import { Link } from "react-router-dom";

const GetStartedLayout = (): JSX.Element => {
  const componentDiv =
    "flex p-10 items-center gap-10 rounded-4xl shadow-lg hover:shadow-2xl cursor-pointer";
  const nonImage = "flex flex-col text-2xl lg:text-3xl gap-1";
  const imageDiv = "size-20 text-[#2f4858]";
  const headerDiv = "flex flex-col items-start mb-3";
  const headerTwo = "font-fancy tracking-widest text-[#2f4858]";
  const contentClass = "text-lg";

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center text-main-text py-10">
        {/* Welcome */}
        <div className={`${componentDiv} bg-cbg-two`}>
          <div className={`${nonImage}`}>
            <div className={`${headerDiv}`}>
              <span>Welcome to</span>
              <span className={`${headerTwo}`}>Therafind</span>
            </div>
            <span className={`${contentClass}`}>
              Discover the easiest way to find the right therapist for you. Our
              smart system simplifies the process in just a few steps:
            </span>
          </div>
          <div className={`${imageDiv}`}>
            <img src={logoImage} alt="logo" />
          </div>
        </div>

        <FaArrowDown className="size-10 text-highlight" />

        {/* Step 1 */}
        <Link to="/user/login">
          <div className={`${componentDiv} bg-cbg-one`}>
            <div>
              <IoEnterSharp className={`${imageDiv}`} />
            </div>
            <div className={`${nonImage}`}>
              <div className={`${headerDiv}`}>
                <span>Step 1:</span>
                <span className={`${headerTwo}`}>Login/Signup</span>
              </div>
              <span className={`${contentClass}`}>
                Create an account in seconds by filling out a quick and easy
                form.
              </span>
            </div>
          </div>
        </Link>

        <FaArrowDown className="size-10 text-highlight" />

        {/* Step 2 */}
        <div className={`${componentDiv} bg-cbg-t`}>
          <div className={`${nonImage}`}>
            <div className={`${headerDiv}`}>
              <span>Step 2:</span>
              <span className={`${headerTwo}`}>Share your Concern</span>
            </div>
            <span className={`${contentClass}`}>
              Tell us about your situation, and our AI-powered recommendation
              system will suggest potential concerns and guide you toward the
              best therapists.
            </span>
          </div>
          <div>
            <RiUserShared2Fill className={`${imageDiv}`} />
          </div>
        </div>

        <FaArrowDown className="size-10 text-highlight" />

        {/* Step 3 */}
        <div className={`${componentDiv} bg-cbg-one`}>
          <div>
            <GrSelect className={`${imageDiv}`} />
          </div>
          <div className={`${nonImage}`}>
            <div className={`${headerDiv}`}>
              <span>Step 3:</span>
              <span className={`${headerTwo}`}>Choose Your therapist</span>
            </div>
            <span className={`${contentClass}`}>
              Browse our list of verified therapists and select the one that
              best fits your needs.
            </span>
          </div>
        </div>

        <FaArrowDown className="size-10 text-highlight" />

        {/* Step 4 */}
        <div className={`${componentDiv} bg-cbg-one`}>
          <div className={`${nonImage}`}>
            <div className={`${headerDiv}`}>
              <span>Step 4:</span>
              <span className={`${headerTwo}`}>Connect & Communicate</span>
            </div>
            <span className={`${contentClass}`}>
              Start your journey toward healing through chat, calls, or video
              sessions with your chosen therapist. Your well-being is just a few
              clicks away!
            </span>
          </div>
          <div>
            <MdConnectWithoutContact className={`${imageDiv}`} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default GetStartedLayout;
