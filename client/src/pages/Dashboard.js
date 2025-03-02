import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../redux/slices/authSlice';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Profile from '../components/Dashboard/Profile';
import SideMenu from '../components/Dashboard/SideMenu';
import Memories from '../components/Dashboard/Memories';
import CreateMemory from '../components/Dashboard/CreateMemory';
import api from '../api';

export default function Dashboard({ path }) {
    const profileData = useSelector((state) => state.auth.user);
    const isFreePlan = profileData?.paymentPlan === "free";
    const [openModal, setOpenModal] = useState(isFreePlan);
    const navigate = useNavigate();

    useEffect(() => {
        if (isFreePlan) {
            setOpenModal(true);
        }
    }, [isFreePlan]);

    const handleUpgrade = () => {
        navigate('/Pricing');
    };

    return (
        <Box sx={{ display: 'flex', marginTop: "9vh" }}>
            <SideMenu />
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    backgroundColor: theme.vars
                        ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                        : alpha(theme.palette.background.default, 1),
                    overflow: 'auto',
                })}
            >
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        mx: 3,
                        pb: 5,
                        mt: '10px',
                    }}
                >

                    {path === "profile" && (
                        <>
                            <Profile />
                            <Memories />
                        </>
                    )}
                    {path == "create-memory" && <CreateMemory />}
                </Stack>
            </Box>

            {isFreePlan &&
                <Dialog sx={{ my: 2, color: '#595959', fontFamily: 'poppins', fontWeight: '500', display: 'block', textTransform: 'none', }} open={openModal} disableEscapeKeyDown>
                    <DialogTitle>Upgrade Your Plan</DialogTitle>
                    <DialogContent>
                        <p>Your current plan is <strong>Free</strong>. Upgrade to unlock additional features</p>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleUpgrade}
                            sx={{ width: '200px', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                        >
                            Upgrade Now
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </Box>
    );
}