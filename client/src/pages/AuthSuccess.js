import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../redux/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Cookies from 'js-cookie';
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
    const location = useLocation();

    const searchParams = location.search.substring(1);
    const tokens = searchParams.split('&');

    const accessToken = tokens[0];
    const refreshToken = tokens[1];

    if (accessToken && refreshToken) {
        Cookies.set('accessToken', accessToken, { expires: 1 / 24, secure: false, sameSite: 'Lax' });
        Cookies.set('refreshToken', refreshToken, { expires: 1, secure: false, sameSite: 'Lax' });
    }

    useEffect(() => {
        dispatch(checkAuthStatus()).then(() => {
            navigate('/profile');

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
