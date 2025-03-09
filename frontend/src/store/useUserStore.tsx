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
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
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
    } catch (error: any) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      set({ loading: false });
    }
  },
}));
