import { JSX, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";

interface FormData {
  email: string;
  password: string;
}

const AdminAuthLayout = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { loginAdmin: login, loading } = useAuthStore();

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center p-4 bg-gray-200">
      <div className="w-full max-w-120 lg:max-w-140 bg-cbg-two p-10 md:p-15 rounded-2xl flex flex-col items-center justify-between shadow-2xl xl:text-xl">
        <div className="text-4xl font-bold text-main-text my-3 mb-3 w-full">
          <p className="flex flex-col justify-start items-start gap-1">
            <span className="font-light">Login</span>
            <span className="font-fancy tracking-wider">As an Admin</span>
          </p>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            login(formData);
          }}
          className="w-full"
        >
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
              className={
                "block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
              }
            />
          </div>

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
              className="block w-full px-3 py-4 border border-button-border rounded-lg focus:outline-1"
            />
          </div>

          <div>
            <input
              type="submit"
              value={loading ? "Logging in..." : "Login"}
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
export default AdminAuthLayout;
