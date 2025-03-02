import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { InputAdornment, Button, LinearProgress, Typography, TextField, FormControlLabel, Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from '@mui/icons-material/Add';
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CustomAlert from "../Alert/Alert";

export default function CreateMemory() {
    const [button, setActiveButton] = React.useState("Video");
    const buttons = ["Video"];
    const [progress, setProgress] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [privacy, setPrivacy] = useState("");
    const [emails, setEmails] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const profileData = useSelector((state) => state.auth.user);
    const baseURL = process.env.REACT_APP_BASE_URL;
    const canCreateMemory = videoFile && title.trim() && description.trim() && Object.values(privacy).some(val => val);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [duration, setDuration] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    console.log(privacy)

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRecordVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            const videoElement = document.getElementById("live-preview");
            if (videoElement) {
                videoElement.srcObject = stream;
                videoElement.muted = true;
                videoElement.playsInline = true;
                await videoElement.play();
            }

            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            const chunks = [];
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = () => {
                const videoBlob = new Blob(chunks, { type: "video/mp4" });
                const videoUrl = URL.createObjectURL(videoBlob);
                setPreviewUrl(videoUrl);
                setVideoFile(videoBlob);
                stream.getTracks().forEach((track) => track.stop());
            };

            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const handleStopRecording = () => {
        mediaRecorder?.stop();
        setIsRecording(false);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            simulateUpload(file);
        }
    };

    const simulateUpload = (file) => {
        setUploading(true);
        let uploaded = 0;
        const interval = setInterval(() => {
            uploaded += 10;
            setProgress(uploaded);
            if (uploaded >= 100) {
                clearInterval(interval);
                setUploading(false);
            }
        }, 500);
    };

    const handlePrivacyChange = (event) => {
        const { name } = event.target;
        setPrivacy(name);
    };

    const handleAddEmail = () => {
        if (newEmail && !emails.includes(newEmail)) {
            setEmails([...emails, newEmail]);
            setNewEmail("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddEmail();
        }
    };

    const handleCreateMemory = async () => {
        setMessage("Creating Memory!");
        setSeverity("warning");
        setShowAlert(true);

        const accessToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            ?.split('=')[1];

        const formData = new FormData();
        formData.append("userId", profileData?.userId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("privacy", privacy);
        formData.append("scheduledTime", scheduleTime);
        formData.append("allowedEmails", emails);
        formData.append("file", videoFile);
        setUploading(true);

        try {
            const response = await axios.post(
                `${baseURL}/api/auth/createMemory`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                setMessage("Memory created successfully!");
                setSeverity("success");
                setShowAlert(true);
                setTitle("");
                setDescription("");
                setPrivacy("");
                setScheduleTime("");
                setEmails([]);
                setNewEmail("");
                setVideoFile(null);
                setPreviewUrl(null);
                setProgress(0);
                setIsRecording(false);
                setMediaRecorder(null);
                setRecordedChunks([]);
                const fileInput = document.getElementById("video-upload");
                if (fileInput) fileInput.value = "";
                console.log("Memory created successfully!");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("Unknown error, Please try again!");
            setSeverity("error");
            setShowAlert(true);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "center", maxWidth: { sm: '100%', md: '1700px' } }}>

            {showAlert && (
                <CustomAlert
                    message={message}
                    severity={severity}
                    duration={duration}
                    setShowAlert={setShowAlert}
                />
            )}

            <Box sx={{ display: "flex", gap: "20px", width: "100%", mt: "15px", borderRadius: "10px", padding: "20px", boxShadow: "0px 4px 10px rgba(50, 170, 39, 0.4), 0px -4px 10px rgba(50, 170, 39, 0.4), 4px 0px 10px rgba(50, 170, 39, 0.4), -4px 0px 10px rgba(50, 170, 39, 0.4)" }} >

                <Grid container justifyContent="center" sx={{ mb: 2, backgroundColor: "#fff", display: "flex", alignItems: "center", borderRadius: "10px", padding: "20px", maxWidth: "100%", }} >

                    <Box onClick={handleCreateMemory} sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px", width: "97%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px", }}>
                            Create Memory
                        </Typography>
                    </Box>

                    <Divider sx={{ width: '97%', my: 2, border: "1px solid #d1d4e0" }} />

                    <Box sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: "20px", textAlign: "center", width: "100%", marginBottom: "20px", display: "flex", justifyContent: "center", gap: "10px", }}>
                        {buttons.map((key) => (
                            <Button key={key} onClick={() => setActiveButton(key)} sx={{ color: key === button ? "#32AA27" : '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "20px", position: "relative", "&::after": { content: '""', display: "block", width: "100%", height: "3px", backgroundColor: key === button ? "#32AA27" : "transparent", position: "absolute", bottom: 0, left: 0, }, }}>
                                {key}
                            </Button>
                        ))}
                    </Box>

                    <Grid container justifyContent="center" sx={{ mb: 2, display: "flex", alignItems: "center", borderRadius: "10px", padding: "20px", maxWidth: "100%", margin: "0 auto", }}>
                        <Box sx={{ height: "auto", width: "100%", padding: "30px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #d1d4e0" }}>
                            <input
                                accept="video/*"
                                style={{ display: "none" }}
                                id="video-upload"
                                type="file"
                                onChange={handleFileChange}
                            />

                            <label>
                                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} onClick={handleMenuOpen} disabled={uploading}>
                                    Upload Video
                                </Button>

                                {isRecording && (
                                    <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
                                        <Typography variant="body1">Recording in progress...</Typography>
                                        <Button variant="contained" color="error" onClick={handleStopRecording}>
                                            Stop Recording
                                        </Button>
                                    </Box>
                                )}

                                {uploading && (
                                    <>
                                        <Typography variant="body1" sx={{ mt: 2 }}>
                                            Uploading: {progress}%
                                        </Typography>
                                        <LinearProgress variant="determinate" value={progress} sx={{ width: "100%", mt: 1 }}
                                        />
                                    </>
                                )}
                            </label>

                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={() => { handleMenuClose(); handleRecordVideo(); }}>
                                    Record Video
                                </MenuItem>
                                <MenuItem onClick={() => { handleMenuClose(); document.getElementById("video-upload").click(); }}>
                                    Select from Gallery
                                </MenuItem>
                            </Menu>

                            <input accept="video/*" style={{ display: "none" }} id="video-upload" type="file" onChange={handleFileChange} />

                            <Box sx={{ width: "90%", maxWidth: "800px", backgroundColor: "black", borderRadius: "10px", boxShadow: 24, outline: "none", position: "relative", overflow: "hidden", aspectRatio: "16/9", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", }}>
                                <video id="live-preview" style={{ maxWidth: "100%", maxHeight: "100%", display: isRecording ? "block" : "none", }} autoPlay playsInline muted />
                                {previewUrl && !uploading && (
                                    <video controls style={{ maxWidth: "100%", maxHeight: "100%", }}>
                                        <source src={previewUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </Box>

                        </Box>
                    </Grid>

                    <Grid container justifyContent="center" sx={{ mb: 2, display: "flex", alignItems: "center", borderRadius: "10px", padding: "20px", maxWidth: "100%", margin: "0 auto", }} >
                        <Box sx={{ width: "100%", padding: "50px", display: "flex", flexDirection: "row", justifyContent: "center", borderRadius: "10px", border: "2px solid #d1d4e0", gap: "30px" }}>

                            <Box sx={{ width: "50%", }}>
                                <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ marginBottom: "20px" }} />
                                <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} sx={{ marginBottom: "20px" }} multiline rows={7} />
                            </Box>

                            <Box sx={{ width: "50%", }}>
                                <FormControlLabel
                                    control={<Checkbox checked={privacy === "public"} onChange={handlePrivacyChange} name="public" />}
                                    label="Public"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={privacy === "private"} onChange={handlePrivacyChange} name="private" />}
                                    label="Private"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={privacy === "scheduled"} onChange={handlePrivacyChange} name="scheduled" />}
                                    label="Scheduled"
                                />
                                {privacy === "private" && (
                                    <>
                                        <Box sx={{ marginTop: "10px", marginBottom: "10px", display: "flex", gap: "10px", flexWrap: "wrap", width: "100%", padding: "10px", }}>
                                            {emails.map((email, index) => (
                                                <Typography key={index} sx={{ color: '#595959', backgroundColor: "#e5e7eb", padding: "3px 10px", borderRadius: "10px", marginBottom: "5px", }}>
                                                    {email}
                                                </Typography>
                                            ))}
                                        </Box>

                                        <TextField label="Email Address" variant="outlined" fullWidth value={newEmail} onChange={(e) => setNewEmail(e.target.value)} sx={{ marginBottom: "20px" }} type="email" onKeyPress={handleKeyPress} InputProps={{
                                            endAdornment: (<InputAdornment position="end">
                                                <IconButton onClick={handleAddEmail} color="primary">
                                                    <AddIcon />
                                                </IconButton>
                                            </InputAdornment>),
                                        }} />
                                    </>

                                )}

                                {privacy === "scheduled" && (
                                    <>
                                        <Box sx={{ marginTop: "10px", marginBottom: "10px", display: "flex", gap: "10px", flexWrap: "wrap", width: "100%", padding: "10px", }}>
                                            {emails.map((email, index) => (
                                                <Typography key={index} sx={{ color: '#595959', backgroundColor: "#e5e7eb", padding: "3px 10px", borderRadius: "10px", marginBottom: "5px", }}>
                                                    {email}
                                                </Typography>
                                            ))}
                                        </Box>

                                        <TextField label="Email Address" variant="outlined" fullWidth value={newEmail} onChange={(e) => setNewEmail(e.target.value)} sx={{ marginBottom: "20px" }} type="email" onKeyPress={handleKeyPress}
                                            InputProps={{
                                                endAdornment: (<InputAdornment position="end"><IconButton onClick={handleAddEmail} color="primary"><AddIcon /></IconButton></InputAdornment>),
                                            }} />

                                        <TextField label="Schedule Time" variant="outlined" fullWidth value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} sx={{ marginBottom: "20px" }} type="datetime-local" InputLabelProps={{ shrink: true, }} />
                                    </>
                                )}
                            </Box>
                        </Box>

                        <Box sx={{ width: "100%", marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "20px" }}>
                            <Button sx={{ padding: "0px 20px 0px 20px", height: "50px", backgroundColor: '#e5e7eb', color: '#32AA27', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }} >
                                Cancel
                            </Button>
                            <Button disabled={!canCreateMemory} onClick={handleCreateMemory} sx={{ padding: "0px 20px 0px 20px", height: "50px", backgroundColor: !canCreateMemory ? '#e5e7eb' : '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}>
                                <IconButton sx={{ backgroundColor: !canCreateMemory ? '#e5e7eb' : "#fff", height: "30px", width: "30px", marginRight: "20px" }} color="primary">
                                    <AddIcon sx={{ color: !canCreateMemory ? '#aaabae' : "#32AA27" }} />
                                </IconButton>
                                Create Memory
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </Box >
    );
}
