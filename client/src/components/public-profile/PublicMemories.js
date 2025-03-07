import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button, Typography, Modal } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function PublicMemories() {
    const { userId, videoId } = useParams();
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [button, setActiveButton] = useState("All Memories");
    const [memories, setMemories] = useState([]);
    const [selectedMemory, setSelectedMemory] = useState(null);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/auth/memories/${userId}`, {
                    withCredentials: true,
                });
                setMemories(response?.data?.memories);
            } catch (error) {
                console.error("Error fetching memories:", error);
            }
        };

        if (userId) {
            fetchMemories();
        }
    }, [userId, baseURL]);

    useEffect(() => {
        if (videoId && memories.length > 0) {
            const foundMemory = memories.find(mem => mem._id === videoId);
            if (foundMemory) {
                setSelectedMemory(foundMemory);
            }
        }
    }, [videoId, memories]);

    const handleClose = () => {
        setSelectedMemory(null);
        navigate(`/public-profile/${userId}`);
    };

    console.log(memories)

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: { sm: '100%', md: '1700px' },
                margin: '0 auto',
                overflow: 'hidden',
                boxShadow: "0px 4px 10px rgba(50, 170, 39, 0.4), 0px -4px 10px rgba(50, 170, 39, 0.4), 4px 0px 10px rgba(50, 170, 39, 0.4), -4px 0px 10px rgba(50, 170, 39, 0.4)",
                borderRadius: "10px",
            }}
        >
            <Grid container justifyContent="center" sx={{ mb: 2, backgroundColor: "#fff", padding: "20px" }}>
                <Box sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px", width: "97%", display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px" }}>
                        My Memories
                    </Typography>
                </Box>
                <Divider sx={{ width: '97%', my: 2, border: "1px solid #d1d4e0" }} />

                {memories.map((memory) => (
                    <Grid item xs={4} sm={4} key={memory._id} sx={{ padding: "10px" }}>
                        <Box
                            sx={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", cursor: "pointer", }}
                            onClick={() => navigate(`/public-profile/${userId}/${memory._id}`)}
                        >
                            <Box component="img" src={memory.thumbnailUrl} alt={memory.title} sx={{ width: "100%", height: "100%", objectFit: "cover", filter: memory.privacy === "private" || memory.privacy === "scheduled" ? "blur(10px)" : "none", }} />
                            {memory.privacy === "private" && (
                                <>
                                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "50%", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                        <LockIcon sx={{ color: "#fff", fontSize: 40 }} />
                                    </Box>
                                    <Typography sx={{ position: "absolute", top: "65%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff", fontSize: "12px", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "4px 8px", borderRadius: "5px" }} >
                                        Private
                                    </Typography>
                                </>
                            )}

                            {memory.privacy === "scheduled" && (
                                <>
                                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "50%", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                        <CalendarMonthIcon sx={{ color: "#fff", fontSize: 40 }} />
                                    </Box>
                                    <Typography sx={{ position: "absolute", top: "65%", left: "50%", transform: "translate(-50%, -50%)", color: "#fff", fontSize: "12px", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "4px 8px", borderRadius: "5px" }} >
                                        scheduled
                                    </Typography>
                                </>
                            )}

                            {/* <Typography sx={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", color: "#fff", textAlign: "center", fontSize: "14px", padding: "5px" }}>
                                {memory.title}
                            </Typography> */}
                        </Box>
                    </Grid>
                ))}

                <Modal open={Boolean(selectedMemory)} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box sx={{ width: "90%", maxWidth: "800px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: 24, p: 2, outline: "none" }}>
                        {selectedMemory && (
                            <Box>
                                <Typography sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: "18px", marginBottom: "10px", textAlign: "center" }}>
                                    {selectedMemory.title}
                                </Typography>
                                <Box sx={{ width: "100%", height: "0", paddingBottom: "56.25%", position: "relative" }}>
                                    <video src={selectedMemory.videoUrl} controls style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "10px" }} />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Modal>
            </Grid>
        </Box>
    );
}
