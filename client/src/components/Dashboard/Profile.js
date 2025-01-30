import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import loggedInImg from "../../assets/Jamie-Lambros.jpg"

export default function Profile() {
    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2), backgroundColor: "#fff", display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "10px", padding: "20px", boxShadow: "0px 4px 10px rgba(50, 170, 39, 0.4), 0px -4px 10px rgba(50, 170, 39, 0.4), 4px 0px 10px rgba(50, 170, 39, 0.4), -4px 0px 10px rgba(50, 170, 39, 0.4)" }}
            >
                <Box>
                    <Avatar
                        alt="Remy Sharp"
                        src={loggedInImg}
                        sx={{
                            width: { xs: 80, sm: 100, md: 120 },
                            height: { xs: 80, sm: 100, md: 120 },
                            border: "4px solid #595959"
                        }}
                    />
                </Box>

                <Box sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px" }}>
                    Jamie Lambros
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '500', maxWidth: "80%", textAlign: "center" }}>
                        A soul who walked this earth for a brief moment, leaving behind echoes of love, laughter, and perhaps a thought or two worth remembering. If you're reading this, cherish your time here—it’s fleeting, but it’s beautiful. See you on the other side
                    </Typography>
                </Box>

            </Grid>

        </Box>
    );
}
