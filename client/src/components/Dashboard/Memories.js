import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import sampleImg1 from "../../assets/Jamie-Lambros.jpg";
import Divider from '@mui/material/Divider';
import { Button, Typography } from '@mui/material';

export default function Memories() {
    const [button, setActiveButton] = React.useState("All Memories");
    const buttons = ["All Memories", "Videos", "Pictures", "Text"];
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

                {[sampleImg1, sampleImg1, sampleImg1, sampleImg1, sampleImg1, sampleImg1].map((img, index) => (
                    <Grid
                        item
                        xs={4} sm={4}
                        key={index}
                        sx={{ padding: "10px" }}
                    >
                        <Box
                            component="img"
                            src={img}
                            alt={`Memory ${index + 1}`}
                            sx={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                borderRadius: "10px",
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
