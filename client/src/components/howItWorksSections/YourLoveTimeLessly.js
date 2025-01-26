import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function YourLoveTimeLessly() {
    return (
        <section className="flex flex-col justify-center items-center min-h-[45vh] bg-gradient-to-b from-black/30 via-black/50 to-black/70">
            <div className='flex flex-col w-[80%] gap-3 mt-10'>
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
                    Your love, timelessly
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
                    Create lasting messages for your loved ones
                </Typography>

            </div>
        </section >
    );
}

export default YourLoveTimeLessly;