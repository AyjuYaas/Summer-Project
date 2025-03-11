import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";
import { useMatchStore } from "./useMatchStore";

interface Message {
  sender: string;
  senderType: string;
  receiver: string;
  receiverType: string;
  text?: string;
  image?: string;
  createdAt: string;
}

interface MessageState {
  messages: Message[];
  loading: boolean;
  sendMessage: (text: string, image: string, receiverId: string) => void;
  getMessages: (receiverId: string) => void;
  listenToMessages: () => void;
  stopListeningToMessages: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  loading: false,

  sendMessage: async (text, image, receiverId) => {
    try {
      let senderType: string;
      let receiverType: string;
      if (useAuthStore.getState().authType === "user") {
        senderType = "User";
        receiverType = "Therapist";
      } else {
        senderType = "Therapist";
        receiverType = "User";
      }
      set((state) => ({
        messages: [
          ...state.messages,
          {
            sender: useAuthStore.getState().authUser?._id || "default",
            senderType: senderType,
            receiver: receiverId,
            receiverType: receiverType,
            text: text,
            image: image,
            createdAt: new Date().toISOString(),
          },
        ],
      }));
      await axiosInstance.post("/messages/send", {
        text,
        image,
        receiverId,
      });
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
    }
  },

  getMessages: async (receiverId) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(
        `/messages/conversation/${receiverId}`
      );
      set({ messages: res.data.messages });
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
    } finally {
      set({ loading: false });
    }
  },

  listenToMessages: async () => {
    try {
      const socket = getSocket();
      socket.on("newMessage", ({ message }: { message: Message }) => {
        set((state) => ({ messages: [...state.messages, message] }));
        const match = useMatchStore
          .getState()
          .matches.find((m) => m._id === message.sender);
        toast.success(`New Message from ${match?.name}`);
      });
    } catch (error: any) {
      console.log("error");
    }
  },
  stopListeningToMessages: async () => {
    try {
      const socket = getSocket();
      if (socket) {
        socket.off("newMessage");
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
