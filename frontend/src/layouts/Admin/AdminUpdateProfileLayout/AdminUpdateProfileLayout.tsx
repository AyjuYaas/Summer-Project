import { JSX, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { Admin } from "../../../types/admin.types";
import { FaExclamation } from "react-icons/fa";
import { useAdminStore } from "../../../store/useAdminStore";

interface FormData {
  name: string;
  email: string;
  newPassword: string;
  oldPassword: string;
}

const AdminUpdateProfileLayout = (): JSX.Element => {
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    name: authUser?.name || "",
    email: (authUser as unknown as Admin)?.email || "",
    newPassword: "",
    oldPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { updateProfile, loading } = useAdminStore();

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center p-4 bg-gray-200">
      <div className="w-full max-w-120 lg:max-w-140 bg-cbg-two p-10 md:p-15 rounded-2xl flex flex-col items-center justify-between shadow-2xl xl:text-xl">
        <div className="text-4xl font-bold text-main-text my-3 mb-3 w-full">
          <p className="flex flex-col justify-start items-start gap-1">
            <span className="font-light">Update</span>
            <span className="font-fancy tracking-wider">Your Profile</span>
          </p>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            updateProfile(formData);
          }}
          className="w-full"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-highlight ml-0.5"
            >
              Name <span className="text-red-600">*</span>
            </label>
          </div>
          <div className="mb-5">
            <input
              type="name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className={
                "block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
              }
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-highlight ml-0.5"
            >
              Email <span className="text-red-600">*</span>
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
              className={
                "block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
              }
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-md font-medium text-highlight ml-0.5"
            >
              New Password
            </label>
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Your New password"
              className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
            />
            <span className="text-xs flex items-center mt-1 font-bold text-main-text">
              <FaExclamation />
              Only Enter if you want a new password else leave it blank
            </span>
          </div>

          <div>
            <label
              htmlFor="oldPassword"
              className="block text-md font-medium text-highlight ml-0.5"
            >
              Existing Password <span className="text-red-600">*</span>
            </label>
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Your existing password"
              className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
              required
            />
          </div>

          <div>
            <input
              type="submit"
              value={loading ? "Updating..." : "Update"}
              className={`text-center px-8 py-3 rounded-4xl text-main-text w-full min-w-max font-medium mt-5 ${
                loading
                  ? "cursor-not-allowed bg-[#a18691]"
                  : "cursor-pointer bg-[#2f4858] text-white-text hover:bg-[#565b70] duration-100"
              }`}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminUpdateProfileLayout;
