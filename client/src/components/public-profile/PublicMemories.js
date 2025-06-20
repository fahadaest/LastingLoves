import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button, Typography, Modal } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Cookies from "js-cookie";

export default function PublicMemories({ name }) {
    const { userId, videoId } = useParams();
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL;

    const [button, setActiveButton] = useState("All Memories");
    const [memories, setMemories] = useState([]);
    const [selectedMemory, setSelectedMemory] = useState(null);
    const [hasConfirmedLoss, setHasConfirmedLoss] = useState(false);
    const [userVerified, setUserVerified] = useState(false);
    const [certificate, setCertificate] = useState(null);
    const [uploading, setUploading] = useState(false);
    const accessToken = Cookies.get("accessToken");
    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {
        if (selectedMemory === null) {
            setOpenModal(false);
        } else {
            setOpenModal(true);
        }
    }, [selectedMemory]);

    useEffect(() => {
        if (userId) {
            fetchMemories();
        }
    }, [userId]);

    const fetchMemories = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/auth/memories/${userId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
            });
            setMemories(response?.data?.memories);
        } catch (error) {
            console.error("Error fetching memories:", error);
        }
    };

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

    const handleFileChange = (event) => {
        setCertificate(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!certificate || !selectedMemory) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", certificate);
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_DC_PRESET);
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        try {
            const cloudinaryResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
                formData
            );

            const certificateUrl = cloudinaryResponse.data.secure_url;

            await axios.put(
                `${baseURL}/api/auth/verify/${userId}`,
                { certificateUrl },
                { withCredentials: true }
            );


            setUserVerified(true)
            setHasConfirmedLoss(false);
            setCertificate(null);

            await delay(3000);
            fetchMemories();
        } catch (error) {
            console.error("Error uploading certificate:", error);
            alert("Failed to upload certificate. Please try again.");
        } finally {
            setUploading(false);
        }
    };

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

                <Modal open={openModal} onClose={handleClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box sx={{ width: "90%", maxWidth: "800px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: 24, p: 2, outline: "none" }}>
                        {selectedMemory && (
                            <Box>
                                {selectedMemory.privacy === "private" ? (
                                    <>
                                        <DialogTitle>Confirm & Unlock the Memory</DialogTitle>
                                        <DialogContent sx={{ fontSize: hasConfirmedLoss ? "15px" : "30px" }}>
                                            {hasConfirmedLoss ? (
                                                <>
                                                    <p>We are deeply sorry for your loss. To ensure that this special message from <strong>{name}</strong> reaches you, we kindly ask you to confirm their passing by uploading an official <strong>death certificate</strong>. </p>
                                                    <p>This step helps us verify and protect these deeply personal messages, ensuring they are shared at the right time.</p>
                                                    <input
                                                        type="file"
                                                        accept=".pdf,.jpg,.png"
                                                        onChange={handleFileChange}
                                                        style={{ marginTop: "20px", width: "100%", height: "50px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
                                                    />
                                                </>
                                            ) : userVerified ? (
                                                <>
                                                    <p>User <strong>{name}</strong> death verified</p>
                                                    <p>Redirecting to memory</p>
                                                </>
                                            ) : (
                                                <p>Is <strong>{name}</strong> no longer with us?</p>
                                            )}
                                        </DialogContent>
                                        <DialogActions>
                                            {hasConfirmedLoss ? (
                                                <Button
                                                    sx={{ width: 'auto', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                                                    onClick={handleUpload}
                                                    disabled={uploading}
                                                >
                                                    {uploading ? "Uploading..." : "Submit"}
                                                </Button>

                                            ) : userVerified ? (
                                                null
                                            ) : (
                                                <>
                                                    <Button
                                                        sx={{ width: 'auto', height: "50px", backgroundColor: '#e5e7eb', color: '#32AA27', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                                                    >
                                                        No, they are still alive
                                                    </Button>
                                                    <Button
                                                        sx={{ width: 'auto', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                                                        onClick={() => setHasConfirmedLoss(true)}
                                                    >
                                                        Yes, they have passed away
                                                    </Button>
                                                </>
                                            )}

                                        </DialogActions>
                                    </>

                                ) : (
                                    <>
                                        <Typography sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: "18px", marginBottom: "10px", textAlign: "center" }}>
                                            {selectedMemory.title}
                                        </Typography>
                                        <Box sx={{ width: "100%", height: "0", paddingBottom: "56.25%", position: "relative" }}>
                                            <video src={selectedMemory.videoUrl} controls style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "10px" }} />
                                        </Box>
                                    </>
                                )}
                            </Box>
                        )}
                    </Box>
                </Modal>
            </Grid>
        </Box>
    );
}
