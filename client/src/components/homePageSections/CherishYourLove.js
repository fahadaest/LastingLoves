import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CherishYourLove() {
    return (
        <section className="flex justify-center items-center min-h-[90vh] bg-header-white  pt-12 pb-12">

            <div className="w-[80%] h-[80%] flex items-center justify-between flex-col bp900:flex-row">

                <div className=" w-[100%] bp900:w-[55%] h-full flex flex-col items-start gap-10">
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
                        Cherish your love
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '32px',
                            fontWeight: 600,
                            letterSpacing: '.05rem',
                            color: '#020402',
                        }}
                    >
                        Messages that last forever
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
                        At ShowingILoveYou, we understand the importance of expressing love and creating lasting memories. Our platform allows you to craft personal video messages that can be customized with unique backgrounds and scheduled for future delivery. With our secure subscription-based or one-time fee service, you can ensure that your heartfelt messages reach your loved ones after you’re gone, offering them comfort and closure. Located in a world where love transcends time, we are dedicated to helping you connect with those who matter most.
                    </Typography>

                    <Button
                        sx={{
                            color: '#595959',
                            fontFamily: 'poppins',
                            fontWeight: '400',
                            fontSize: "18px",
                            textTransform: 'none',
                            padding: 0,
                            textDecoration: 'underline',
                        }}
                    >
                        Get in touch
                    </Button>
                </div>

                <div className=" w-[100%] bp900:w-[40%] h-full aspect-[3/4] mt-10 bp900:mt-0">
                    <img
                        src="https://cdn.b12.io/client_media/cQFRBNdt/0941ecfe-c694-11ef-9c5e-0242ac110002-jpg-hero_image.jpeg"
                        alt="Hero Image"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

            </div>

        </section>
    );
}

export default CherishYourLove;