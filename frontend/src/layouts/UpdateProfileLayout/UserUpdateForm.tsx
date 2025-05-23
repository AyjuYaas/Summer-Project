import { JSX, useEffect, useRef, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import genderData from "../TherapistAuthLayout/data/gender-data";
import { FaCamera } from "react-icons/fa";
import { updateParamsUser } from "../../types/user.types";
import { axiosInstance } from "../../lib/Axios";

const UserUpdateForm = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { loading, updateProfile } = useUserStore();

  const [formData, setFormData] = useState<updateParamsUser>({
    name: "",
    email: "",
    phone: "",
    birthDate: new Date(),
    gender: "",
    image: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axiosInstance.get("/users/update-details");
        if (res.data.success) {
          const userData = res.data.user;
          console.log("User data:", userData);
          setFormData({
            ...userData,
            birthDate: new Date(userData.birthDate), // Convert string to Date
          });
        }
      } catch (error) {
        console.error("Error fetching User data:", error);
      }
    };

    getUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(formData, "users");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      {/* ========== Image Update =========== */}
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
          className={`absolute bottom-7 right-1 text-center size-10 flex items-center justify-center bg-[#2f4858] text-[white] hover:bg-[#565b70] duration-100 rounded-full p-1 min-w-max border-0 font-medium cursor-pointer`}
        >
          <FaCamera />
        </button>
      </div>

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
          placeholder="Your New Name"
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
          placeholder="Your New email"
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
          placeholder="Your New Phone"
          pattern="\d{10}"
          maxLength={10}
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
          value={formData.birthDate.toISOString().split("T")[0]}
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
          className="block text-md font-medium text-main-text ml-0.5"
        >
          Gender
        </label>
      </div>
      <div className="mb-5 flex gap-6">
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

      {/* ========== Sign up button =========== */}
      <div>
        <input
          type="submit"
          value={loading ? "Updating..." : "Update"}
          className={`text-center px-8 py-3 rounded-4xl text-main-text w-full min-w-max font-medium mt-5 ${
            loading
              ? "cursor-not-allowed bg-[#a18691]"
              : "cursor-pointer bg-[#2f4858] text-white hover:bg-[#565b70] duration-100"
          }`}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default UserUpdateForm;
