/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { useMatchStore } from "./useMatchStore";
import { UserStore } from "../types/store.types";

export const useUserStore = create<UserStore>((set) => ({
  loading: false,
  loadingRemove: false,
  loadingReview: false,
  loadingRemoveRequest: false,
  loadingPreference: false,
  existingReview: null,
  preference: null,

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

  getPreference: async () => {
    try {
      set({ loadingPreference: true });
      const res = await axiosInstance.get("/users/get-preference");
      if (res.data.success) {
        set({ preference: res.data.preference });
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      set({ loadingPreference: false });
    }
  },

  updateProblem: async (preference) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.put("/users/problems", preference);

      if (res.data.success) {
        toast.success("Successfully Posted your Problem");

        set({ preference: res.data.preference });
        return true;
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
    return false;
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
