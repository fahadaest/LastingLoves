import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Button, Typography, Modal } from '@mui/material';
import axios from 'axios';

export default function Memories() {
    const [button, setActiveButton] = useState("All Memories");
    const buttons = ["All Memories"];
    const [memories, setMemories] = useState([]);
    const [selectedMemory, setSelectedMemory] = useState(null); // State to track the selected memory

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/myMemories', {
                    withCredentials: true,
                });
                setMemories(response?.data?.memories);
            } catch (error) {
                console.error("Error fetching memories:", error);
            }
        };

        fetchMemories();
    }, []);

    const handleClose = () => {
        setSelectedMemory(null); // Close the modal
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
                        My Memories
                    </Typography>
                    <Typography
                        sx={{
                            color: '#595959',
                            fontFamily: 'poppins',
                            fontWeight: '600',
                            fontSize: "30px",
                        }}
                    >
                        Filter & Stuff
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

                {memories.map((memory, index) => (
                    <Grid
                        item
                        xs={4} sm={4}
                        key={memory._id}
                        sx={{ padding: "10px" }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                aspectRatio: "1/1",
                                borderRadius: "10px",
                                overflow: "hidden",
                                cursor: "pointer",
                            }}
                            onClick={() => setSelectedMemory(memory)}
                        >
                            <Box
                                component="img"
                                src={memory.thumbnailUrl}
                                alt={memory.title}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <Typography
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "#fff",
                                    textAlign: "center",
                                    fontFamily: 'poppins',
                                    fontWeight: '600',
                                    fontSize: "14px",
                                    padding: "5px",
                                }}
                            >
                                {memory.title}
                            </Typography>
                        </Box>
                    </Grid>
                ))}


                <Modal
                    open={Boolean(selectedMemory)}
                    onClose={handleClose}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "90%",
                            maxWidth: "800px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            boxShadow: 24,
                            p: 2,
                            outline: "none",
                            position: "relative",
                        }}
                    >
                        {selectedMemory && (
                            <Box>
                                <Typography
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontWeight: '600',
                                        fontSize: "18px",
                                        marginBottom: "10px",
                                        textAlign: "center",
                                    }}
                                >
                                    {selectedMemory.title}
                                </Typography>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "0",
                                        paddingBottom: "56.25%",
                                        position: "relative",
                                    }}
                                >
                                    <video
                                        src={selectedMemory.videoUrl}
                                        controls
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "10px",
                                            overflow: "hidden",
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Modal>

            </Grid>
        </Box>
    );
}
