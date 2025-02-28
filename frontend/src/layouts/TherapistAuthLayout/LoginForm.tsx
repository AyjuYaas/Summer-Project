import { JSX, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { loginTherapist: login, loading } = useAuthStore();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formData);
      }}
    >
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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg"
        />
      </div>

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
          className="block w-full px-3 py-4 border border-[var(--button-border)] rounded-lg "
        />
      </div>

      <div>
        <input
          type="submit"
          value={loading ? "Logging in..." : "Login"}
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
export default LoginForm;
