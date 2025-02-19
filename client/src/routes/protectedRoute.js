import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus } from "../redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, authStatus } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    authStatus: state.auth.authStatus,
  }));

  useEffect(() => {
    if (authStatus === "idle") {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, authStatus]);

  if (authStatus === "pending") {
    return <div></div>;
  }

  if (authStatus === "fulfilled") {
    return children;
  }

  if (authStatus === "rejected") {
    return <Navigate to="/sign-in" replace />;
  }
  return null;
};

export default ProtectedRoute;
