import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Profile from '../components/Dashboard/Profile';
import SideMenu from '../components/Dashboard/SideMenu';
import Memories from '../components/Dashboard/Memories';

export default function Dashboard(props) {
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
                        mt: { xs: 8, md: 0 },
                    }}
                >
                    <Profile />
                    <Memories />
                </Stack>
            </Box>
        </Box>
    );
}