import React from "react";
import { Box, Typography, Grid, Button, Container } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins";
import personalTouchImg from "../../assets/personal-touch.jpeg"

const Section = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    backgroundImage: `url(${personalTouchImg})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    padding: theme.spacing(8, 0),
    fontFamily: "Poppins, sans-serif",
}));

const ContentBox = styled(Box)(({ theme }) => ({
    textAlign: "center",
    color: "#fff",
}));

const CustomButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 4),
    fontFamily: "Poppins, sans-serif",
}));

const TOSContactUs = () => {
    return (
        <Section>
            <Container>
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={8}>
                        <ContentBox>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontFamily: 'poppins',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Contact Us
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{
                                    fontFamily: 'poppins',
                                    fontSize: '32px',
                                    fontWeight: 600,
                                    letterSpacing: '.05rem',
                                    color: '#fff',
                                    marginBottom: '20px',
                                }}
                            >
                                For questions or concerns, please contact:
                            </Typography>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontFamily: 'poppins',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Email: support@lastingloves.com <br />
                                Address: 223 east 1st st, deer park ny, 11729
                            </Typography>
                            {/* <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontFamily: 'poppins',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: '#fff',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Address: [Insert Business Address]
                            </Typography> */}
                        </ContentBox>
                    </Grid>
                </Grid>
            </Container>
        </Section>
    );
};

export default TOSContactUs;
