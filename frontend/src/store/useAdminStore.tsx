import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import { AdminState } from "../types/store.types";
import toast from "react-hot-toast";

export const useAdminStore = create<AdminState>((set) => ({
  loadingPendingTherapists: false,
  loading: false,
  pendingTherapists: [],

  getPendingTherapists: async () => {
    try {
      set({ loadingPendingTherapists: true });
      const res = await axiosInstance.get("/admin/get-therapist/pending");

      if (res.data.success) {
        set({ pendingTherapists: res.data.therapists });
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ loadingPendingTherapists: false });
    }
  },

  respondTherapist: async (_id, status) => {
    try {
      const res = await axiosInstance.put(`/admin/respond-therapist/${_id}`, {
        status,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        set((state) => ({
          pendingTherapists: state.pendingTherapists.filter(
            (t) => t._id !== _id
          ),
        }));
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    return false;
  },

  updateProfile: async (updateData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.put("/admin/update-profile", updateData);

      if (res.data.success) {
        toast.success("Profile Update Successful");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  resetPendingTherapists: () => set({ pendingTherapists: [] }),
}));
