import React from "react";
import reasons from "./data/Reasons";

const WhyTheraFind = (): React.ReactElement => {
  return (
    <div
      className="mx-auto p-10 flex flex-col gap-10 justify-center items-center h-[500px] "
      style={{ backgroundColor: "var(--third-bg)" }}
    >
      <h1
        className="font-bold text-center text-2xl md:text-4xl lg:text-5xl tracking-wider"
        style={{ color: "var(--text)" }}
      >
        With Thera
        <span style={{ color: "var(--highlight)" }}>Find</span>, You{" "}
        <span style={{ color: "var(--highlight-two)" }}>Can:</span>
      </h1>

      {/* List Items  */}
      <div className="flex flex-col gap-4 justify-center items-start text-sm md:text-lg lg:text-xl">
        {reasons.map((reason, index: number) => (
          <div key={index} className="flex gap-5 items-center">
            <div
              className="h-12 w-12 rounded-lg flex items-center justify-center p-2"
              style={{
                backgroundColor: "var(--footer-bg)",
                color: "var(--white-text)",
              }}
            >
              <reason.icon className="text-9xl md:text-4xl " />
            </div>
            <p>{reason.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhyTheraFind;
