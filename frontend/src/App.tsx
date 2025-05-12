import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ReactLoading from "react-loading";

// ======== Nav Routes =============
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TherapistList from "./pages/TherapistList";

// ======== General Pages =============
const GetStarted = lazy(() => import("./pages/GetStarted"));
const Chat = lazy(() => import("./pages/Chat"));
const VideoCall = lazy(() => import("./pages/VideoCall"));

// ======== User Routes =============
const Login = lazy(() => import("./pages/UserLogin"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const FindTherapist = lazy(() => import("./pages/FindTherapist"));

// ======== Therapist Routes =============
const TherapistLogin = lazy(() => import("./pages/TherapistLogin"));
const TherapistDashboard = lazy(() => import("./pages/TherapistDashboard"));

// ======== Profile Update Routes =============
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));

// ======== Default Routes =============
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ======== Auth and Toast =============
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useMatchStore } from "./store/useMatchStore";
import { useMessageStore } from "./store/useMessageStore";
import Test from "./pages/Test";

export default function App(): React.ReactElement {
  const { checkAuth, authUser, authType, checkingAuth } = useAuthStore();
  const [openNavbar, setOpenNavbar] = useState<boolean>(false);

  const {
    listenToNewRequest,
    stopListeningToRequest,
    listenToRespondRequest,
    stopListeningToResponse,
  } = useMatchStore();

  const {
    listenToMessages,
    stopListeningToMessages,
    listenToVideoCall,
    stopListeningToVideoCall,
  } = useMessageStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      listenToMessages();
      return () => stopListeningToMessages();
    }
  }, [authUser, listenToMessages, stopListeningToMessages]);

  useEffect(() => {
    if (authUser) {
      listenToVideoCall();
      return () => stopListeningToVideoCall();
    }
  }, [authUser, listenToVideoCall, stopListeningToVideoCall]);

  useEffect(() => {
    if (authUser && authType === "therapist") {
      listenToNewRequest();
      return () => stopListeningToRequest();
    } else if (authUser && authType === "user") {
      listenToRespondRequest();
      return () => stopListeningToResponse();
    }
  }, [
    authUser,
    authType,
    listenToNewRequest,
    stopListeningToRequest,
    listenToRespondRequest,
    stopListeningToResponse,
  ]);

  if (checkingAuth)
    return (
      <div className="min-h-screen flex flex-col gap-2 justify-center items-center">
        <ReactLoading type="spin" color="#303b36" />
        <h1 className="text-xl text-[#303b36] font-extrabold">Loading...</h1>
      </div>
    );

  const hideNavbar = location.pathname.startsWith("/video-call");

  return (
    <div>
      {openNavbar && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 pointer-events-auto transition-opacity duration-300"></div>
      )}
      <Toaster />
      {!hideNavbar && (
        <Navbar openNavbar={openNavbar} setOpenNavbar={setOpenNavbar} />
      )}
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col gap-2 justify-center items-center z-40 w-full">
            <ReactLoading type="spin" color="#303b36" />
            <h1 className="text-xl text-[#303b36] font-extrabold">
              Loading...
            </h1>
          </div>
        }
      >
        <Routes>
          {/* Default Nav Routes */}
          <Route path="/" element={<Home />} />
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

          {/* Chat and Call */}
          <Route
            path="/chat/:id"
            element={authUser ? <Chat /> : <Navigate to="/user/login" />}
          />
          <Route
            path="/video-call/:receiverId"
            element={authUser ? <VideoCall /> : <Navigate to="/user/login" />}
          />

          {/* Admin and Test */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/test" element={<Test />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
