import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { useMatchStore } from "./useMatchStore";

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
  updateProblem: (problem: string, direction: string) => void;
}

export const useUserStore = create<AuthState>((set) => ({
  loading: false,

  updateProfile: async (data, type) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.put(`/${type}/update`, data);
      toast.success("Profile updated successfully");
      useAuthStore.getState().setAuthUser(res.data.user);
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

  updateProblem: async (problem: string, direction: string) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.put("/users/problems", { problem });
      toast.success("Successfully Posted your Problem");
      if (direction === "prediction") {
        useAuthStore.getState().setAuthUser(res.data.problems);
      } else {
        useMatchStore.getState().getRecommendations();
      }
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
