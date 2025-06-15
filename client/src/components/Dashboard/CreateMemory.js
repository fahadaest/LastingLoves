import React, { useState, useRef } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CircularProgress from "@mui/material/CircularProgress";
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { InputAdornment, Button, Typography, TextField, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import { FormControl, FormGroup, FormHelperText } from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import axios from "axios";
import CustomAlert from "../Alert/Alert";
import CloseIcon from "@mui/icons-material/Close";

export default function CreateMemory() {
    const [button, setActiveButton] = React.useState("Video");
    const buttons = ["Video"];
    const [progress, setProgress] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [privacy, setPrivacy] = useState("");
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const profileData = useSelector((state) => state.auth.user);
    const baseURL = process.env.REACT_APP_BASE_URL;
    // const canCreateMemory = videoFile && title.trim() && description.trim() && Object.values(privacy).some(val => val);
    const [isRecording, setIsRecording] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [duration, setDuration] = useState("4000");
    const [showAlert, setShowAlert] = useState(false);
    const videoRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    // const [userStoppedRecording, setUserStoppedRecording] = useState(false);
    const [creatingMemory, setCreatingMemory] = useState(false);
    const contactRequired = (privacy === 'private' || privacy === 'scheduled' || privacy === 'scheduledAfterDeath') && contacts.length === 0;
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        privacy: false,
    });

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
            const chunks = [];
            let isUserStopped = false;

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = async () => {
                if (!isUserStopped) {
                    console.log("Recording was interrupted, skipping upload.");
                    return;
                }

                const videoBlob = new Blob(chunks, { type: "video/mp4" });
                const videoUrl = URL.createObjectURL(videoBlob);

                const tempVideo = document.createElement("video");
                tempVideo.src = videoUrl;

                tempVideo.addEventListener("loadedmetadata", async () => {
                    setPreviewUrl(videoUrl);

                    const formData = new FormData();
                    formData.append("file", videoBlob);
                    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

                    try {
                        setUploading(true);
                        setProgress(0);

                        const response = await axios.post(
                            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/video/upload`,
                            formData,
                            {
                                onUploadProgress: (progressEvent) => {
                                    const percentCompleted = Math.round(
                                        (progressEvent.loaded * 100) / progressEvent.total
                                    );
                                    setProgress(percentCompleted);
                                },
                            }
                        );

                        if (response.data.secure_url) {
                            const uploadedVideoUrl = response.data.secure_url;
                            const publicId = response.data.public_id;
                            const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
                            const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_1/${publicId}.jpg`;

                            setVideoFile(uploadedVideoUrl);
                            setThumbnailUrl(thumbnailUrl);
                        }
                    } catch (error) {
                        console.error("Cloudinary upload failed:", error);
                    } finally {
                        setUploading(false);
                    }
                });
            };
            setMediaRecorder(recorder);
            setIsRecording(true);
            const startTime = Date.now();
            const intervalId = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                setDuration(elapsed);
            }, 1000);
            window._durationInterval = intervalId;
            const stopWithFlag = () => {
                isUserStopped = true;
                recorder.stop();
                setIsRecording(false);
                clearInterval(intervalId);
            };
            window._stopCurrentRecording = stopWithFlag;
            setPreviewUrl(null);
            setVideoFile(null);
            setThumbnailUrl(null);
            recorder.start();
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const handleStopRecording = () => {
        setIsPaused(false);
        if (window._stopCurrentRecording) {
            window._stopCurrentRecording();
        }
    };

    const handlePrivacyChange = (event) => {
        setPrivacy(event.target.name);
        if (errors.privacy) {
            setErrors((prev) => ({ ...prev, privacy: false }));
        }
    };

    const handleAddEmail = () => {
        if (newContact && !contacts.includes(newContact)) {
            setContacts([...contacts, newContact]);
            setNewContact("");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddEmail();
        }
    };

    const handleAddContact = () => {
        if (newContact.trim() === "") return;

        setContacts((prev) => [...prev, newContact.trim()]);
        setNewContact("");

        if (errors.contacts) {
            setErrors((prev) => ({ ...prev, contacts: false }));
        }
    };

    const handleDeleteContact = (contactToDelete) => {
        setContacts(contacts.filter((contact) => contact !== contactToDelete));
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            setProgress(0);
            setPreviewUrl(URL.createObjectURL(file));
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/video/upload`,
                    formData,
                    {
                        onUploadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setProgress(percentCompleted);
                        },
                    }
                );

                if (response.data.secure_url) {
                    const videoUrl = response.data.secure_url;
                    const publicId = response.data.public_id;

                    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
                    const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_1/` + publicId + ".jpg";

                    setVideoFile(videoUrl);
                    setThumbnailUrl(thumbnailUrl);
                }
            } catch (error) {
                console.error("Cloudinary upload failed:", error);
            } finally {
                setUploading(false);
            }
        }
    };

    const handleCreateMemory = async () => {
        const newErrors = {
            title: !title.trim(),
            description: !description.trim(),
            privacy: !privacy,
            contacts: contactRequired,
            scheduleTime: (privacy === "scheduled" || privacy === "scheduledAfterDeath") && !scheduleTime,
        };

        setErrors(newErrors);
        const hasError = Object.values(newErrors).some(Boolean);
        if (hasError) {
            setMessage("Enter all required fields");
            setSeverity("error");
            setShowAlert(true);
            return;
        }

        if (!videoFile) {
            setMessage("Please upload a video before creating memory.");
            setSeverity("error");
            setShowAlert(true);
            return;
        }

        setMessage("Creating Memory!");
        setSeverity("warning");
        setShowAlert(true);

        const accessToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            ?.split('=')[1];

        try {
            setCreatingMemory(true);
            const response = await axios.post(
                `${baseURL}/api/auth/createMemory`,
                {
                    userId: profileData?.userId,
                    title,
                    description,
                    privacy,
                    scheduledTime: scheduleTime,
                    contacts: contacts,
                    videoUrl: videoFile,
                    thumbnailUrl: thumbnailUrl,
                    username: profileData?.username,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                setCreatingMemory(false);
                setMessage("Memory created successfully!");
                setSeverity("success");
                setShowAlert(true);
                setTitle("");
                setDescription("");
                setPrivacy("");
                setScheduleTime("");
                setContacts([]);
                setNewContact("");
                setVideoFile(null);
                setPreviewUrl(null);
                setProgress(0);
            }
        } catch (error) {
            console.log("Upload error:", error?.response?.data?.message);
            setCreatingMemory(false);
            setMessage(error?.response?.data?.message);
            setSeverity("error");
            setShowAlert(true);
        }
    };

    const handleRestartRecording = async () => {
        setVideoFile(null);
        setPreviewUrl(null);
        setThumbnailUrl(null);
        setDuration(0);
        const videoElement = document.getElementById("live-preview");
        if (videoElement && videoElement.srcObject) {
            const tracks = videoElement.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoElement.srcObject = null;
        }
        if (window._durationInterval) {
            clearInterval(window._durationInterval);
            window._durationInterval = null;
        }
        handleRecordVideo();
    };
    const handlePauseRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.pause();
            setIsRecording(false);
            setIsPaused(true);
        }
    };
    const handleResumeRecording = () => {
        if (mediaRecorder && mediaRecorder.state === "paused") {
            mediaRecorder.resume();
            setIsRecording(true);
            setIsPaused(false);
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

            <Box sx={{ display: "flex", gap: "20px", width: "100%", mt: "15px", borderRadius: "10px", padding: { xs: '0px', sm: '20px' }, boxShadow: "0px 4px 10px rgba(50, 170, 39, 0.4), 0px -4px 10px rgba(50, 170, 39, 0.4), 4px 0px 10px rgba(50, 170, 39, 0.4), -4px 0px 10px rgba(50, 170, 39, 0.4)" }} >

                <Grid container justifyContent="center" sx={{ mb: 2, display: "flex", alignItems: "center", borderRadius: "10px", padding: { xs: '20px 5px 20px 5px', sm: '20px' }, maxWidth: "100%", }} >

                    <Box sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px", width: "97%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: { xs: "20px", sm: "30px" }, marginLeft: "15px" }}>
                            Create Memory
                        </Typography>
                    </Box>

                    <Divider sx={{ width: '97%', my: { xs: 1, sm: 2 }, border: "1px solid #d1d4e0" }} />

                    <Box sx={{ fontFamily: 'poppins', fontWeight: '600', fontSize: { xs: '0px', sm: '20px' }, textAlign: "center", width: "100%", marginBottom: { xs: '10px', sm: '20px' }, display: "flex", justifyContent: "center", gap: "10px", }}>
                        {buttons.map((key) => (
                            <Button key={key} onClick={() => setActiveButton(key)} sx={{ color: key === button ? "#32AA27" : '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: { xs: '15px', sm: '20px' }, position: "relative", "&::after": { content: '""', display: "block", width: "100%", height: "3px", backgroundColor: key === button ? "#32AA27" : "transparent", position: "absolute", bottom: 0, left: 0, }, }}>
                                {key}
                            </Button>
                        ))}
                    </Box>

                    <Grid container justifyContent="center" sx={{ display: "flex", alignItems: "center", borderRadius: "10px", padding: { xs: '5px', sm: '0px' }, maxWidth: "100%", margin: "0 auto", }}>
                        <Box sx={{ height: "auto", width: "100%", padding: { xs: '10px', sm: "20px" }, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid #d1d4e0" }}>
                            <input
                                accept="video/*"
                                style={{ display: "none" }}
                                id="video-upload"
                                type="file"
                                onChange={handleFileChange}
                            />

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", width: "100%" }}>
                                <Button sx={{ backgroundColor: "#32AA27", fontSize: { xs: "0.6rem", sm: "0.875rem" }, padding: { xs: "4px 8px", sm: "6px 16px" }, minWidth: { xs: "auto", sm: "64px" } }} variant="contained" component="span" startIcon={<CloudUploadIcon />} onClick={() => { document.getElementById("video-upload").click(); }} disabled={uploading}>
                                    Upload
                                </Button>

                                <Button sx={{ backgroundColor: "#32AA27", fontSize: { xs: "0.6rem", sm: "0.875rem" }, padding: { xs: "4px 8px", sm: "6px 16px" }, minWidth: { xs: "auto", sm: "64px" } }} variant="contained" component="span" startIcon={<EmergencyRecordingIcon />} onClick={handleRecordVideo} disabled={uploading}>
                                    Record
                                </Button>

                                <Button sx={{ backgroundColor: "#32AA27", fontSize: { xs: "0.6rem", sm: "0.875rem" }, padding: { xs: "4px 8px", sm: "6px 16px" }, minWidth: { xs: "auto", sm: "64px" } }} variant="contained" component="span" startIcon={<RestartAltIcon />} onClick={handleRestartRecording} disabled={!isRecording}>
                                    Restart
                                </Button>
                            </Box>

                            <input accept="video/*" style={{ display: "none" }} id="video-upload" type="file" onChange={handleFileChange} />

                            <Box sx={{ width: "100%", maxWidth: "800px", backgroundColor: "black", borderRadius: "10px", boxShadow: 24, outline: "none", position: "relative", overflow: "hidden", aspectRatio: "16/9", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", marginBottom: "20px" }}>
                                <video id="live-preview" style={{ maxWidth: "100%", maxHeight: "100%", display: isRecording ? "block" : "none", }} autoPlay playsInline muted />
                                {previewUrl && !uploading && (
                                    <video ref={videoRef} controls style={{ maxWidth: "100%", maxHeight: "100%" }}>
                                        <source src={previewUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>

                                )}

                                {uploading && (
                                    <Box
                                        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000, }}
                                    >
                                        <CircularProgress
                                            variant="determinate"
                                            value={progress}
                                            size={80}
                                            thickness={5}
                                            color="success"
                                        />
                                        <Typography variant="body1" sx={{ mt: 2, color: '#fff' }}>
                                            Uploading: {progress}%
                                        </Typography>
                                    </Box>
                                )}

                                {isRecording && (
                                    <Box sx={{ width: '100%', position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px", zIndex: 9999, }}>
                                        <Typography variant="body1" sx={{ color: '#fff', fontSize: { xs: "0.6rem", sm: "0.875rem" } }}>
                                            {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
                                        </Typography>
                                        <Box sx={{ width: "12px", height: "12px", backgroundColor: "red", borderRadius: "50%", animation: "blink 1s infinite", zIndex: 10000, }} />
                                        <Typography variant="body1" sx={{ color: '#fff', fontSize: { xs: "0.6rem", sm: "0.875rem" } }}>Recording in progress...</Typography>
                                    </Box>

                                )}

                                {isPaused && (
                                    <Box sx={{ position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: "10px", zIndex: 9999, }}>
                                        <Typography variant="body1" sx={{ color: '#fff', fontSize: { xs: "0.6rem", sm: "0.875rem" } }}>Video is paused...</Typography>
                                    </Box>
                                )}

                            </Box>

                            <Box sx={{ display: "flex", gap: "10px" }}>
                                <Button sx={{ backgroundColor: "#32AA27", fontSize: { xs: "0.6rem", sm: "0.875rem" }, padding: { xs: "4px 8px", sm: "6px 16px" }, minWidth: { xs: "auto", sm: "64px" } }} variant="contained" component="span" startIcon={<PauseCircleOutlineIcon />} onClick={handlePauseRecording} disabled={!isRecording || isPaused}>
                                    Pause
                                </Button>
                                <Button sx={{ backgroundColor: "#32AA27", fontSize: { xs: "0.6rem", sm: "0.875rem" }, padding: { xs: "4px 8px", sm: "6px 16px" }, minWidth: { xs: "auto", sm: "64px" } }} variant="contained" component="span" startIcon={<NotStartedIcon />} onClick={handleResumeRecording} disabled={isRecording || !isPaused}>
                                    Resume
                                </Button>
                                <Button sx={{ backgroundColor: "#32AA27", fontSize: { xs: "0.6rem", sm: "0.875rem" }, padding: { xs: "4px 8px", sm: "6px 16px" }, minWidth: { xs: "auto", sm: "64px" } }} variant="contained" color="error" startIcon={<StopCircleIcon />} onClick={handleStopRecording} disabled={!isRecording && !isPaused}>
                                    Stop
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid container justifyContent="center" sx={{ display: "flex", alignItems: "center", borderRadius: "10px", padding: { xs: '5px', sm: '0px' }, maxWidth: "100%", margin: "10px 0px 0px", }} >
                        <Box sx={{ width: "100%", padding: { xs: "10px", sm: "30px" }, display: "flex", flexDirection: { xs: 'column', sm: 'row' }, justifyContent: "center", borderRadius: "10px", border: "2px solid #d1d4e0", gap: { xs: "0px", sm: "30px" } }}>

                            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                                <TextField label="Title" variant="outlined" fullWidth value={title} onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (errors.title && e.target.value.trim() !== '') {
                                        setErrors((prev) => ({ ...prev, title: false }));
                                    }
                                }} sx={{ marginBottom: "20px" }} error={errors.title} helperText={errors.title ? "Title is required" : ""} />

                                <TextField label="Description" variant="outlined" fullWidth value={description} onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (errors.description && e.target.value.trim() !== '') {
                                        setErrors((prev) => ({ ...prev, description: false }));
                                    }
                                }} sx={{ marginBottom: "20px" }} multiline rows={7} error={errors.description} helperText={errors.description ? "Description is required" : ""} />
                            </Box>

                            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                                <FormControl component="fieldset" error={errors.privacy} sx={{ width: "100%", marginBottom: "10px" }}>
                                    <FormGroup row>
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
                                        <FormControlLabel
                                            control={<Checkbox checked={privacy === "scheduledAfterDeath"} onChange={handlePrivacyChange} name="scheduledAfterDeath" />}
                                            label="Scheduled after Death"
                                        />
                                    </FormGroup>
                                    {errors.privacy && <FormHelperText>Please select a privacy option.</FormHelperText>}
                                </FormControl>


                                {privacy === "private" || privacy === "scheduled" || privacy === "scheduledAfterDeath" ? (
                                    <>
                                        <Box sx={{ marginTop: "10px", marginBottom: "10px", display: "flex", gap: "10px", flexWrap: "wrap", width: "100%", padding: "10px", }}>
                                            {contacts.map((contact, index) => (
                                                <Typography key={index} sx={{ color: '#595959', backgroundColor: "#e5e7eb", padding: "3px 10px", borderRadius: "10px", marginBottom: "5px", }}>
                                                    {contact}
                                                    <IconButton size="small" onClick={() => handleDeleteContact(contact)}>
                                                        <CloseIcon fontSize="small" />
                                                    </IconButton>
                                                </Typography>
                                            ))}
                                        </Box>

                                        <TextField label="Email Address or Phone Number" variant="outlined" fullWidth value={newContact} onChange={(e) => {
                                            setNewContact(e.target.value);
                                            if (errors.contacts && e.target.value.trim() !== '') {
                                                setErrors((prev) => ({ ...prev, contacts: false }));
                                            }
                                        }} error={errors.contacts} helperText={errors.contacts ? "At least one contact is required" : ""} sx={{ marginBottom: "20px" }} type="text" onKeyPress={handleKeyPress}
                                            InputProps={{
                                                endAdornment: (<InputAdornment position="end"><IconButton onClick={handleAddContact} color="primary"><AddIcon /></IconButton></InputAdornment>),
                                            }} />

                                        {(privacy === "scheduled" || privacy === "scheduledAfterDeath") && (
                                            <TextField label="Schedule Time" variant="outlined" fullWidth value={scheduleTime} onChange={(e) => {
                                                setScheduleTime(e.target.value);
                                                if (errors.scheduleTime && e.target.value) {
                                                    setErrors((prev) => ({ ...prev, scheduleTime: false }));
                                                }
                                            }} error={errors.scheduleTime} helperText={errors.scheduleTime ? "Schedule time is required" : ""} sx={{ marginBottom: "20px" }} type="datetime-local" InputLabelProps={{ shrink: true, }} />
                                        )}
                                    </>

                                ) : null}
                            </Box>
                        </Box>

                        <Box sx={{ width: "100%", marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "20px" }}>
                            <Button sx={{ padding: "0px 20px 0px 20px", height: "50px", backgroundColor: '#e5e7eb', color: '#32AA27', fontFamily: 'poppins', fontSize: { xs: "0.7rem", sm: "0.875rem" }, borderRadius: '0px' }} >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateMemory} sx={{ padding: "0px 20px 0px 20px", height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: { xs: "0.7rem", sm: "0.875rem" }, borderRadius: '0px' }}>
                                {creatingMemory ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    <>
                                        <IconButton sx={{ backgroundColor: "#fff", height: "30px", width: "30px", marginRight: "20px" }} color="primary">
                                            <AddIcon sx={{ color: "#32AA27" }} />
                                        </IconButton>
                                        Create Memory
                                    </>
                                )}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </Box >
    );
}
