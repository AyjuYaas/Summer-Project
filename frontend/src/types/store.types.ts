import {
  Preference,
  PreferenceForm,
  signupParamsUser,
  updateParamsUser,
  User,
} from "../types/user.types";
import {
  pendingTherapist,
  signupParamsTherapist,
  Therapist,
  updateParamsTherapist,
} from "../types/therapist.types";
import { Match, matchedTherapists, Pending, Review } from "./match.types";
import { Document, Message } from "./chat.types";
import { Admin } from "./admin.types";

export interface UserStore {
  loading: boolean;
  loadingRemove: boolean;
  loadingReview: boolean;
  loadingRemoveRequest: boolean;
  loadingPreference: boolean;
  existingReview: { rating: number; reviewText: string } | null;
  preference: Preference | null;

  updateProfile: (
    params: updateParamsUser | updateParamsTherapist,
    type: string
  ) => void;

  getPreference: () => void;
  resetPreference: () => void;

  updateProblem: (preference: PreferenceForm) => Promise<boolean>;

  removeTherapist: (id: string) => void;

  reviewTherapist: (id: string, rating: number, reviewText: string) => void;

  getExistingReview: (id: string) => void;
  resetExistingReview: () => void;
}

export interface AuthState {
  authUser: User | Therapist | Admin | null;
  authType: string;
  checkingAuth: boolean;
  loading: boolean;
  setAuthUser: (user: User | Therapist) => void;
  signupUser: (params: signupParamsUser) => void;
  loginUser: (credentials: { email: string; password: string }) => void;
  signupTherapist: (params: signupParamsTherapist) => void;
  loginTherapist: (credentials: { email: string; password: string }) => void;
  loginAdmin: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  checkAuth: () => void;
}

export interface MatchState {
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

  recommendations: matchedTherapists[];
  therapists: matchedTherapists[];
  hasMore: boolean;

  getMatches: () => void;
  resetMatches: () => void;

  getRecommendations: () => void;
  resetRecommendations: () => void;

  getTherapists: (page: number) => void;
  resetTherapists: () => void;

  selectTherapist: (therapistId: string) => void;

  getPendingRequest: () => void;
  resetPendingRequest: () => void;

  respondRequest: (userId: string, response: string) => void;
  deleteRequest: (id: string) => void;

  getReviews: (id: string) => void;
  resetReviews: () => void;

  listenToNewRequest: () => void;
  stopListeningToRequest: () => void;
  listenToRespondRequest: () => void;
  stopListeningToResponse: () => void;
}

export interface MessageState {
  messages: Message[];
  documents: Document[];

  videoToken: string;
  callStatus: boolean;

  cursor: string;
  cursorDocument: string;

  hasMore: boolean;
  hasMoreDocument: boolean;

  loading: boolean;
  loadSendingDocument: boolean;
  loadingDocuments: boolean;
  loadToken: boolean;

  sent: boolean;
  sentDocument: boolean;
  deletingDocument: boolean;

  sendMessage: (text: string, image: string, receiverId: string) => void;
  getMessages: (receiverId: string, cursor: string) => void;
  sendDocument: (
    pdf: string,
    pdfName: string,
    description: string,
    receiverId: string
  ) => void;
  getDocuments: (receiverId: string, cursor: string) => void;

  getVideoToken: (receiverId: string) => void;

  deleteDocument: (id: string) => void;

  listenToMessages: () => void;
  stopListeningToMessages: () => void;

  listenToVideoCall: () => void;
  stopListeningToVideoCall: () => void;

  resetMessages: () => void;
  resetDocuments: () => void;
}

export interface NavState {
  therapists: matchedTherapists[];
  loading: boolean;
  getTherapists: () => void;
  resetTherapists: () => void;
}

export interface AdminState {
  loadingPendingTherapists: boolean;
  loading: boolean;
  pendingTherapists: pendingTherapist[];

  getPendingTherapists: () => void;
  respondTherapist: (_id: string, status: string) => Promise<boolean>;
  updateProfile: (updateData: {
    name: string;
    email: string;
    newPassword: string;
    oldPassword: string;
  }) => void;
  resetPendingTherapists: () => void;
}
