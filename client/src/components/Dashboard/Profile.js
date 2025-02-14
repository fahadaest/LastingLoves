import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, TextField, Button, CircularProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import loggedInImg from "../../assets/Jamie-Lambros.jpg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Profile() {
    const profileData = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = React.useState(false);
    const [username, setUsername] = React.useState(profileData?.username || "");
    const [bio, setBio] = React.useState(profileData?.bio || "Add a bio");
    const [avatar, setAvatar] = React.useState(profileData?.avatar);
    const [avatarFile, setAvatarFile] = React.useState(null);
    const [isUploading, setIsUploading] = React.useState(false);

    const handleEditClick = () => setIsEditing(!isEditing);
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);
    const baseURL = process.env.REACT_APP_BASE_URL;

    React.useEffect(() => {
        if (profileData) {
            setUsername(profileData.username || "");
            setBio(profileData.bio || "Add a bio");
            setAvatar(profileData.avatar);
        }
    }, [profileData]);


    const handleAvatarClick = async () => {
        try {
            const [fileHandle] = await window.showOpenFilePicker({
                types: [{ description: "Image Files", accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] } }],
                multiple: false,
            });

            const file = await fileHandle.getFile();
            setAvatarFile(file);

            setIsUploading(true);

            setTimeout(() => {
                setAvatar(URL.createObjectURL(file));
                setIsUploading(false); // Hide loader after upload
            }, 2000);

        } catch (error) {
            console.error("File selection was cancelled", error);
            setIsUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            const accessToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('accessToken='))
                ?.split('=')[1];

            const formData = new FormData();
            formData.append("username", username);
            formData.append("bio", bio);

            if (avatarFile) {
                formData.append("profilePic", avatarFile);
            }

            const response = await axios.put(
                `${baseURL}/api/auth/profile/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                dispatch({ type: "UPDATE_USER", payload: response.data });
                setAvatar(response.data.avatar);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    return (
        <Box sx={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "center", maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box
                sx={{ display: "flex", gap: "20px", width: "100%", mt: "10px", borderRadius: "10px", padding: "20px", boxShadow: "0px 4px 10px rgba(50, 170, 39, 0.4), 0px -4px 10px rgba(50, 170, 39, 0.4), 4px 0px 10px rgba(50, 170, 39, 0.4), -4px 0px 10px rgba(50, 170, 39, 0.4)" }}
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
                        {isUploading && (
                            <CircularProgress
                                size={40}
                                sx={{
                                    position: "absolute",
                                    top: "35%",
                                    left: "35%",
                                    transform: "translate(-50%, -50%)",
                                    color: "#ffffff99",
                                }}
                            />
                        )}
                    </Box>

                    {isEditing && (
                        <IconButton
                            sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                color: "white",
                                width: "30px",
                                height: "30px",
                                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" }
                            }}
                            onClick={handleAvatarClick}
                        >
                            <PhotoCameraIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                    )}
                </Box>

                <Box sx={{ width: "70%" }}>
                    <Box sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '600', fontSize: "30px" }}>
                        {isEditing ? (
                            <TextField
                                value={username}
                                onChange={handleUsernameChange}
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
                                {username}
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ display: "flex" }}>
                        {isEditing ? (
                            <TextField
                                value={bio}
                                onChange={handleBioChange}
                                variant="outlined"
                                size="small"
                                multiline
                                rows={5}
                                sx={{ width: "100%" }}
                            />
                        ) : (
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    color: "#595959",
                                }}
                            >
                                {bio}
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box>
                    <IconButton onClick={handleEditClick}>
                        {isEditing ? null : <EditIcon />}
                    </IconButton>

                    {/* Save Button */}
                    {isEditing && (
                        <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
                            Save
                        </Button>
                    )}
                </Box>

            </Box>
        </Box>
    );
}
