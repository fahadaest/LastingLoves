import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import personalizedVMImg from '../../assets/personalizedVM-Img.jpeg';

function CherishYourLove() {
    return (
        <section className="flex justify-center items-center bg-pm-message-bg pt-12 pb-12">

            <div className="w-[80%] h-[80%] flex items-center justify-between flex-col bp900:flex-row gap-10">

                <div className=" flex items-center justify-center w-[100%] bp900:w-[40%] aspect-[3/4] mt-20 bp900:mt-0 ">
                    <img
                        src={personalizedVMImg}
                        alt="Hero Image"
                        className=" h-full w-full bp900:w-[50%] bp900:h-[50%] object-cover object-center"
                    />
                </div>

                <div className=" w-[100%] bp900:w-[55%] h-full flex flex-col items-start gap-5 ">
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
                        Personalized video messages
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
                        With ShowingILoveYou, you can craft personalized video messages that resonate with your loved ones. Choose from a variety of unique backgrounds to set the perfect scene for your message. Whether it's a birthday, anniversary, or just because, these videos offer a personal touch that words alone cannot convey. Schedule them for future delivery, ensuring your sentiments are shared at just the right moment. This thoughtful approach not only expresses your feelings but also leaves a lasting memory for those you cherish. Let your love shine through with a customized video that speaks from the heart.
                    </Typography>

                    <Button
                        sx={{ width: '250px', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
                    >
                        Schedule Appointment
                    </Button>
                </div>



            </div>

        </section>
    );
}

export default CherishYourLove;