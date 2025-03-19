import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PublicProfileHeader from '../components/public-profile/PublicProfileHeader';
import PublicMemories from '../components/public-profile/PublicMemories';

export default function PublicProfile() {
    const [name, setName] = useState('');

    return (
        <Box sx={{ display: 'flex', marginTop: "9vh" }}>
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

                    <>
                        <PublicProfileHeader setName={setName} />
                        <PublicMemories name={name} />
                    </>
                </Stack>
            </Box>

        </Box>
    );
}