import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import personalizedVMImg from '../../assets/personalizedVM-Img.jpeg';
import ScheduledMDImg from '../../assets/ScheduledMDImg.jpeg';
import SecureMLImg from '../../assets/SecureMLImg.jpeg';

function PVMAdditionals({ page }) {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (page === 'PVM') {
            setCurrentIndex(0);
        } else if (page === 'SMD') {
            setCurrentIndex(1);
        } else if (page === 'SML') {
            setCurrentIndex(2);
        }
    }, [page]);

    console.log(page)
    console.log(currentIndex)

    const images = [
        personalizedVMImg,
        ScheduledMDImg,
        SecureMLImg
    ];

    const heading = [
        "Personalized video messages",
        "Scheduled message delivery",
        "Secure message locking"
    ];

    const text = [
        "With LASTING LOVE, you can craft personalized video messages that resonate with your loved ones. Choose from a variety of unique backgrounds to set the perfect scene for your message. Whether it's a birthday, anniversary, or just because, these videos offer a personal touch that words alone cannot convey. Schedule them for future delivery, ensuring your sentiments are shared at just the right moment. This thoughtful approach not only expresses your feelings but also leaves a lasting memory for those you cherish. Let your love shine through with a customized video that speaks from the heart.",
        "Imagine the comfort your loved ones will feel when they receive a message from you, even after you're gone. With LASTING LOVE, you can schedule your personalized video messages for future delivery. This unique feature allows you to select the date and time that holds significance for you and your loved ones. Whether it's a special occasion or a simple reminder of your love, these scheduled messages ensure that your sentiments are shared with precision. Your legacy of love continues, providing closure and warmth to those you leave behind.",
        "Your words are precious, and at LASTING LOVE, we prioritize the security of your messages. Our platform offers a secure message locking feature that guarantees your personalized videos are sent only after your passing. This ensures that your loved ones receive your heartfelt messages in a timely manner, providing them with closure and comfort during a difficult time. With a subscription-based or one-time fee service, you can rest easy knowing that your messages are protected and will be delivered to your cherished ones when they need it most. Let your love endure with secure message locking."
    ];

    return (
        <section className="flex justify-center items-center bg-pm-message-bg pt-12 pb-12">

            <div className="w-[80%] h-[80%] flex items-center justify-between flex-col bp900:flex-row gap-10">

                <div className=" flex items-center justify-center w-[100%] bp900:w-[40%] aspect-[3/4] mt-20 bp900:mt-0 ">
                    <img
                        src={images[currentIndex]}
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
                        {heading[currentIndex]}
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
                        {text[currentIndex]}
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

export default PVMAdditionals;