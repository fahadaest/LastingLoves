import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function AffordableLove() {
    const navigate = useNavigate();
    const monthlyPlan = process.env.REACT_APP_MONTHLY_PLAN;
    const annualPlan = process.env.REACT_APP_ANNUAL_PLAN;

    return (
        <section className="flex justify-center items-center pt-12 pb-12 min-h-[80vh] bg-header-white">
            <div className=" w-[80%] bp900:w-[75%] h-[80%] flex items-center justify-between flex-col bp900:flex-row">
                <div className=" w-[100%] bp900:w-[100%] h-full flex flex-col items-start gap-5">
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: '#32AA27',
                            textTransform: 'uppercase',
                        }}
                    >
                        Affordable Love
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '32px',
                            fontWeight: 600,
                            letterSpacing: '.05rem',
                            color: '#020402',
                            marginBottom: '40px',
                        }}
                    >
                        Cherish memories with ease
                    </Typography>

                    <Box className="flex flex-col bp900:flex-row gap-5">

                        <Box>

                            <Box className="relative w-[30%] aspect-square mb-8">
                                <img
                                    src="https://cdn.b12.io/client_media/cQFRBNdt/0de995e0-c694-11ef-9cfc-0242ac110002-jpg-regular_image.jpeg"
                                    alt="Hero Image"
                                    className="w-[100%] h-[100%] object-cover rounded-full"
                                />
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", paddingRight: "10%" }}>
                                <Typography
                                    variant="h1"
                                    className="hover-text"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        letterSpacing: '.1rem',
                                        color: '#020402',
                                    }}
                                >
                                    Monthly Plan
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                    }}
                                >
                                    Memories stay uploaded for 60 days after last payment
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                    }}
                                >
                                    ${monthlyPlan}
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.05rem',
                                        color: '#595959',
                                        lineHeight: "25px"
                                    }}
                                >
                                    Create heartfelt personalized video messages for your loved ones with LASTING LOVE. Choose unique backgrounds, add your personal touch, and express your emotions authentically. Whether it’s a birthday, anniversary, or just a simple ‘I love you’, your customized video message can be scheduled for future delivery. Imagine the joy and surprise on their faces when they receive a message created just for them. This is your chance to share your feelings in a memorable way, ensuring your love transcends time and space. Cherish your relationships and create lasting memories today!
                                </Typography>

                                <Typography
                                    onClick={() => navigate('/monthly-plan')}
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Upgrade Plan
                                </Typography>
                            </Box>
                        </Box>

                        <Box>

                            <Box className="relative w-[30%] aspect-square mb-8">
                                <img
                                    src="https://cdn.b12.io/client_media/cQFRBNdt/0c544252-c694-11ef-9cfc-0242ac110002-jpg-regular_image.jpeg"
                                    alt="Hero Image"
                                    className="w-[100%] h-[100%] object-cover rounded-full"
                                />
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", paddingRight: "10%" }}>
                                <Typography
                                    variant="h1"
                                    className="hover-text"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '20px',
                                        fontWeight: 600,
                                        letterSpacing: '.1rem',
                                        color: '#020402',
                                    }}
                                >
                                    Annual Plan
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                    }}
                                >
                                    Pay once, save more, Memories stay uploaded forever
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                    }}
                                >
                                    ${annualPlan}
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        letterSpacing: '.05rem',
                                        color: '#595959',
                                        lineHeight: "25px"
                                    }}
                                >
                                    With LASTING LOVE, your love can reach your dear ones even when you're not there. Our scheduled video delivery feature allows you to lock in messages that will be sent on specific dates in the future. Whether it's for a special occasion or an unexpected surprise, you can ensure your voice is heard and your love is felt. Customize each message with unique backgrounds and heartfelt content. This service provides peace of mind, knowing that your sentiments will be delivered at the perfect moment, offering comfort and connection to those you cherish.
                                </Typography>

                                <Typography
                                    onClick={() => navigate('/annual-plan')}
                                    variant="h1"
                                    sx={{
                                        fontFamily: 'poppins',
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        letterSpacing: '.1rem',
                                        color: '#595959',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    Upgrade Plan
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                </div>
            </div>
        </section >
    );
}

export default AffordableLove;