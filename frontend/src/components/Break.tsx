import { JSX } from "react";

const styles = {
  borderWidth: "0 0 1px",
  color: "skyblue",
  borderImage:
    "linear-gradient(90deg, rgba(135, 206, 235, 0), rgba(135, 206, 235, 1) 50%, rgba(135, 206, 235, 0) 100%) 0 0 100%",
  borderStyle: "solid",
  marginTop: "30px",
};

export default function Break(): JSX.Element {
  return <hr style={styles}></hr>;
}
