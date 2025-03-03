import { JSX } from "react";
import Footer from "../../components/Footer";

const AboutLayout = (): JSX.Element => {
  return (
    <div className="w-full">
      {/* Non Footer Content  */}
      <div className="text-lg p-2 sm:p-10 md:p-20 flex flex-wrap gap-20 justify-center">
        {/* // */}

        {/* About Therafind  */}
        <div className="max-w-200 self-end bg-[var(--cbg-one)] p-10 md:p-15 rounded-4xl">
          <div className="text-5xl xl:text-7xl font-bold text-[var(--text)] mb-10 w-max flex flex-col items-start">
            <span className="font-light">About</span>
            <span className="font-fancy tracking-wider">Therafind</span>
          </div>

          <p className="md:text-3xl text-justify font-light ">
            TheraFind is more than just a project, it is an idea, a vision, and
            a step toward in making therapy accessible to everyone. This
            platform was conceptualized as part of the{" "}
            <span className="text-[var(--highlight)]">
              BIM 2021 6th Semester Summer Project by Sayujya Satyal from St.
              Xavier’s College, Maitighar.
            </span>
          </p>
        </div>

        {/* The Vision  */}
        <div className="max-w-200 self-end bg-[var(--cbg-two)] p-10 md:p-20 rounded-4xl">
          <div className="text-5xl xl:text-7xl font-bold text-[var(--text)] mb-10 flex flex-col items-end">
            <span className="font-light">The</span>
            <span className="font-fancy tracking-wider">Vision</span>
          </div>

          <p className="md:text-3xl text-justify font-light">
            The core idea behind TheraFind is simple yet impactful: creating a
            space where individuals can easily find the right therapist based on
            their needs. In a world where mental health is often overlooked or
            inaccessible, this project aims to bridge the gap between those
            seeking support and the professionals who can provide it.
          </p>
        </div>

        {/* Academic Purpose  */}
        <div className="w-200 xl:w-300 self-start bg-[var(--cbg-three)] p-10 md:p-20 rounded-4xl">
          <div className="text-5xl xl:text-7xl font-bold text-[var(--text)] mb-10 flex flex-col items-start">
            <span className="font-light">Academic</span>
            <span className="font-fancy tracking-wider">Purpose</span>
          </div>

          <p className="md:text-3xl text-justify font-light">
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
