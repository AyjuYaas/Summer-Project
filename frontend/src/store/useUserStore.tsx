import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

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
  updateProblem: (problem: string) => void;
}

export const useUserStore = create<AuthState>((set) => ({
  loading: false,

  updateProfile: async (data, type) => {
    try {
      set({ loading: true });
      await axiosInstance.put(`/${type}/update`, data);
      toast.success("Profile updated successfully");
      useAuthStore.getState().checkAuth();
    } catch (error) {
      console.log(`Error on update user: ${error}`);
      toast.error("Something went wrong!");
    } finally {
      set({ loading: false });
    }
  },

  updateProblem: async (problem: string) => {
    try {
      set({ loading: true });
      await axiosInstance.put("/users/problems", { problem });
      toast.success("Successfully Posted your Problem");
      useAuthStore.getState().checkAuth();
    } catch (error) {
      console.log(`Error on profile update: ${error}`);
      toast.error("Error fetching your problem");
    } finally {
      set({ loading: false });
    }
  },
}));
