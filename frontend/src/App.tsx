import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ReactLoading from "react-loading";

// ======== Nav Routes =============
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TherapistList from "./pages/TherapistList";

// ======== User Routes =============
import Login from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";

import FindTherapist from "./pages/FindTherapist";

// ======== Therapist Routes =============
import TherapistLogin from "./pages/TherapistLogin";
import TherapistDashboard from "./pages/TherapistDashboard";

// ======== Profile Update Routes =============
import UpdateProfile from "./pages/UpdateProfile";

// ======== Default Routes =============
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// ======== Auth and Toast =============
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/Chat";
import { useNavStore } from "./store/useNavStore";
import GetStarted from "./pages/GetStarted";
import { useMatchStore } from "./store/useMatchStore";
import { useMessageStore } from "./store/useMessageStore";

export default function App(): React.ReactElement {
  const { checkAuth, authUser, authType, checkingAuth } = useAuthStore();
  const { getTherapists } = useNavStore();
  const {
    listenToNewRequest,
    stopListeningToRequest,
    listenToRespondRequest,
    stopListeningToResponse,
  } = useMatchStore();

  const { listenToMessages, stopListeningToMessages } = useMessageStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getTherapists();
  }, [getTherapists]);

  useEffect(() => {
    if (authUser) {
      listenToMessages();
      return () => {
        stopListeningToMessages();
      };
    }
  }, [listenToMessages, stopListeningToMessages, authUser]);

  useEffect(() => {
    if (authUser && authType === "therapist") {
      listenToNewRequest();
      return () => {
        stopListeningToRequest();
      };
    } else if (authUser && authType === "user") {
      listenToRespondRequest();
      return () => {
        stopListeningToResponse();
      };
    }
  }, [
    listenToNewRequest,
    stopListeningToRequest,
    listenToRespondRequest,
    stopListeningToResponse,
    authUser,
    authType,
  ]);

  if (checkingAuth)
    return (
      <div className="min-h-screen flex flex-col gap-2 justify-center items-center">
        <ReactLoading type="spin" color="#303b36" />
        <h1 className="text-xl text-[#303b36] font-extrabold">Loading...</h1>
      </div>
    );

  return (
    <div>
      <Toaster />
      <Navbar />

      <Routes>
        {/* Default Nav Routes  */}
        <Route
          path="/"
          element={
            !authUser ? (
              <Home />
            ) : authType === "user" ? (
              <Navigate to={"/user/home"} />
            ) : (
              <Navigate to={"/therapist/home"} />
            )
          }
        />
        <Route path="/about" element={<About />} />

        <Route path="/therapist-list" element={<TherapistList />} />
        <Route path="/contact" element={<Contact />} />

        {/* Login Route */}
        <Route
          path="/user/login"
          element={
            !authUser ? (
              <Login />
            ) : authType === "user" ? (
              <Navigate to="/user/home" />
            ) : authType === "therapist" ? (
              <Navigate to="/therapist/home" />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/get-started"
          element={
            !authUser || authType === "therapist" ? (
              <GetStarted />
            ) : (
              <Navigate to="/user/find-therapist" />
            )
          }
        />

        {/* User Routes */}
        <Route
          path="/user/home"
          element={
            authUser && authType === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />
        <Route
          path="/user/update-profile"
          element={
            authUser && authType === "user" ? (
              <UpdateProfile />
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />
        {/* <Route path="/user/find-therapist" element={<FindTherapist />} /> */}
        <Route
          path="/user/find-therapist"
          element={
            authUser && authType === "user" ? (
              <FindTherapist />
            ) : (
              <Navigate to="/get-started" />
            )
          }
        />

        {/* Therapist Routes */}
        <Route
          path="/therapist/login"
          element={
            !authUser ? (
              <TherapistLogin />
            ) : authUser && authType === "therapist" ? (
              <Navigate to="/therapist/home" />
            ) : (
              <Navigate to="/user/home" />
            )
          }
        />
        <Route
          path="/therapist/home"
          element={
            authUser && authType === "therapist" ? (
              <TherapistDashboard />
            ) : (
              <Navigate to="/therapist/login" />
            )
          }
        />
        <Route
          path="/therapist/update-profile"
          element={
            authUser && authType === "therapist" ? (
              <UpdateProfile />
            ) : (
              <Navigate to="/therapist/login" />
            )
          }
        />

        {/* Chat Page */}
        <Route
          path="chat/:id"
          element={authUser ? <Chat /> : <Navigate to="/user/login" />}
        />

        {/* Admin Route */}
        <Route path="/admin" element={<Admin />} />

        {/* Wrong Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
