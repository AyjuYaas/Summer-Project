import { JSX, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import genderData from "../TherapistAuthLayout/data/gender-data";
import specializationData from "../TherapistAuthLayout/data/specializations-data";
import Switch from "react-switch";
import { FaCamera } from "react-icons/fa";
import { updateParamsTherapist } from "../../types/therapist.types";
import { axiosInstance } from "../../lib/Axios";
import QualificationSelector from "../TherapistAuthLayout/components/QualificationSelector";
import LanguageSelector from "../TherapistAuthLayout/components/LanguageSelector";

const TherapistUpdateForm = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { loading, updateProfile } = useUserStore();

  const [formData, setFormData] = useState<updateParamsTherapist>({
    name: "",
    email: "",
    phone: "",
    specialization: [],
    gender: "",
    languages: [],
    image: "",
    experience: "",
    qualification: [],
    availability: false,
  });

  useEffect(() => {
    const getTherapistData = async () => {
      try {
        const res = await axiosInstance.get("/therapists/update-details");
        if (res.data.success) {
          const therapistData = res.data.user;
          setFormData(therapistData);
        }
      } catch (error) {
        console.error("Error fetching therapist data:", error);
      }
    };

    getTherapistData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(formData, "therapists");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailabilityChange = (e: boolean) => {
    setFormData({ ...formData, availability: e });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : "";
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: typeof reader.result === "string" ? reader.result : "",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ========== Image Upload =========== */}
      <div className="mb-5 flex mx-auto relative w-max p-0">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {formData.image && (
          <div className="my-5">
            <img
              src={formData.image}
              alt={formData.name + "-img"}
              className="size-40 rounded-full border-2 bg-white object-cover"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-7 right-1 text-center size-10 flex items-center justify-center bg-[#2f4858] text-white hover:bg-[#565b70] duration-100 rounded-full p-1 min-w-max border-0 font-medium cursor-pointer"
        >
          <FaCamera />
        </button>
      </div>

      {/* Availability */}
      <div className="mb-1">
        <label className="block text-md font-medium text-highlight ml-0.5">
          Availability
        </label>
      </div>
      <div className="mb-5">
        <Switch
          onChange={handleAvailabilityChange}
          checked={formData.availability}
          className="react-switch"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block text-md font-medium text-highlight ml-0.5">
          Name
        </label>
      </div>
      <div className="mb-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your New Name"
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-md font-medium ml-0.5 text-highlight">
          Email
        </label>
      </div>
      <div className="mb-5">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your New email"
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-md font-medium ml-0.5 text-highlight">
          Phone
        </label>
      </div>
      <div className="mb-5">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your New Phone"
          pattern="\d{10}"
          maxLength={10}
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-md font-medium text-highlight ml-0.5">
          Gender
        </label>
      </div>
      <div className="mb-5 flex gap-6 items-center">
        {genderData.map((gender: string) => (
          <label key={gender} className="flex items-center">
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
              language: [...(prev.languages || []), value],
            }));
          }
        }}
        onRemoveLanguage={(index) => {
          setFormData((prev) => ({
            ...prev,
            language: prev.languages?.filter((_, i) => i !== index) || [],
          }));
        }}
      />

      {/* Specialization */}
      <div>
        <label className="block text-md font-medium text-highlight ml-0.5">
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
              id={`spec-${index}`}
              value={specialization}
              checked={formData.specialization.includes(specialization)}
              onChange={handleSpecializationChange}
              className="border border-button-border rounded-lg h-4 w-4"
            />
            <label htmlFor={`spec-${index}`}>{specialization}</label>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div>
        <label className="block text-md font-medium text-highlight ml-0.5">
          Experience (in Years)
        </label>
      </div>
      <div className="mb-5">
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Year/s of experience"
          required
          className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
        />
      </div>

      {/* Qualification */}
      <QualificationSelector
        qualifications={formData.qualification || []}
        onAddQualification={(value) => {
          if (!formData.qualification?.includes(value)) {
            setFormData((prev) => ({
              ...prev,
              qualification: [...(prev.qualification || []), value],
            }));
          }
        }}
        onRemoveQualification={(index) => {
          setFormData((prev) => ({
            ...prev,
            qualification:
              prev.qualification?.filter((_, i) => i !== index) || [],
          }));
        }}
      />

      {/* Submit Button */}
      <div>
        <input
          type="submit"
          value={loading ? "Updating..." : "Update"}
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

export default TherapistUpdateForm;
