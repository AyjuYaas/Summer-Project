/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";
import { AuthState } from "../types/store.types";

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,

  authType: "",

  checkingAuth: true,

  loading: false,

  setAuthUser: (user) => set({ authUser: user }),

  signupUser: async (signupData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post(
        "/auth/user/signup",
        signupData
      );
      set({ authUser: response.data.user, authType: "user" });
      initializeSocket(response.data.user._id);
      toast.success("Account created successfully");
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

  loginUser: async (credentials) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post("auth/user/login", credentials);

      set({ authUser: response.data.user, authType: "user" });

      initializeSocket(response.data.user._id);

      toast.success("Logged in successfully");
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

  signupTherapist: async (signupData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post(
        "/auth/therapist/signup",
        signupData
      );
      set({ authUser: response.data.therapist, authType: "therapist" });
      initializeSocket(response.data.therapist._id);
      toast.success("Account created successfully");
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

  loginTherapist: async (credentials) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post(
        "auth/therapist/login",
        credentials
      );
      set({ authUser: response.data.therapist, authType: "therapist" });
      initializeSocket(response.data.therapist._id);
      toast.success("Logged in successfully");
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

  logout: async () => {
    try {
      const response = await axiosInstance.post("auth/logout");
      if (response.data.success) {
        set({ authUser: null, authType: "" });
        disconnectSocket();
        toast.success("Logged out successfully");
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
    }
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      initializeSocket(response.data.user._id);
      set({ authUser: response.data.user, authType: response.data.role });
    } catch (error: any) {
      if (error.response?.status === 401) {
        set({ authUser: null, authType: "" });
      } else {
        console.log(`Error checking authentication: ${error}`);
      }
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
