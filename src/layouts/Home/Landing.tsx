import React from "react";

import Button from "../../components/Button";

import img from "../../assets/images/Landing2.png";

import "./css/landing.css";

export default function Landing(): React.ReactElement {
  return (
    <div className="landing">
      <section className="non-img">
        <div className="heading">
          <span>Find Therapist.</span>
          <span>Start Healing.</span>
        </div>

        <div className="content">
          <p>Match with the best Therapists around the world.</p>
          <Button to="/find-therapist" content="Start Here" type="filled" />
        </div>
      </section>

      <img src={img} alt="therapy-img" />
      <div className="wavy">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
