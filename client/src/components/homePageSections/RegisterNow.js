import React from "react";
import { Box, Typography, Grid, Button, Container } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/poppins";
import personalTouchImg from "../../assets/personal-touch.jpeg"
import { useNavigate } from 'react-router-dom';

const Section = styled(Box)(({ theme }) => ({
    backgroundColor: "black",
    // backgroundImage: `url(${personalTouchImg})`,
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

const RegisterNow = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/Sign-up');
    };

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
                                Register Now
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
                                Register now and start preserving your memories for the ones you love
                            </Typography>
                            <Button
                                onClick={handleRegisterClick}
                                sx={{ width: '200px', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                            >
                                Register Now
                            </Button>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Container>
        </Section>
    );
};

export default RegisterNow;
