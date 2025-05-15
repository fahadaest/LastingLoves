import Typography from '@mui/material/Typography';

function TermsOfServiceHeader() {
    return (
        <section className="flex flex-col justify-center items-center min-h-[45vh] bg-gradient-to-b from-black/30 via-black/50 to-black/70">
            <div className='flex justify-center w-[80%] gap-3 mt-10'>
                <Typography
                    variant="h1"
                    sx={{
                        fontFamily: 'poppins',
                        fontSize: { xxs: '22px', xs: '42px', md: '62px' },
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: '#FFFFFF',
                    }}>
                    Terms of Service
                </Typography>
            </div>
        </section >
    );
}

export default TermsOfServiceHeader;