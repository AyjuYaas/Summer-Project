/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";

interface Match {
  _id: string;
  name: string;
  image: string;
}

interface Pending {
  _id: string;
  user: {
    _id: string;
    name: string;
    gender: string;
    image: string;
    problemText: string;
  };
  therapist: { _id: string; name: string; image: string };
  status: string;
}

interface Review {
  _id: string;
  user: { name: string; image: string };
  therapist: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface Therapists {
  _id: string;
  name: string;
  image: string;
  specialization: string[];
  experience: number;
  qualification: string[];
  gender: string;
  rating: number;
  reviewCount: number;
}

interface MatchState {
  matches: Match[];
  request: Pending[];
  reviews: Review[];

  loading: boolean;
  loadingRecommendations: boolean;
  loadingTherapists: boolean;
  loadingSelection: boolean;
  loadingPending: boolean;
  loadingRemoveRequest: boolean;
  loadingReview: boolean;

  recommendations: Therapists[];
  therapists: Therapists[];
  hasMore: boolean;

  getMatches: () => void;
  getRecommendations: () => void;
  getTherapists: (page: number) => void;
  selectTherapist: (therapistId: string) => void;
  getPendingRequest: () => void;
  respondRequest: (userId: string, response: string) => void;
  deleteRequest: (id: string) => void;
  getReviews: (id: string) => void;

  listenToNewRequest: () => void;
  stopListeningToRequest: () => void;
  listenToRespondRequest: () => void;
  stopListeningToResponse: () => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  matches: [],
  request: [],
  reviews: [],

  loading: false,
  loadingRecommendations: false,
  loadingTherapists: false,
  loadingSelection: false,
  loadingPending: false,
  loadingRemoveRequest: false,
  loadingReview: false,

  recommendations: [],
  therapists: [],
  hasMore: true,

  getMatches: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/matches");
      set({ matches: res.data.matches });
    } catch (error: any) {
      if (error.response) {
        // Handle API response errors (e.g., validation errors, unauthorized access)
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else if (error.request) {
        // Handle network errors (e.g., no response from the server)
        toast.error("Network error. Please check your internet connection.");
      } else {
        // Handle other errors
        toast.error("Something went wrong. Please try again.");
      }
      // ========== Reset Matches State ============
      set({ matches: [] });
    } finally {
      set({ loading: false });
    }
  },

  getRecommendations: async () => {
    try {
      set({ loadingRecommendations: true });
      const res = await axiosInstance.get("/matches/get-recommendation");
      set({ recommendations: res.data.therapists });
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
      set({ recommendations: [] });
    } finally {
      set({ loadingRecommendations: false });
    }
  },

  getTherapists: async (page) => {
    try {
      set({ loadingTherapists: true });
      const res = await axiosInstance.get(
        `/matches/get-therapist?page=${page}`
      );
      set((state) => ({
        therapists:
          page === 1
            ? res.data.therapists
            : [...state.therapists, ...res.data.therapists],

        hasMore: res.data.hasMore,
      }));
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
      set({ therapists: [] });
    } finally {
      set({ loadingTherapists: false });
    }
  },

  selectTherapist: async (therapistId) => {
    try {
      set({ loadingSelection: true });
      await axiosInstance.post(`matches/selectTherapist/${therapistId}`);
      set((state) => ({
        recommendations: state.recommendations.filter(
          (rec) => rec._id !== therapistId
        ),
        therapists: state.therapists.filter((rec) => rec._id !== therapistId),
      }));
      toast.success("Request sent to the Therapist");
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
      set({ loadingSelection: false });
    }
  },

  getPendingRequest: async () => {
    try {
      set({ loading: true });
      const req = await axiosInstance.get(`matches/get-requests/`);
      set({ request: req.data.pendingRequests });
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

  respondRequest: async (requestId, response) => {
    try {
      await axiosInstance.post("/therapists/request/respond", {
        requestId: requestId,
        response: response.toLowerCase(),
      });
      toast.success(`${response}ed Successfully`);
      useMatchStore.getState().getMatches();
      useMatchStore.getState().getPendingRequest();
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

  deleteRequest: async (id) => {
    try {
      set({ loadingRemoveRequest: true });
      await axiosInstance.post("/users/removeRequest", {
        requestId: id,
      });
      set((state) => ({
        request: state.request.filter((req) => req._id !== id), // Remove document by id
      }));
      toast.success("Removed Request Successfully");
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
      set({ loadingRemoveRequest: false });
    }
  },

  getReviews: async (id) => {
    try {
      set({ loadingReview: true });
      const res = await axiosInstance.get(`/matches/get-reviews/${id}`);
      set({ reviews: res.data.reviews });
    } catch (error: any) {
      console.log(error);
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

  // Listen to new Request by Therapist
  listenToNewRequest: () => {
    try {
      const socket = getSocket();

      socket.on("newRequest", (requestData: any) => {
        toast.success(`You got a new request from ${requestData.name}`);
        useMatchStore.getState().getPendingRequest();
      });
    } catch (error) {
      console.log(error);
    }
  },
  stopListeningToRequest: () => {
    try {
      const socket = getSocket();
      if (socket) {
        socket.off("newRequest");
      }
    } catch (error) {
      console.log(error);
    }
  },

  listenToRespondRequest: () => {
    try {
      const socket = getSocket();
      socket.on("requestResponse", (responseData: any) => {
        if (responseData.success)
          toast.success(`${responseData.name} Accepted Your Request`);
        else toast.error(`${responseData.name} Rejected Your Request`);
        useMatchStore.getState().getMatches();
        useMatchStore.getState().getPendingRequest();
      });
    } catch (error) {
      console.log(error);
    }
  },
  stopListeningToResponse: () => {
    try {
      const socket = getSocket();
      if (socket) {
        socket.off("requestResponse");
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
