import { JSX } from "react";
import UserUpdateForm from "./UserUpdateForm";
import { useAuthStore } from "../../store/useAuthStore";
import TherapistUpdateForm from "./TherapistUpdateForm";

const UpdateProfileLayout = (): JSX.Element => {
  const { authType } = useAuthStore();

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center p-4">
      <div
        className={`w-full max-w-120 lg:max-w-160 p-10 md:p-15 rounded-2xl flex flex-col items-start justify-between shadow-2xl xl:text-xl ${
          authType === "user" ? "bg-[var(--cbg-five)]" : "bg-[var(--cbg-four)]"
        }`}
      >
        <div className="text-3xl font-bold text-[var(--text)] w-full">
          <p className="xl:text-4xl flex flex-col justify-start items-start gap-1">
            <span className="font-light">Update</span>
            <span className="font-fancy tracking-wider">Your Profile</span>
          </p>
        </div>
        <p className="text-lg lg:text-xl my-5 font-bold font-fancy tracking-wider text-[var(--text)]">
          Update the fields you want to change
        </p>
        <div className="w-full">
          {authType === "user" ? <UserUpdateForm /> : <TherapistUpdateForm />}
        </div>
      </div>
    </div>
  );
};
export default UpdateProfileLayout;
