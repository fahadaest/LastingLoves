import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function MessagesOfLove() {
    const navigate = useNavigate();

    const handleViewServices = () => {
        navigate('/Services');
    };

    return (
        <section className="flex flex-col justify-center items-center min-h-[90vh] bg-gradient-to-b from-black/30 via-black/50 to-black/70">
            <div className='flex flex-col w-[80%] gap-4 '>
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: 'poppins',
                        fontSize: { xxs: '12px', xs: '22px', md: '42px' },
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: '#FFFFFF',
                    }}
                >
                    Create Lasting memories for your Loved Ones
                </Typography>

                <Typography
                    variant="p"
                    sx={{
                        fontFamily: 'poppins',
                        fontSize: { xs: '18px', md: '24px' },
                        fontWeight: 400,
                        letterSpacing: '.1rem',
                        color: '#FFFFFF',
                    }}
                >
                    15% of proceeds will be going to a non profit, JAMIES HEROIC ACTS!
                </Typography>

                <Button
                    onClick={handleViewServices}
                    sx={{ width: '200px', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                >
                    View Services
                </Button>
            </div>
        </section >
    );
}

export default MessagesOfLove;