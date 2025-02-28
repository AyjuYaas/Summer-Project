import React, { JSX, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

interface FormDataInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
  age: string;
  gender: string;
}

const SignupForm = (): JSX.Element => {
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
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
          className="block text-md font-medium text-[var(--text)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg"
        />
      </div>

      {/* ================ Email ============ */}
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-[var(--text)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg"
        />
      </div>

      {/* ============ Password ============= */}
      <div>
        <label
          htmlFor="password"
          className="block text-md font-medium text-[var(--text)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg "
        />
      </div>

      {/* ======== Phone =========== */}
      <div>
        <label
          htmlFor="phone"
          className="block text-md font-medium text-[var(--text)] ml-0.5"
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg"
        />
      </div>

      {/* ========== Age ========= */}
      <div>
        <label
          htmlFor="age"
          className="block text-md font-medium text-[var(--text)] ml-0.5"
        >
          Age
        </label>
      </div>
      <div className="mb-5">
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your Age"
          required
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg"
        />
      </div>

      {/* ========== Gender ========= */}
      <div>
        <label
          htmlFor="gender"
          className="block text-md font-medium text-[var(--text)] ml-0.5"
        >
          Gender
        </label>
      </div>
      <div className="mb-5 flex gap-6">
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
            className="mr-1"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
            className="mr-1"
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={formData.gender === "Other"}
            onChange={handleChange}
            className="mr-1"
          />
          Others
        </label>
      </div>

      {/* ========== Sign up button =========== */}
      <div>
        <input
          type="submit"
          value={loading ? "Signing up..." : "Signup"}
          className={`text-center px-8 py-2 rounded-4xl text-[var(--text)] w-full min-w-max border-2 font-medium ${
            loading
              ? "cursor-not-allowed bg-gray-400 border-gray-400"
              : "cursor-pointer filled-btn"
          }`}
          disabled={loading}
        />
      </div>
    </form>
  );
};
export default SignupForm;
