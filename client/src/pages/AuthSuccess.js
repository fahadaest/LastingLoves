import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const AuthSuccess = () => {
    const { isAuthenticated, authStatus } = useSelector((state) => ({
        isAuthenticated: state.auth.isAuthenticated,
        authStatus: state.auth.authStatus,
    }));

    console.log(isAuthenticated)
    console.log(authStatus)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        dispatch(checkAuthStatus()).then(() => {
            // navigate('/profile');

        });
    }, [dispatch, navigate]);

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
};

export default AuthSuccess;
