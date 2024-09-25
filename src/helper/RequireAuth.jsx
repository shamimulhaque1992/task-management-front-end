/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import Loader from "@/components/Loader";

const RequireAuth = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth(); // Clerk authentication
  const location = useLocation();
  const navigate = useNavigate();
  if (
    isSignedIn &&
    (location.pathname === "/sign-in" || location.pathname === "/sign-in")
  ) {
    navigate("/");
  }
  if (!isLoaded) {
    // Show a loader while the auth state is being determined
    return <Loader />;
  }

  // If the user is not signed in, redirect to the sign-in page
  if (!isSignedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If signed in, render the children (protected route content)
  return children;
};

export default RequireAuth;
