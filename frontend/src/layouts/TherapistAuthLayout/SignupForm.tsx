import React, { JSX, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import specializationData from "./data/specializations-data";
import genderData from "./data/gender-data";
import { MultiSelect } from "primereact/multiselect";
import qualificationData from "./data/qualification-data";
import QualificationLabel from "./data/QualificationLabel";
import "./qualification.css";

interface FormDataInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  specialization: string[];
  experience: string;
  qualification: [];
}

const SignupForm = (): JSX.Element => {
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    specialization: [],
    experience: "",
    qualification: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      specialization: checked
        ? [...prevFormData.specialization, value]
        : prevFormData.specialization.filter((item) => item !== value),
    }));
  };

  const handleQualificationChange = (e: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      qualification: e.value,
    }));
  };

  const { signupTherapist: signup, loading } = useAuthStore();

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
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg focus:outline-1"
        />
      </div>

      {/* ================ Email ============ */}
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg focus:outline-1"
        />
      </div>

      {/* ============ Password ============= */}
      <div>
        <label
          htmlFor="password"
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg focus:outline-1"
        />
      </div>

      {/* ======== Phone =========== */}
      <div>
        <label
          htmlFor="phone"
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg focus:outline-1"
        />
      </div>

      {/* ========== Gender ========= */}
      <div>
        <label
          htmlFor="gender"
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
        >
          Gender
        </label>
      </div>
      <div className="mb-5 flex gap-6 items-center">
        {genderData.map((gender: string) => (
          <label key={gender} className="flex items-center justify-center">
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

      {/* ========== Specialization ========= */}
      <div>
        <label
          htmlFor="specialization"
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
        >
          Specialization (Check all that apply)
        </label>
      </div>
      <div className="mb-5 flex flex-col justify-start items-start p-1 gap-5">
        {specializationData.map((specialization: string, index: number) => (
          <div
            key={index}
            className="flex gap-1.5 h-full items-center justify-center"
          >
            <input
              type="checkbox"
              name="specialization"
              id={`${index}`}
              value={specialization}
              checked={formData.specialization.includes(specialization)}
              onChange={handleSpecializationChange}
              className="border border-[var(--button-border)] rounded-lg h-4 w-4"
            />
            <label htmlFor={`${index}`}>{specialization}</label>
          </div>
        ))}
      </div>

      {/* ========== Experience ========= */}
      <div>
        <label
          htmlFor="experience"
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
        >
          Experience (in Years)
        </label>
      </div>
      <div className="mb-5">
        <input
          type="text"
          name="experience"
          id="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Year/s of experience"
          required
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg focus:outline-1"
        />
      </div>

      {/* ========== Qualification ========= */}
      <div>
        <label
          htmlFor="qualification"
          className="block text-md font-medium text-[var(--highlight)] ml-0.5"
        >
          Qualification
        </label>
      </div>
      <div className="mb-5">
        <div className="card flex justify-content-center relative">
          <MultiSelect
            value={formData.qualification}
            options={qualificationData}
            onChange={handleQualificationChange}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionGroupTemplate={(option) => (
              <QualificationLabel option={option} />
            )}
            placeholder="Select Qualifications"
            display="chip"
            className="w-full md:w-20rem px-3 py-4 border border-[var(--button-border)] rounded-lg relative focus:outline-1"
          />
        </div>
      </div>

      {/* ========== Sign up button =========== */}
      <div>
        <input
          type="submit"
          value={loading ? "Signing up..." : "Signup"}
          className={`text-center px-8 py-3 rounded-4xl w-full min-w-max font-medium mt-5 ${
            loading
              ? "cursor-not-allowed bg-[#80a5ad]"
              : "cursor-pointer bg-[#45646d] text-white hover:bg-[#2f4858] duration-100"
          }`}
          disabled={loading}
        />
      </div>
    </form>
  );
};
export default SignupForm;
