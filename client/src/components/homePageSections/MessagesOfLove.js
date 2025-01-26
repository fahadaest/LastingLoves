import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MessagesOfLove() {
    return (
        <section className="flex flex-col justify-center items-center min-h-[90vh] bg-gradient-to-b from-black/30 via-black/50 to-black/70">
            <div className='flex flex-col w-[80%] gap-4 '>
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: 'poppins',
                        fontSize: { xxs: '22px', xs: '42px', md: '62px' },
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: '#FFFFFF',
                    }}
                >
                    Messages of love
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
                    Create Lasting memories
                </Typography>

                <Button
                    sx={{ width: '200px', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                >
                    View Services
                </Button>
            </div>
        </section >
    );
}

export default MessagesOfLove;