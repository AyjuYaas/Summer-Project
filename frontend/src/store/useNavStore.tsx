/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";

interface Therapist {
  name: string;
  image: string;
  experience: number;
  rating: number;
  specialization: string[];
  reviewCount: number;
}

interface StoreInterface {
  therapists: Therapist[];
  loading: boolean;
  getTherapists: () => void;
}

export const useNavStore = create<StoreInterface>((set) => ({
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
}));
