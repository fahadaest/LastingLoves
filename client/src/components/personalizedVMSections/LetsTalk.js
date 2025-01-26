import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import 'aos/dist/aos.css';

const LetsTalk = () => {

    return (
        <Box sx={{ backgroundColor: "#32AA27", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }}>
            <div className=' w-[80%] bp900:w-[60%] flex flex-col bp900:flex-row items-center justify-center gap-10 bp900:gap-32 '>

                <Grid>
                    <Box textAlign="left">
                        <Typography
                            variant="h4"
                            component="div"
                            gutterBottom
                            sx={{ padding: "0", margin: "0", fontWeight: 'bold', color: "#FFFFFF", fontSize: "62px", fontFamily: "poppins", textDecoration: "uppercase", fontWeight: "700" }}
                        >
                            Let's talk
                        </Typography>
                    </Box>

                    <Box textAlign="left">
                        <Typography
                            variant="subtitle1"
                            component="div"
                            color="textSecondary"
                            sx={{ color: "#FFFFFF", fontSize: "24px", fontWeight: "500", padding: "0", margin: "0" }}
                        >
                            We would love to hear from you!
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box textAlign="left">
                        <Button
                            sx={{ border: "2px solid #fff", borderRadius: "0", fontFamily: "poppins", fontWeight: "500", fontSize: "16px", color: "#fff", padding: "10px 25px 10px 25px" }}
                        >
                            Get in touch
                        </Button>
                    </Box>
                </Grid>

            </div>
        </Box >
    );
};

export default LetsTalk;
