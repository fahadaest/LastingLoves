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
        "Public Video Memories",
        "Private Messages for Later",
        "Scheduled Message Delivery"
    ];

    const text = [
        "Create and upload video messages that are publicly displayed on your profile page for anyone to view. These memories will remain visible indefinitely, giving your loved ones, friends, and even future generations a chance to connect with you, hear your voice, and relive the moments and lessons you’ve shared. Whether it’s cherished memories, life advice, or simple messages of love, your public video memories will form a timeless digital legacy that lives on.",
        "Sometimes, the most meaningful words are the ones shared in private. With this feature, you can record personal video messages meant exclusively for specific individuals. These messages are securely stored and kept completely private—only to be revealed under certain conditions, like confirmation of your passing. It’s a powerful way to leave behind heartfelt goodbyes, personal reflections, or important information that remains confidential until the time is right.",
        "Life is full of special dates and moments, and now you can be part of them, no matter where you are. This feature allows you to schedule video messages in advance, ensuring they’re delivered to your loved ones at precisely the time you choose—whether it’s a birthday, anniversary, holiday, or any meaningful occasion. Your thoughtful message will arrive right on schedule, offering comfort, encouragement, or celebration exactly when it’s needed most."
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
                        Create Memory
                    </Button>
                </div>



            </div>

        </section>
    );
}

export default PVMAdditionals;