import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/SignIn/ForgotPassword';
import axios from 'axios';
import Cookies from 'js-cookie';
import api from '../api';
import { useSelector } from 'react-redux';
import { checkAuthStatus } from "../redux/slices/authSlice";
import CustomAlert from '../components/Alert/Alert';
import { ReactComponent as GoogleIcon } from '../assets/google.svg';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    backgroundColor: "#32AA27",
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignIn(props) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loginError, setLoginError] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = process.env.REACT_APP_BASE_URL;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [duration, setDuration] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const from = location.state?.from?.pathname || "/profile";

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            setMessage("Enter Valid Inputs!");
            setSeverity("error");
            setShowAlert(true);
            return;
        }

        setMessage("Logging in!");
        setSeverity("warning");
        setShowAlert(true);

        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        setLoading(true);
        setLoginError('');

        try {
            const response = await api.post(`${baseURL}/api/auth/login`, {
                email,
                password,
            });

            const { accessToken, refreshToken } = response.data;

            if (accessToken && refreshToken) {
                Cookies.set('accessToken', accessToken, { expires: 1 / 24, secure: false, sameSite: 'Lax' }); //TODO change to Strict
                Cookies.set('refreshToken', refreshToken, { expires: 1, secure: false, sameSite: 'Lax' }); //TODO change to Strict
                dispatch(checkAuthStatus());
                navigate(from, { replace: true });
                setMessage("Logged in!");
                setSeverity("success");
                setShowAlert(true);
            } else {
                setLoginError('Login failed. No token received.');
                setMessage("Login failed. No access token received.");
                setSeverity("error");
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setMessage("Invalid email or password");
            setSeverity("error");
            setShowAlert(true);
            setLoginError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };


    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    const handleGoogleAuth = async () => {
        try {
            window.open(`${process.env.REACT_APP_BASE_URL}/api/auth/google`, "_self");

            // setTimeout(async () => {
            //     dispatch(checkAuthStatus());
            //     navigate("/profile");
            // }, 2000);
        } catch (error) {
            console.error("Google Auth Error:", error);
        }
    };

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            {showAlert && (
                <CustomAlert
                    message={message}
                    severity={severity}
                    duration={duration}
                    setShowAlert={setShowAlert}
                />
            )}

            <Card variant="outlined">

                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight: "600", display: "flex", justifyContent: "center" }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <ForgotPassword open={open} handleClose={handleClose} />
                    <Button
                        type="submit"
                        fullWidth
                        onClick={validateInputs}
                        sx={{
                            backgroundColor: "#32AA27",
                            color: "#fff"
                        }}
                    >
                        Sign in
                    </Button>
                    <Link
                        component="button"
                        type="button"
                        onClick={handleClickOpen}
                        variant="body2"
                        sx={{ alignSelf: 'center', color: "#32AA27" }}
                    >
                        Forgot your password?
                    </Link>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ color: "#32AA27", border: " 1px solid #32AA27" }}
                        startIcon={<GoogleIcon width={24} height={24} />}
                        onClick={handleGoogleAuth}
                    >
                        Sign in with Google
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/sign-up"
                            variant="body2"
                            sx={{ alignSelf: 'center', color: "#32AA27" }}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer>
    );
}