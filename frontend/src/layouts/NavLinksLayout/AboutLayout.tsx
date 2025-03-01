import { JSX } from "react";
import Footer from "../../components/Footer";
import Break from "../../components/Break";

const AboutLayout = (): JSX.Element => {
  return (
    <div className="w-full">
      {/* Non Footer Content  */}
      <div className="text-lg ">
        {/* // */}

        {/* About Therafind  */}
        <div className="p-10 md:p-20">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-10 text-center">
            About Thera
            <span style={{ color: "var(--highlight)" }}>find</span>
          </h1>

          <p className="md:text-2xl">
            TheraFind is more than just a project, it is an idea, a vision, and
            a step toward in making therapy accessible to everyone. This
            platform was conceptualized as part of the{" "}
            <span className="font-bold text-amber-700">
              BIM 2021 6th Semester Summer Project
            </span>{" "}
            by{" "}
            <span className="font-bold text-[var(--highlight)]">
              Sayujya Satyal
            </span>{" "}
            from{" "}
            <span className="font-bold text-cyan-700">
              St. Xavier’s College, Maitighar
            </span>
          </p>
        </div>

        <Break />

        {/* The Vision  */}
        <div className="w-full bg-[var(--third-bg)] p-10 md:p-20">
          <h2 className="text-3xl font-bold text-[var(--text)] mb-10 text-center">
            The <span style={{ color: "var(--highlight-two)" }}>Vision</span>
          </h2>

          <p className="md:text-2xl">
            The core idea behind TheraFind is simple yet impactful: creating a
            space where individuals can easily find the{" "}
            <span className="font-bold text-[var(--highlight)]">
              right therapist based on their needs
            </span>
            . In a world where mental health is often overlooked or
            inaccessible, this project aims to bridge the gap between those
            seeking support and the professionals who can provide it.
          </p>
        </div>

        <Break />

        {/* Academic Purpose  */}
        <div className="p-10 md:p-20">
          <h2 className="text-3xl font-bold text-[var(--text)] mb-10 text-center">
            Academic <span className="text-[var(--highlight)]">Purpose</span>
          </h2>

          <p className="md:text-2xl">
            While TheraFind remains an academic requirement for the successful
            completion of the BIM 6th Semester Summer Project, its foundation is
            built on a real-world problem{" "}
            <span className="text-[var(--highlight-two)] font-bold">
              making therapy available to all
            </span>
            . This project explores how technology can facilitate personalized
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
