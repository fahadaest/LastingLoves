import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthStatus } from "../redux/slices/authSlice";
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

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
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={100} sx={{ color: '#32AA27' }} />
      </Box>
    );
  }

  if (authStatus === "fulfilled") {
    return children;
  }

  if (authStatus === "rejected") {
    return (
      <Navigate
        to="/sign-in"
        replace
        state={{ from: location }}
      />
    );
  }
  return null;
};

export default ProtectedRoute;
