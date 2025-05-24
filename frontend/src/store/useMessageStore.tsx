/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socket.client";
import { useAuthStore } from "./useAuthStore";
import { useMatchStore } from "./useMatchStore";
import VideoToast from "../components/Toast/VideoToast";
import { MessageState } from "../types/store.types";
import { Document, Message } from "../types/chat.types";

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  documents: [],

  videoToken: "",

  cursor: "",
  cursorDocument: "",

  callStatus: false,

  hasMore: true,
  hasMoreDocument: true,

  loading: false,
  loadSendingDocument: false,
  loadingDocuments: false,
  loadToken: false,

  deletingDocument: false,

  sent: true,
  sentDocument: true,

  sendMessage: async (text, image, receiverId) => {
    const previousMessages = [...useMessageStore.getState().messages];
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
      set((state) => ({ sent: !state.sent }));
      await axiosInstance.post("/messages/send", {
        text,
        image,
        receiverId,
      });
    } catch (error: any) {
      // Rollback the messages array to its previous state
      set({ messages: previousMessages });
      if (error.response) {
        console.log(error.response.data.message);
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

  getMessages: async (receiverId, cursor) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(
        `/messages/conversation/${receiverId}?cursor=${cursor}`
      );
      set((state) => ({
        messages: cursor
          ? [...res.data.messages, ...state.messages]
          : res.data.messages,
        cursor: res.data.nextCursor,
        hasMore: res.data.hasMore,
      }));
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

  sendDocument: async (pdf, pdfName, description, receiverId) => {
    try {
      set({ loadSendingDocument: true });
      set((state) => ({ sentDocument: !state.sentDocument }));
      const res = await axiosInstance.post("/messages/send-document", {
        document: pdf,
        description: description || "",
        receiverId: receiverId,
        fileName: pdfName,
      });
      set((state) => ({ documents: [...state.documents, res.data.document] }));
      toast.success("Successfully Uploaded PDF");
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
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
      set({ loadSendingDocument: false });
    }
  },

  getDocuments: async (receiverId, cursor) => {
    try {
      set({ loadingDocuments: true });
      const res = await axiosInstance.get(
        `/messages/get-documents/${receiverId}?cursor=${cursor}`
      );
      set((state) => ({
        documents: cursor
          ? [...res.data.documents, ...state.documents]
          : res.data.documents,
        cursorDocument: res.data.nextCursor,
        hasMoreDocument: res.data.hasMore,
      }));
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
      set({ loadingDocuments: false });
    }
  },

  getVideoToken: async (receiverId) => {
    try {
      set({ loadToken: true });
      const res = await axiosInstance.get("messages/call/getToken", {
        params: {
          receiverId: receiverId,
          name: useAuthStore.getState().authUser?.name,
        },
      });
      set({ videoToken: res.data });
      console.log("One Time");
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
      set({ loadToken: false });
    }
  },

  deleteDocument: async (id) => {
    try {
      set({ deletingDocument: true });
      const res = await axiosInstance.post("/messages/delete-document", {
        documentId: id,
      });
      set((state) => ({
        documents: state.documents.filter((doc) => doc._id !== id), // Remove document by id
      }));
      toast.success(res.data.message);
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
      set({ deletingDocument: false });
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

      socket.on("newDocument", ({ document }: { document: Document }) => {
        set((state) => ({ documents: [...state.documents, document] }));
        const match = useMatchStore
          .getState()
          .matches.find((m) => m._id === document.sender);
        toast.success(`New Document Uploaded by ${match?.name}`);
      });
    } catch (error: any) {
      console.log(error);
    }
  },
  stopListeningToMessages: async () => {
    try {
      const socket = getSocket();
      if (socket) {
        socket.off("newMessage");
        socket.off("newDocument");
      }
    } catch (error) {
      console.log(error);
    }
  },

  listenToVideoCall: async () => {
    try {
      const socket = getSocket();

      socket.on(
        "IncomingVideoCall",
        ({ sender, message }: { sender: string; message: string }) => {
          const match = useMatchStore
            .getState()
            .matches.find((m) => m._id === sender);
          toast.custom(
            (t) => (
              <VideoToast
                t={t}
                match={{
                  id: match?._id || "",
                  image: match?.image || "",
                  name: match?.name || "",
                }}
                message={`${message}`}
                senderLink={`/video-call/${sender}`}
              />
            ),
            { duration: 60000 }
          );
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  },
  stopListeningToVideoCall: async () => {
    try {
      const socket = getSocket();
      if (socket) {
        socket.off("IncomingVideoCall");
      }
    } catch (error) {
      console.log(error);
    }
  },

  resetMessages: () => set({ messages: [], hasMore: true, cursor: "" }), // Reset the messages state
  resetDocuments: () =>
    set({ documents: [], hasMoreDocument: true, cursorDocument: "" }), // Reset the messages state
}));
