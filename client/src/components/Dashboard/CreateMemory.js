import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { InputAdornment, Button, LinearProgress, Typography, TextField, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from '@mui/icons-material/Add'; // Add icon for adding emails

export default function CreateMemory() {
    const [button, setActiveButton] = React.useState("Video");
    const buttons = ["Video"];
    const [progress, setProgress] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [privacy, setPrivacy] = useState({
        public: false,
        private: false,
        scheduled: false,
    });
    const [emails, setEmails] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoFile(URL.createObjectURL(file));
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
        const { name, checked } = event.target;
        setPrivacy({
            public: false,
            private: false,
            scheduled: false,
        });
        setPrivacy((prev) => ({ ...prev, [name]: checked }));
    };

    const handleAddEmail = () => {
        if (newEmail && !emails.includes(newEmail)) {
            setEmails([...emails, newEmail]);
            setNewEmail(""); // Clear the input after adding
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAddEmail();
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
            <Grid
                container
                justifyContent="center"
                sx={{
                    mb: 2,
                    backgroundColor: "#fff",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "10px",
                    padding: "20px",
                    maxWidth: "100%",
                    margin: "0 auto",
                }}
            >
                <Box
                    sx={{
                        color: '#595959',
                        fontFamily: 'poppins',
                        fontWeight: '600',
                        fontSize: "30px",
                        width: "97%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        sx={{
                            color: '#595959',
                            fontFamily: 'poppins',
                            fontWeight: '600',
                            fontSize: "30px",
                        }}
                    >
                        Create Memory
                    </Typography>
                </Box>

                <Divider sx={{ width: '97%', my: 2, border: "1px solid #d1d4e0" }} />

                <Box
                    sx={{
                        fontFamily: 'poppins',
                        fontWeight: '600',
                        fontSize: "20px",
                        textAlign: "center",
                        width: "100%",
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    {buttons.map((key) => (
                        <Button
                            key={key}
                            onClick={() => setActiveButton(key)}
                            sx={{
                                color: key === button ? "#32AA27" : '#595959',
                                fontFamily: 'poppins',
                                fontWeight: '600',
                                fontSize: "20px",
                                position: "relative",
                                "&::after": {
                                    content: '""',
                                    display: "block",
                                    width: "100%",
                                    height: "3px",
                                    backgroundColor: key === button ? "#32AA27" : "transparent",
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                },
                            }}
                        >
                            {key}
                        </Button>
                    ))}
                </Box>

                <Grid
                    container
                    justifyContent="center"
                    sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "10px",
                        padding: "20px",
                        maxWidth: "100%",
                        margin: "0 auto",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            padding: "50px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "10px",
                            border: "2px solid #d1d4e0"
                        }}>
                        <input
                            accept="video/*"
                            style={{ display: "none" }}
                            id="video-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="video-upload">
                            <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                                disabled={uploading}
                            >
                                Upload Video
                            </Button>
                        </label>

                        {uploading && (
                            <>
                                <Typography variant="body1" sx={{ mt: 2 }}>Uploading: {progress}%</Typography>
                                <LinearProgress variant="determinate" value={progress} sx={{ width: "100%", mt: 1 }} />
                            </>
                        )}
                        {videoFile && !uploading && (
                            <video width="100%" controls style={{ marginTop: "20px", borderRadius: "10px" }}>
                                <source src={videoFile} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </Box>
                </Grid>

                <Grid
                    container
                    justifyContent="center"
                    sx={{
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "10px",
                        padding: "20px",
                        maxWidth: "100%",
                        margin: "0 auto",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            padding: "50px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            borderRadius: "10px",
                            border: "2px solid #d1d4e0",
                            gap: "30px"
                        }}>

                        <Box sx={{
                            width: "50%",
                        }}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ marginBottom: "20px" }}
                            />

                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{ marginBottom: "20px" }}
                                multiline
                                rows={7}
                            />
                        </Box>

                        <Box sx={{
                            width: "50%",
                        }}>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={privacy.public}
                                        onChange={handlePrivacyChange}
                                        name="public"
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#32AA27",
                                            },
                                        }}
                                    />
                                }
                                label="Public"
                                sx={{ marginBottom: "20px" }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={privacy.private}
                                        onChange={handlePrivacyChange}
                                        name="private"
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#32AA27",
                                            },
                                        }}
                                    />
                                }
                                label="Private"
                                sx={{ marginBottom: "20px" }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={privacy.scheduled}
                                        onChange={handlePrivacyChange}
                                        name="scheduled"
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#32AA27",
                                            },
                                        }}
                                    />
                                }
                                label="Scheduled"
                                sx={{ marginBottom: "20px" }}
                            />

                            {privacy.private && (
                                <>
                                    <Box
                                        sx={{
                                            marginTop: "10px",
                                            marginBottom: "10px",
                                            display: "flex",
                                            gap: "10px",
                                            flexWrap: "wrap",
                                            width: "100%",
                                            padding: "10px",
                                        }}
                                    >
                                        {emails.map((email, index) => (
                                            <Typography
                                                key={index}
                                                sx={{
                                                    color: '#595959',
                                                    backgroundColor: "#e5e7eb",
                                                    padding: "3px 10px",
                                                    borderRadius: "10px",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                {email}
                                            </Typography>
                                        ))}
                                    </Box>

                                    <TextField
                                        label="Email Address"
                                        variant="outlined"
                                        fullWidth
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        sx={{ marginBottom: "20px" }}
                                        type="email"
                                        onKeyPress={handleKeyPress}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleAddEmail} color="primary">
                                                        <AddIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </>

                            )}

                            {privacy.scheduled && (
                                <>
                                    <Box
                                        sx={{
                                            marginTop: "10px",
                                            marginBottom: "10px",
                                            display: "flex",
                                            gap: "10px",
                                            flexWrap: "wrap",
                                            width: "100%",
                                            padding: "10px",
                                        }}
                                    >
                                        {emails.map((email, index) => (
                                            <Typography
                                                key={index}
                                                sx={{
                                                    color: '#595959',
                                                    backgroundColor: "#e5e7eb",
                                                    padding: "3px 10px",
                                                    borderRadius: "10px",
                                                    marginBottom: "5px",
                                                }}
                                            >
                                                {email}
                                            </Typography>
                                        ))}
                                    </Box>

                                    <TextField
                                        label="Email Address"
                                        variant="outlined"
                                        fullWidth
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        sx={{ marginBottom: "20px" }}
                                        type="email"
                                        onKeyPress={handleKeyPress}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleAddEmail} color="primary">
                                                        <AddIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        label="Schedule Time"
                                        variant="outlined"
                                        fullWidth
                                        value={scheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                        sx={{ marginBottom: "20px" }}
                                        type="datetime-local"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </>
                            )}
                        </Box>

                    </Box>

                    <Box sx={{ width: "100%", marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "20px" }}>
                        <Button
                            sx={{ padding: "0px 20px 0px 20px", height: "50px", backgroundColor: '#e5e7eb', color: '#32AA27', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{ padding: "0px 20px 0px 20px", height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                        >
                            <IconButton sx={{ backgroundColor: "#fff", height: "30px", width: "30px", marginRight: "20px" }} color="primary">
                                <AddIcon sx={{ color: "#32AA27" }} />
                            </IconButton>
                            Create Memory
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
}
