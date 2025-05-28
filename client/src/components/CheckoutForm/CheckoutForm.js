import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CustomAlert from '../Alert/Alert';

export const CheckoutForm = ({ page }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isStripeReady, setIsStripeReady] = useState(false);
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
    const baseURL = process.env.REACT_APP_BASE_URL;
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [duration, setDuration] = useState("4000");
    const [showAlert, setShowAlert] = useState(false);

    console.log(showAlert)

    useEffect(() => {
        if (stripe && elements) {
            setIsStripeReady(true);
        }
    }, [stripe, elements]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setPaymentProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        });

        if (error) {
            setMessage(error.message);
            setSeverity("error");
            setShowAlert(true);
            setPaymentProcessing(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                await axios.post(`${baseURL}/api/auth/payment/success`, { page }, { withCredentials: true });
                setMessage("Payment successful!");
                setSeverity("success");
                setShowAlert(true);
                setTimeout(() => {
                    window.location.href = `${frontendUrl}/profile`;
                }, 2000);
            } catch (err) {
                setMessage(err.message);
                setSeverity("error");
                setShowAlert(true);
                setPaymentProcessing(false);
            }
        }
        else {
            setPaymentProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {isStripeReady ? (
                <>
                    <PaymentElement />
                    <Button
                        type="submit"
                        disabled={paymentProcessing}
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
                        {paymentProcessing ? (
                            <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                        ) : (
                            `Pay ${page === 'MON' ? '$10.00' : '$300.00'}`
                        )}
                    </Button>
                </>
            ) : (
                <Typography variant="body2" sx={{ fontFamily: 'poppins' }}>
                    <CircularProgress size={44} sx={{ color: '#32AA27' }} />
                </Typography>
            )}

            {showAlert && (
                <CustomAlert
                    message={message}
                    severity={severity}
                    duration={duration}
                    setShowAlert={setShowAlert}
                />
            )}


        </form>
    );
};

