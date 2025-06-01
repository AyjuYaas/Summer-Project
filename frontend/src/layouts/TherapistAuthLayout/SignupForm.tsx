import React, { JSX, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { signupParamsTherapist } from "../../types/therapist.types";
import BasicInformation from "./components/BasicInformation";
import EducationData from "./components/EducationData";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TherapistFormData } from "./components/TherapistFormContext";

const SignupForm = (): JSX.Element => {
  const [formData, setFormData] = useState<signupParamsTherapist>({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    languages: [],
    specialization: [],
    experience: "",
    qualification: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [page, setPage] = useState<number>(1);

  const { signupTherapist: signup, loading } = useAuthStore();

  return (
    <TherapistFormData.Provider value={{ formData, setFormData, handleChange }}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          signup(formData);
        }}
      >
        {page === 1 ? (
          <div>
            <h1 className="text-2xl text-highlight">Basic Information</h1>
            <hr className="mb-4" />
            <BasicInformation />
            <button
              type="button"
              onClick={() => setPage(2)}
              className="text-center px-8 py-3 rounded-4xl w-full min-w-max font-medium mt-5 cursor-pointer bg-[#45646d] text-white hover:bg-[#2f4858] duration-100"
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl text-highlight">
              Qualification & Experience
            </h1>
            <hr className="mb-4" />
            <EducationData />

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

            <button
              type="button"
              className="flex items-center gap-1 text-xl mt-4 hover:underline cursor-pointer"
              onClick={() => setPage(1)}
            >
              <IoMdArrowRoundBack /> Previous
            </button>
          </div>
        )}
      </form>
    </TherapistFormData.Provider>
  );
};
export default SignupForm;
