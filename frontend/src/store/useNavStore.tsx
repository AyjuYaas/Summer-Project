/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import { NavState } from "../types/store.types";

export const useNavStore = create<NavState>((set) => ({
  therapists: [],
  loading: false,
  getTherapists: async () => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get("/all-therapist");
      set({ therapists: response.data.therapist });
    } catch (error: any) {
      console.log("Network Error" + error);
    } finally {
      set({ loading: false });
    }
  },

  resetTherapists: () => set({ therapists: [] }),
}));
