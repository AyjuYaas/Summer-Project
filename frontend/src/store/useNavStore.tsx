import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

interface Therapist {
  name: string;
  image: string;
  experience: number;
  rating: number;
  specialization: string[];
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
