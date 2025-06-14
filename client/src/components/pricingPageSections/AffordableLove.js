import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function AffordableLove() {
    const navigate = useNavigate();
    const heartfeltPlan = process.env.REACT_APP_HEARTFELT_PLAN;
    const legacyPlusPlan = process.env.REACT_APP_LEGACY_PLUS;
    const eternalVaultPlan = process.env.REACT_APP_ETERNAL_VAULT;

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

                    <Box className="flex flex-col bp900:flex-row gap-10">

                        <Box
                            onClick={() => navigate('/monthly-plan')}
                            sx={{
                                padding: "20px",
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
                            }}>

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
                                    Heartfelt Plan
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
                                    ${heartfeltPlan}
                                </Typography>

                                <>
                                    {[
                                        "Up to 5 video messages",
                                        "Date or Occasion-based delivery",
                                        "Delivery via email + text",
                                        "Personalized background options",
                                        "Custom Delivery Notes",
                                    ].map((point, index) => (
                                        <Typography
                                            key={index}
                                            variant="h1"
                                            sx={{
                                                fontFamily: 'poppins',
                                                fontSize: '18px',
                                                fontWeight: 400,
                                                letterSpacing: '.05rem',
                                                color: '#595959',
                                                lineHeight: "25px",
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '8px',
                                                mt: index === 0 ? 0 : 1
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>•</span> {point}
                                        </Typography>
                                    ))}
                                </>


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

                        <Box
                            onClick={() => navigate('/annual-plan')}
                            sx={{
                                padding: "20px",
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
                            }}>

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
                                    Legacy Plus Plan
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
                                    ${legacyPlusPlan}
                                </Typography>

                                <>
                                    {[
                                        "Up to 5 video messages",
                                        "Date or Occasion-based delivery",
                                        "Delivery via email + text",
                                        "Personalized background options",
                                        "Custom Delivery Notes",
                                    ].map((point, index) => (
                                        <Typography
                                            key={index}
                                            variant="h1"
                                            sx={{
                                                fontFamily: 'poppins',
                                                fontSize: '18px',
                                                fontWeight: 400,
                                                letterSpacing: '.05rem',
                                                color: '#595959',
                                                lineHeight: "25px",
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '8px',
                                                mt: index === 0 ? 0 : 1
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>•</span> {point}
                                        </Typography>
                                    ))}
                                </>


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

                        <Box
                            onClick={() => navigate('/annual-plan')}
                            sx={{
                                padding: "20px",
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
                            }}>

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
                                    Eternal Value Plan
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
                                    ${eternalVaultPlan}
                                </Typography>

                                <>
                                    {[
                                        "Personalized background options",
                                    ].map((point, index) => (
                                        <Typography
                                            key={index}
                                            variant="h1"
                                            sx={{
                                                fontFamily: 'poppins',
                                                fontSize: '18px',
                                                fontWeight: 400,
                                                letterSpacing: '.05rem',
                                                color: '#595959',
                                                lineHeight: "25px",
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '8px',
                                                mt: index === 0 ? 0 : 1 // add margin top between items
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>•</span> {point}
                                        </Typography>
                                    ))}
                                </>


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