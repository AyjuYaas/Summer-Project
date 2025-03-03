import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

interface FormDataUser {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  image: string;
}

interface FormDataTherapist {
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

interface AuthState {
  loading: boolean;
  updateProfile: (
    params: FormDataUser | FormDataTherapist,
    type: string
  ) => void;
}

export const useUserStore = create<AuthState>((set) => ({
  loading: false,

  updateProfile: async (data, type) => {
    try {
      set({ loading: true });
      await axiosInstance.put(`/${type}/update`, data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(`Error on update user: ${error}`);
      toast.error("Something went wrong!");
    } finally {
      set({ loading: false });
    }
  },
}));
