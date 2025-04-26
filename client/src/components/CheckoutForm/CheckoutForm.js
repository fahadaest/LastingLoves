import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export const CheckoutForm = ({ page }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isStripeReady, setIsStripeReady] = useState(false);
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        if (stripe && elements) {
            setIsStripeReady(true);
        }
    }, [stripe, elements]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        if (error) {
            console.error("Payment failed:", error.message);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                await axios.post(`${baseURL}/api/auth/payment/success`, { page }, { withCredentials: true });
                window.location.href = `${frontendUrl}/profile`;
            } catch (err) {
                console.error("Error updating payment plan:", err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {isStripeReady ? (
                <>
                    <PaymentElement />
                    <Button
                        type="submit"
                        sx={{
                            width: '250px',
                            height: "50px",
                            backgroundColor: '#32AA27',
                            color: '#FFFFFF',
                            fontFamily: 'poppins',
                            fontWeight: '600',
                            fontSize: "16px",
                            borderRadius: '0px',
                            marginTop: '1rem'
                        }}
                    >
                        Pay {page === 'MON' ? '$10.00' : '$300.00'}
                    </Button>
                </>
            ) : (
                <Typography variant="body2" sx={{ fontFamily: 'poppins' }}>
                    <CircularProgress size={44} sx={{ color: '#32AA27' }} />
                </Typography>
            )}

        </form>
    );
};

