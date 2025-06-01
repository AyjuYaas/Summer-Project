import { useContext } from "react";
import genderData from "../data/gender-data";
import LanguageSelector from "./LanguageSelector";
import { TherapistFormData } from "./TherapistFormContext";

const BasicInformation = () => {
  const { formData, handleChange, setFormData } = useContext(TherapistFormData);
  return (
    <div>
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

      {/* ========== Gender ========= */}
      <div>
        <label
          htmlFor="gender"
          className="block text-md font-medium text-highlight ml-0.5"
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

      {/* Language Selector */}
      <LanguageSelector
        selectedLanguages={formData.languages || []}
        onAddLanguage={(value) => {
          if (!formData.languages?.includes(value)) {
            setFormData((prev) => ({
              ...prev,
              languages: [...(prev.languages || []), value],
            }));
          }
        }}
        onRemoveLanguage={(index) => {
          setFormData((prev) => ({
            ...prev,
            languages: prev.languages?.filter((_, i) => i !== index) || [],
          }));
        }}
      />
    </div>
  );
};
export default BasicInformation;
