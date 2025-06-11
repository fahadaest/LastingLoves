import { useStripe, useElements, PaymentElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import CustomAlert from '../Alert/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

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
    const [smsConsent, setSmsConsent] = useState(false);
    const [smsConsentError, setSmsConsentError] = useState(false);
    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberError, setContactNumberError] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [canMakePayment, setCanMakePayment] = useState(false);

    console.log(paymentRequest)
    console.log(canMakePayment)

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total',
                    amount: page === 'MON' ? 1000 : 30000, // in cents
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            pr.canMakePayment().then(result => {
                if (result) {
                    setPaymentRequest(pr);
                    setCanMakePayment(true);
                }
            });
        }
    }, [stripe]);

    useEffect(() => {
        if (paymentRequest) {
            paymentRequest.on('paymentmethod', async (ev) => {
                try {
                    const response = await axios.post(`${baseURL}/api/auth/create-payment-intent`, { page });
                    const clientSecret = response.data.clientSecret;

                    const { paymentIntent, error } = await stripe.confirmCardPayment(
                        clientSecret,
                        { payment_method: ev.paymentMethod.id },
                        { handleActions: false }
                    );

                    if (error) {
                        ev.complete('fail');
                        setMessage(error.message);
                        setSeverity("error");
                        setShowAlert(true);
                    } else {
                        ev.complete('success');

                        // Send success to backend
                        await axios.post(`${baseURL}/api/auth/payment/success`, { page }, { withCredentials: true });

                        setMessage("Payment successful!");
                        setSeverity("success");
                        setShowAlert(true);
                        setTimeout(() => {
                            window.location.href = `${frontendUrl}/profile`;
                        }, 2000);
                    }
                } catch (err) {
                    ev.complete('fail');
                    setMessage("Payment failed");
                    setSeverity("error");
                    setShowAlert(true);
                }
            });
        }
    }, [paymentRequest]);


    useEffect(() => {
        if (stripe && elements) {
            setIsStripeReady(true);
        }
    }, [stripe, elements]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        if (!smsConsent) {
            setSmsConsentError(true);
            return;
        }
        setPaymentProcessing(true);
        setSmsConsentError(false);

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

                    <TextField
                        label="Contact Number"
                        variant="outlined"
                        fullWidth
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        error={contactNumberError}
                        helperText={contactNumberError ? "Please enter your contact number." : ""}
                        sx={{ marginTop: '1.5rem', fontFamily: 'poppins', backgroundColor: "#fff" }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={smsConsent}
                                onChange={(e) => setSmsConsent(e.target.checked)}
                                name="smsConsent"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="body2" sx={{ fontFamily: 'poppins' }}>
                                I agree to receive promotional and marketing text messages sent via an autodialer. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. View our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                            </Typography>
                        }
                        sx={{ marginTop: '1rem' }}
                    />

                    {smsConsentError && (
                        <Typography color="error" variant="body2" sx={{ fontFamily: 'poppins', mb: 1 }}>
                            You must agree to receive SMS marketing messages to proceed.
                        </Typography>
                    )}

                    {canMakePayment && (
                        <div style={{ marginTop: '1rem' }}>
                            <PaymentRequestButtonElement options={{ paymentRequest }} />
                        </div>
                    )}

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

