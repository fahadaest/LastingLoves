import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    boxSizing: 'border-box',
    mt: 10,
    [`& .${drawerClasses.paper}`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

export default function SideMenu() {
    const profileData = useSelector((state) => state.auth.user);
    const [avatar, setAvatar] = React.useState(profileData?.avatar);

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
            }}
        >

            <Box
                sx={{
                    overflow: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: "10vh"
                }}
            >
                <MenuContent />
            </Box>

            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Avatar
                    alt="Profile Picture"
                    src={avatar}
                    sx={{
                        height: 36,
                        width: 36,
                        color: "#32AA27",
                    }}
                />
                <Box sx={{ mr: 'auto' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
                        {profileData?.username}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {profileData?.email}
                    </Typography>
                </Box>
                <OptionsMenu />
            </Stack>
        </Drawer>
    );
}