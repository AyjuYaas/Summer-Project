import { JSX } from "react";
import Footer from "../../components/Footer";

const AboutLayout = (): JSX.Element => {
  return (
    <div className="w-full">
      {/* Non Footer Content  */}
      <div className="text-lg p-2 sm:p-10 md:p-10 flex flex-col gap-20 justify-center items-center">
        {/* // */}

        <div className="flex flex-col gap-20 lg:flex-row">
          {/* About Therafind  */}
          <div className="max-w-200 self-end bg-cbg-one p-10 md:p-15 rounded-4xl flex-3/4">
            <div className="text-5xl font-bold text-main-text mb-5 w-max flex flex-col items-start">
              <span className="font-light">About</span>
              <span className="font-fancy tracking-wider">Therafind</span>
            </div>

            <p className="md:text-2xl text-justify font-light leading-9">
              TheraFind is more than just a project, it is an idea, a vision,
              and a step toward in making therapy accessible to everyone. This
              platform was conceptualized as part of the{" "}
              <span className="text-highlight">
                BIM 2021 6th Semester Summer Project by Sayujya Satyal from St.
                Xavier’s College, Maitighar.
              </span>
            </p>
          </div>

          {/* The Vision  */}
          <div className="max-w-200 self-end bg-cbg-two p-10 md:p-20 rounded-4xl flex-2/3">
            <div className="text-5xl font-bold text-main-text mb-5 flex flex-col items-end">
              <span className="font-light">The</span>
              <span className="font-fancy tracking-wider">Vision</span>
            </div>

            <p className="md:text-2xl text-justify font-light leading-9">
              The core idea behind TheraFind is simple yet impactful: creating a
              space where individuals can easily find the right therapist based
              on their needs. In a world where mental health is often overlooked
              or inaccessible, this project aims to bridge the gap between those
              seeking support and the professionals who can provide it.
            </p>
          </div>
        </div>

        {/* Academic Purpose  */}
        <div className=" xl:w-300 self-center bg-cbg-three p-10 md:p-20 rounded-4xl">
          <div className="text-5xl font-bold text-main-text mb-5 flex flex-col items-start">
            <span className="font-light">Academic</span>
            <span className="font-fancy tracking-wider">Purpose</span>
          </div>

          <p className="md:text-2xl text-justify font-light leading-9">
            While TheraFind remains an academic requirement for the successful
            completion of the BIM 6th Semester Summer Project, its foundation is
            built on a real-world problem making therapy available to all. This
            project explores how technology can facilitate personalized
            therapist recommendations, seamless communication, and a secure
            platform for individuals looking to improve their mental well-being.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default AboutLayout;
