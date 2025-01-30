import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import sampleImg1 from "../../assets/Jamie-Lambros.jpg";
import sampleImg2 from "../../assets/Jamie-Lambros.jpg";
import sampleImg3 from "../../assets/Jamie-Lambros.jpg";

export default function Memories() {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: { sm: '100%', md: '1700px' },
                margin: '0 auto',  // Center the box properly
                overflow: 'hidden'  // Prevent extra expansion
            }}
        >
            <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{
                    mb: 2,
                    backgroundColor: "#E2F9D8",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #595959",
                    borderRadius: "10px",
                    padding: "20px",
                    maxWidth: "100%",  // Ensure it doesn't exceed the screen width
                    margin: "0 auto"  // Align center properly
                }}
            >
                <Box
                    sx={{
                        color: '#595959',
                        fontFamily: 'poppins',
                        fontWeight: '600',
                        fontSize: "30px",
                        textAlign: "center",
                        width: "100%"
                    }}
                >
                    My Memories
                </Box>

                {/* Images Row */}
                {[sampleImg1, sampleImg2, sampleImg3, sampleImg1, sampleImg2, sampleImg3].map((img, index) => (
                    <Grid
                        item
                        xs={12} sm={4}
                        key={index}
                        sx={{ display: "flex", justifyContent: "center", backgroundColor: "aqua", alignItems: "center" }}
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
