/* eslint-disable @typescript-eslint/no-explicit-any */
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
  loadingRemove: boolean;
  loadingReview: boolean;
  existingReview: { rating: number; reviewText: string } | null;

  updateProfile: (
    params: FormDataUser | FormDataTherapist,
    type: string
  ) => void;
  updateProblem: (problem: string) => void;
  removeTherapist: (id: string) => void;
  reviewTherapist: (id: string, rating: number, reviewText: string) => void;
  getExistingReview: (id: string) => void;
}

export const useUserStore = create<AuthState>((set) => ({
  loading: false,
  loadingRemove: false,
  loadingReview: false,
  loadingRemoveRequest: false,

  existingReview: null,

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

  updateProblem: async (problem: string) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.put("/users/problems", { problem });
      toast.success("Successfully Posted your Problem");

      useAuthStore.getState().setAuthUser(res.data.problems);
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

  removeTherapist: async (id: string) => {
    try {
      set({ loadingRemove: true });
      const res = await axiosInstance.post(`/users/removeTherapist/${id}`);
      if (res.data.success) {
        toast.success("Therapist removed successfully");
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
      set({ loadingRemove: false });
      useMatchStore.getState().getMatches();
    }
  },

  reviewTherapist: async (id, rating, reviewText) => {
    try {
      set({ loadingReview: true });
      await axiosInstance.post("/users/reviewTherapist", {
        therapistId: id,
        rating: rating,
        reviewText: reviewText,
      });
      toast.success("Review Successful");
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
      set({ loadingReview: false });
    }
  },

  getExistingReview: async (id) => {
    try {
      const res = await axiosInstance.get(`/users/existing-review/${id}`);
      set({
        existingReview: {
          rating: res.data.rating,
          reviewText: res.data.reviewText,
        },
      });
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
    }
  },
}));
