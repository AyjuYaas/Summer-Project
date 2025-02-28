import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ReactLoading from "react-loading";

// ======== Nav Routes =============
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Review from "./pages/Review";
import TherapistList from "./pages/TherapistList";

// ======== User Routes =============
import Login from "./pages/UserLogin";
import UserDashboard from "./pages/UserDashboard";
import FindTherapist from "./pages/FindTherapist";

// ======== Therapist Routes =============
import TherapistLogin from "./pages/TherapistLogin";

// ======== Default Routes =============
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import TherapistDashboard from "./pages/TherapistDashboard";

export default function App(): React.ReactElement {
  const { checkAuth, authUser, authType, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Review />} />
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
          path="/find-therapist"
          element={
            authUser && authType === "user" ? (
              <FindTherapist />
            ) : (
              <Navigate to="/user/login" />
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

        {/* Admin Route */}
        <Route path="/admin" element={<Admin />} />

        {/* Wrong Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
