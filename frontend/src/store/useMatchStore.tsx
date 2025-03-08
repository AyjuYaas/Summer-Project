import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

interface Match {
  _id: string;
  name: string;
  image: string;
}

interface Recommendation {
  _id: string;
  name: string;
  image: string;
  specialization: string[];
  experience: number;
  rating: number;
}

interface Therapists {
  _id: string;
  name: string;
  image: string;
  rating: number;
  experience: number;
  specialization: string[];
}

interface MatchState {
  matches: Match[];
  loading: boolean;
  recommendations: Recommendation[];
  therapists: Therapists[];
  getMatches: () => void;
  getRecommendations: () => void;
  getTherapists: () => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  loading: false,
  recommendations: [],
  therapists: [],

  getMatches: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/matches");
      set({ matches: res.data.matches });
    } catch (error: any) {
      set({ matches: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  getRecommendations: async () => {
    try {
      const res = await axiosInstance.get("/matches/get-recommendation");
      set({ recommendations: res.data.therapists });
    } catch (error: any) {
      set({ recommendations: [] });
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  getTherapists: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/matches/get-therapist");
      set({ therapists: res.data.therapists });
    } catch (error: any) {
      set({ therapists: [] });
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
