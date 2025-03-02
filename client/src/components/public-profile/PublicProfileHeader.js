import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PublicProfileHeader() {
    const { userId } = useParams();
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/auth/publicProfile/${userId}`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const data = response.data;
                    setUsername(data.username || "");
                    setBio(data.bio || "Add a bio");
                    setAvatar(data.avatar);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (userId) {
            fetchProfile();
        }
    }, [userId, baseURL]);

    return (
        <Box sx={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "center", maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box
                sx={{ display: "flex", gap: "20px", width: "100%", mt: "15px", borderRadius: "10px", padding: "20px", boxShadow: "0px 4px 10px rgba(50, 170, 39, 0.4), 0px -4px 10px rgba(50, 170, 39, 0.4), 4px 0px 10px rgba(50, 170, 39, 0.4), -4px 0px 10px rgba(50, 170, 39, 0.4)" }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", position: "relative" }}>
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                        <Avatar
                            alt="Profile Picture"
                            src={avatar}
                            sx={{
                                width: { xs: 80, sm: 100, md: 120 },
                                height: { xs: 80, sm: 100, md: 120 },
                                position: "relative",
                                color: "#32AA27",
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ width: "70%" }}>
                    <Box sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px" }}>
                        <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                            {username}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex" }}>
                        <Typography
                            sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#595959",
                            }}
                        >
                            {bio}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
