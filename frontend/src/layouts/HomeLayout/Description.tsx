import { JSX } from "react";

import img1 from "./../../assets/images/Therapist1.png";
import { FaArrowDown } from "react-icons/fa";

import "./css/description.css";

function Description(): JSX.Element {
  return (
    <div className="home-des-root">
      <div className="home-des">
        <div className="heading">
          <h1>
            Find the Right{" "}
            <span className="font-fancy text-highlight">Therapist</span>, Start
            Your Healing Journey
          </h1>
        </div>

        <div className="image">
          <img src={img1} alt="therapy" />
        </div>
        <div className="content">
          <p>
            At TheraFind, we make it easy to connect with licensed, experienced
            therapists who specialize in a wide range of mental health concerns,
            including anxiety, depression, trauma, relationships, grief, and
            more. Our platform helps you find the best match based on your
            unique needs, ensuring you receive personalized, professional
            support.
          </p>
        </div>
      </div>
      <FaArrowDown className="arrow-down" />
    </div>
  );
}
export default Description;
