import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import personalizedVMImg from '../../assets/personalizedVM-Img.jpeg';
import ScheduledMDImg from '../../assets/ScheduledMDImg.jpeg';
import SecureMLImg from '../../assets/SecureMLImg.jpeg';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);

function UpgradePlan({ page }) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clientSecret, setClientSecret] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        if (page === 'MON') setCurrentIndex(0);
        else if (page === 'ANN') setCurrentIndex(1);

        const handleUpgrade = async () => {
            let amount;
            if (page === 'MON') amount = 1000;
            else if (page === 'ANN') amount = 30000;

            try {
                const response = await axios.post(`${baseURL}/api/auth/checkout-session`, { amount, page });
                setClientSecret(response.data.clientSecret);
                setIsLoading(false);
            } catch (error) {
                console.error('Payment initiation failed:', error);
                setIsLoading(false);
            }
        };

        handleUpgrade();
    }, [page, baseURL]);

    const images = [personalizedVMImg, ScheduledMDImg, SecureMLImg];

    const heading = [
        "Monthly Plan: $10.00",
        "Annual Plan: $300.00",
    ];

    const text = [
        "Create and upload video messages that are publicly displayed on your profile page for anyone to view. These memories will remain visible indefinitely, giving your loved ones, friends, and even future generations a chance to connect with you, hear your voice, and relive the moments and lessons you’ve shared. Whether it’s cherished memories, life advice, or simple messages of love, your public video memories will form a timeless digital legacy that lives on.",
        "Sometimes, the most meaningful words are the ones shared in private. With this feature, you can record personal video messages meant exclusively for specific individuals. These messages are securely stored and kept completely private—only to be revealed under certain conditions, like confirmation of your passing. It’s a powerful way to leave behind heartfelt goodbyes, personal reflections, or important information that remains confidential until the time is right.",
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
                            fontSize: '18px',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: '#32AA27',
                            textTransform: 'uppercase',
                        }}
                    >
                        {heading[currentIndex]}
                    </Typography>

                    {isLoading ? (
                        <Typography variant="body2" sx={{ fontFamily: 'poppins' }}>
                            <CircularProgress size={44} sx={{ color: '#32AA27' }} />
                        </Typography>
                    ) : clientSecret ? (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm page={page} />
                        </Elements>
                    ) : (
                        <Typography variant="body2" sx={{ fontFamily: 'poppins' }}>
                            Payment session failed to initialize. Please try again later.
                        </Typography>
                    )}
                </div>
            </div>
        </section>
    );
}

export default UpgradePlan;
