import { JSX } from "react";
import reasons from "./data/Reasons";

interface Reason {
  icon: React.ElementType;
  content: string;
}

const WhyTheraFind = (): JSX.Element => {
  return (
    <div
      className="mx-auto p-10 flex flex-col gap-10 justify-center items-center h-[600px]"
      style={{ backgroundColor: "var(--third-bg)" }}
    >
      <h1 className="font-bold text-center text-[1.9rem] md:text-[3vw] tracking-wider text-[var(--text)]">
        With{" "}
        <span style={{ color: "var(--highlight)" }} className="font-fancy">
          TheraFind
        </span>
        , You{" "}
        <span style={{ color: "var(--highlight-two)" }} className="font-fancy">
          Can:
        </span>
      </h1>

      {/* List Items  */}
      <div className="flex flex-col gap-10 justify-center items-start text-sm md:text-lg lg:text-2xl xl:text-3xl">
        {reasons.map((reason: Reason, index: number) => (
          <div key={index} className="flex gap-5 items-center">
            <div
              className="rounded-lg flex items-center justify-center p-2"
              style={{
                backgroundColor: "var(--footer-bg)",
                color: "var(--white-text)",
              }}
            >
              <reason.icon className="text-lg md:text-3xl" />
            </div>
            <p>{reason.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhyTheraFind;
