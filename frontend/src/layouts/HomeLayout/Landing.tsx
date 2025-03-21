import { JSX } from "react";

import img from "../../assets/images/Landing.png";

import "./css/landing.css";
import { Link } from "react-router-dom";

export default function Landing(): JSX.Element {
  return (
    <div className="landing">
      <div className="holder">
        <section className="non-img">
          <div className="heading">
            <span>
              Find{" "}
              <span
                style={{ color: "var(--button)" }}
                className="font-fancy tracking-wide"
              >
                Therapist,
              </span>
            </span>
            <span>Start Healing.</span>
          </div>

          <div className="content">
            <p>Match with the best Therapists around the world.</p>
            <Link to="/get-started" className="btn filled-btn">
              Start Here
            </Link>
          </div>
        </section>
        <section className="img">
          <img src={img} alt="therapy-img" />
        </section>
      </div>
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
            style={{ fill: "var(--secondary-bg)" }}
          ></path>
        </svg>
      </div>
    </div>
  );
}
