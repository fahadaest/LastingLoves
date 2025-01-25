import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import Aos from 'aos';
import 'aos/dist/aos.css';

const StyledSection = styled('section')(({ theme }) => ({
    backgroundImage: 'url(your-background-image-url)',
    backgroundColor: "#020402",
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(8, 0),
}));

const ContactCTASection = () => {
    React.useEffect(() => {
        Aos.init({ duration: 400 });
    }, []);

    return (
        <StyledSection id="contact-cta-section">
            <Container sx={{ width: "80%" }} maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box data-aos="slide-up" data-aos-delay="0" textAlign="left">
                            <Typography
                                variant="h4"
                                component="div"
                                gutterBottom
                                sx={{ fontWeight: 'bold', color: "#FFFFFF", fontSize: "14px", fontFamily: "poppins", textDecoration: "uppercase", fontWeight: "500" }}
                            >
                                GET IN TOUCH
                            </Typography>
                        </Box>

                        <Box data-aos="slide-up" data-aos-delay="50" textAlign="left">
                            <Typography
                                variant="subtitle1"
                                component="div"
                                color="textSecondary"
                                sx={{ color: "#FFFFFF", fontSize: "32px", fontWeight: "600" }}
                            >
                                We're here to assist you!
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box data-aos="slide-up" data-aos-delay="200" textAlign="left">
                            <Button
                                sx={{ border: "2px solid #fff", borderRadius: "0", fontFamily: "poppins", fontWeight: "500", fontSize: "16px", color: "#fff", padding: "10px 25px 10px 25px" }}
                                href="/index#contact"
                            >
                                Get in touch
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </StyledSection>
    );
};

export default ContactCTASection;
