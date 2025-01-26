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

const LetsTalk = () => {
    React.useEffect(() => {
        Aos.init({ duration: 400 });
    }, []);

    return (
        <StyledSection sx={{ backgroundColor: "#32AA27", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "40vh" }} id="contact-cta-section">
            <div className=' w-[80%] bp900:w-[60%] flex flex-col bp900:flex-row items-center justify-center gap-10 bp900:gap-32 '>

                <Grid>

                    <Box data-aos="slide-up" data-aos-delay="0" textAlign="left">
                        <Typography
                            variant="h4"
                            component="div"
                            gutterBottom
                            sx={{ padding: "0", margin: "0", fontWeight: 'bold', color: "#FFFFFF", fontSize: "62px", fontFamily: "poppins", textDecoration: "uppercase", fontWeight: "700" }}
                        >
                            Let's talk
                        </Typography>
                    </Box>

                    <Box data-aos="slide-up" data-aos-delay="50" textAlign="left">
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
                    <Box data-aos="slide-up" data-aos-delay="200" textAlign="left">
                        <Button
                            sx={{ border: "2px solid #fff", borderRadius: "0", fontFamily: "poppins", fontWeight: "500", fontSize: "16px", color: "#fff", padding: "10px 25px 10px 25px" }}
                            href="/index#contact"
                        >
                            Get in touch
                        </Button>
                    </Box>
                </Grid>

            </div>
        </StyledSection >
    );
};

export default LetsTalk;
