import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import loggedInImg from "../../assets/Jamie-Lambros.jpg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Profile() {
    const profileData = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    // Local state for editing
    const [isEditing, setIsEditing] = React.useState(false);
    const [username, setUsername] = React.useState(profileData?.username || "");
    const [bio, setBio] = React.useState(profileData?.bio || "Add a bio");

    // Handle edit/save toggle
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Handle input changes
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);

    // Handle save
    const handleSave = async () => {
        try {
            const accessToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('accessToken='))
                ?.split('=')[1];

            const response = await axios.put(
                "http://localhost:5000/api/auth/profile/update",
                { username, bio },
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                dispatch({ type: "UPDATE_USER", payload: response.data });
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };


    return (
        <Box sx={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "center", maxWidth: { sm: '100%', md: '1700px' } }}>
            <Box
                container
                spacing={2}
                sx={{ display: "flex", gap: "20px", width: "100%", mt: "10px", borderRadius: "10px", padding: "20px", boxShadow: "0px 4px 10px rgba(50, 170, 39, 0.4), 0px -4px 10px rgba(50, 170, 39, 0.4), 4px 0px 10px rgba(50, 170, 39, 0.4), -4px 0px 10px rgba(50, 170, 39, 0.4)" }}
            >

                <Avatar
                    alt="Profile Picture"
                    src={loggedInImg}
                    sx={{
                        width: { xs: 80, sm: 100, md: 120 },
                        height: { xs: 80, sm: 100, md: 120 },
                        border: "4px solid #595959",
                        backgroundColor: "red"
                    }}
                />

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
                                rows={3}
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
