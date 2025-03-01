import { JSX } from "react";

export default function Break(): JSX.Element {
  return (
    <hr
      style={{
        border: "0",
        height: "2px",
        backgroundImage:
          "linear-gradient(to right, #f0f0f0, #00b9ff, #59d941, #f0f0f0)",
      }}
    />
  );
}
