import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const frontendUrl = process.env.FRONTEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `https://lastinglove-frontend.vercel.app/profile`,
            },
        });
        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                Upgrade Plan
            </Button>
        </form>
    );
};

