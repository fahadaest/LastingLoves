import React from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Button
} from '@mui/material';
import { styled } from '@mui/system';
import CLMModal from './CLM-Modal';

const Section = styled('section')(({ theme }) => ({
    padding: theme.spacing(4, 0),
    background: 'url(https://via.placeholder.com/1920x1080) fixed',
}));

const CreateLastingMemories = () => {
    return (
        <Section sx={{ backgroundColor: "#fff", padding: "10vh 0px 10vh 0px" }} id="how-it-works">
            <Container sx={{ width: "80%" }} maxWidth="lg">

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} textAlign="center" mb={4}>
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        data-aos="slide-up"
                        data-aos-offset="120"
                        data-aos-delay="0"
                        data-aos-duration="400"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: '#32AA27',
                            textTransform: 'uppercase',
                        }}
                    >
                        Create lasting memories
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        data-aos="slide-up"
                        data-aos-offset="120"
                        data-aos-delay="50"
                        data-aos-duration="400"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '32px',
                            fontWeight: 600,
                            letterSpacing: '.05rem',
                            color: '#020402',
                            marginBottom: '20px',
                        }}
                    >
                        Personal video messages for your loved ones
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} data-aos="fade-in" data-aos-delay="0">
                        <Card sx={{
                            backgroundColor: "#fff",
                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.15)",
                            transition: "transform 0.1s ease-in-out",
                            "&:hover": {
                                cursor: "pointer",
                                transform: "scale(1.05)",
                                boxShadow: "0 5px 20px 0 #32AA27",
                                "& .hover-text": {
                                    color: "#32AA27",
                                },
                            },
                        }} >
                            <CardMedia
                                component="img"
                                height="200"
                                image="https://cdn.b12.io/client_media/cQFRBNdt/0b48c658-c694-11ef-8a29-0242ac110002-jpg-hero_image.jpeg"
                                alt="Create your message"
                            />
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        letterSpacing: '.1rem',
                                        color: '#020402',
                                        marginBottom: "20px"
                                    }}
                                    variant="h5"
                                    component="h3">
                                    Create your message
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                    }}
                                    variant="body2" color="text.secondary" paragraph>
                                    Express your love with heartfelt video messages tailored for your loved ones.
                                </Typography>
                                <Button
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '4px',
                                        textTransform: 'lowercase',
                                        padding: "0"
                                    }}
                                    href="#action-link">
                                    Learn more
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6} data-aos="fade-in" data-aos-delay="50">
                        <Card sx={{
                            backgroundColor: "#fff",
                            boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.15)",
                            transition: "transform 0.1s ease-in-out",
                            "&:hover": {
                                cursor: "pointer",
                                transform: "scale(1.05)",
                                boxShadow: "0 5px 20px 0 #32AA27",
                                "& .hover-text": {
                                    color: "#32AA27",
                                },
                            },
                        }} >
                            <CardMedia
                                component="img"
                                height="200"
                                image="https://cdn.b12.io/client_media/cQFRBNdt/0b825ada-c694-11ef-8a29-0242ac110002-jpg-hero_image.jpeg"
                                alt="Schedule your delivery"
                            />
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        letterSpacing: '.1rem',
                                        color: '#020402',
                                        marginBottom: "20px"
                                    }}
                                    variant="h5"
                                    component="h3">
                                    Schedule your delivery
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                    }}
                                    variant="body2" color="text.secondary" paragraph>
                                    Schedule your video messages for delivery on special occasions or moments.
                                </Typography>
                                <Button
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '4px',
                                        textTransform: 'lowercase',
                                        padding: "0"
                                    }}
                                    href="#action-link">
                                    Learn more
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Section>
    );
};

export default CreateLastingMemories;
