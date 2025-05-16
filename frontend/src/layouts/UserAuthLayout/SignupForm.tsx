import React, { JSX, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import genderData from "../TherapistAuthLayout/data/gender-data";
import { signupParamsUser } from "../../types/user.types";

const SignupForm = (): JSX.Element => {
  const [formData, setFormData] = useState<signupParamsUser>({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "mm/dd/yyyy",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { signupUser: signup, loading } = useAuthStore();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signup(formData);
      }}
    >
      {/* ========== Name ========= */}
      <div>
        <label
          htmlFor="name"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Name
        </label>
      </div>
      <div className="mb-5">
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* ================ Email ============ */}
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Email
        </label>
      </div>
      <div className="mb-5">
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* ============ Password ============= */}
      <div>
        <label
          htmlFor="password"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Password
        </label>
      </div>
      <div className="mb-5">
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
          minLength={6}
          required
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* ======== Phone =========== */}
      <div>
        <label
          htmlFor="phone"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Phone
        </label>
      </div>
      <div className="mb-5">
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Phone"
          pattern="\d{10}" // Ensures exactly 10 digits
          maxLength={10} // Prevents more than 10 digits
          required
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* ========== Age ========= */}
      <div>
        <label
          htmlFor="birthDate"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Date of Birth (AD)
        </label>
      </div>
      <div className="mb-5">
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          value={
            formData.birthDate instanceof Date
              ? formData.birthDate.toISOString().split("T")[0]
              : formData.birthDate
          }
          onChange={(e) => {
            const date = new Date(e.target.value);
            setFormData({ ...formData, birthDate: date });
          }}
          required
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* ========== Gender ========= */}
      <div>
        <label
          htmlFor="gender"
          className="block text-md font-medium text-highlight ml-0.5"
        >
          Gender
        </label>
      </div>
      <div className="mb-5 flex gap-6">
        {genderData.map((gender: string) => (
          <label key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={formData.gender === gender}
              onChange={handleChange}
              className="mr-1 w-4 h-4"
            />
            {gender}
          </label>
        ))}
      </div>

      {/* ========== Sign up button =========== */}
      <div>
        <input
          type="submit"
          value={loading ? "Signing up..." : "Signup"}
          className={`text-center px-8 py-3 rounded-4xl text-main-text w-full min-w-max font-medium mt-5 ${
            loading
              ? "cursor-not-allowed bg-[#a18691]"
              : "cursor-pointer bg-[#2f4858] text-white-text hover:bg-[#565b70] duration-100"
          }`}
          disabled={loading}
        />
      </div>
    </form>
  );
};
export default SignupForm;
