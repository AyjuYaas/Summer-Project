import { JSX, useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";
import genderData from "../TherapistAuthLayout/data/gender-data";
import specializationData from "../TherapistAuthLayout/data/specializations-data";
import { MultiSelect } from "primereact/multiselect";
import qualificationData from "../TherapistAuthLayout/data/qualification-data";
import QualificationLabel from "../TherapistAuthLayout/data/QualificationLabel";

interface Therapist {
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  gender: string;
  image: string;
  experience: string;
  qualification: string[];
  availability: boolean;
}

const TherapistUpdateForm = (): JSX.Element => {
  const { authUser } = useAuthStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { loading, updateProfile } = useUserStore();

  const [formData, setFormData] = useState<Therapist>({
    name: authUser?.name || "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
    specialization: (authUser as unknown as Therapist)?.specialization || [],
    gender: (authUser as unknown as Therapist)?.gender || "",
    image: authUser?.image || "",
    experience: (authUser as unknown as Therapist)?.experience || "",
    qualification: (authUser as unknown as Therapist)?.qualification || [],
    availability: (authUser as unknown as Therapist)?.availability || true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(formData, "therapists");
  };

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
          placeholder="Your New Name"
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg focus:outline-1"
        />
      </div>

      {/* ================ Email ============ */}
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium ml-0.5 text-[var(--highlight)]"
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
          placeholder="Your New email"
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg focus:outline-1"
        />
      </div>

      {/* ======== Phone =========== */}
      <div>
        <label
          htmlFor="phone"
          className="block text-md font-medium ml-0.5 text-[var(--highlight)]"
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
          placeholder="Your New Phone"
          pattern="\d{10}"
          maxLength={10}
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

      {/* ========== Image Update =========== */}
      <div className="mb-5">
        <label
          htmlFor="upload"
          className="block text-md font-medium text-[var(--text)] ml-0.5"
        >
          Profile Image
        </label>
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
              className="w-40 h-full object-cover rounded-full border-2"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`text-center bg-[#2f4858] text-[white] hover:bg-[#565b70] duration-100 mt-1 px-8 py-2 rounded-lg min-w-max border-0 font-medium cursor-pointer`}
        >
          Upload Image
        </button>
      </div>

      {/* ========== Sign up button =========== */}
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
