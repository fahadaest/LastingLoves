import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function PrivacyPolicyContent() {
    const navigate = useNavigate();
    const monthlyPlan = process.env.REACT_APP_MONTHLY_PLAN;
    const annualPlan = process.env.REACT_APP_ANNUAL_PLAN;

    return (
        <section className="flex justify-center items-center pt-12 pb-12 min-h-[80vh] bg-header-white">
            <div className=" w-[80%] bp900:w-[75%] h-[80%] flex items-center justify-between flex-col bp900:flex-row">
                <div className=" w-[100%] bp900:w-[100%] h-full flex flex-col items-center justify-center gap-5">
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
                        Effective start Date: May 5th 2025
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '32px',
                            fontWeight: 600,
                            letterSpacing: '.05rem',
                            color: '#020402',
                            marginBottom: '40px',
                        }}
                    >
                        Welcome to LastingLoves
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        LastingLoves.com (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website and services.
                        <br />
                        By using our platform, you agree to the terms of this policy.
                    </Typography>








                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        Information We Collect
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        We collect the following types of information:
                        <br /><br />
                        <b>a. Personal Information</b>
                        <br />
                        • Name, email address, phone number<br />
                        • Contact details for your designated recipients and verifiers<br />
                        • Billing and payment information (via secure third-party processors)<br /><br />



                        <b>b. User Content</b><br />
                        • Video messages and written notes you upload<br />
                        • Scheduled delivery dates and associated preferences<br /><br />



                        <b>c. Technical Information</b><br />
                        • IP address, browser type, device identifiers<br />
                        • Usage data (pages viewed, features used, time on site)<br /><br />
                    </Typography>







                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        How We Use Your Information
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        We use your information to: <br />
                        • Provide and improve our services<br />
                        • Store and schedule delivery of your video messages<br />
                        • Verify your status through designated verifiers<br />
                        • Communicate with you and your recipients<br />
                        • Process payments and subscriptions<br />
                        • Enforce our Terms of Service
                    </Typography>







                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        How We Protect Your Information
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        We use industry-standard encryption, secure servers, and data access restrictions to protect your information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                        <br />
                        <br />
                        You are responsible for maintaining the confidentiality of your login credentials.
                    </Typography>







                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        Sharing of Information
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        We do not sell, rent, or share your personal data with third parties for marketing purposes. <br /><br />
                        We may share limited information with:<br />
                        • Service providers (e.g. video storage, payment processors)<br />
                        • Law enforcement if required by law<br />
                        • Verifiers you’ve designated, for death confirmation purposes
                    </Typography>







                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        Your Rights and Choices
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        You have the right to: <br />
                        • Access, update, or delete your personal data<br />
                        • Cancel your account and request content deletion<br />
                        • Opt out of non-essential communications<br /><br />
                        You may do so through your account settings or by contacting us at privacy@lastingloves.com.
                    </Typography>






                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        Children’s Privacy
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        Our services are not intended for users under 18. We do not knowingly collect data from minors.
                    </Typography>






                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        Data Retention
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        We retain your information as long as your account is active or scheduled content exists. You may request permanent deletion at any time.
                    </Typography>






                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        International Users
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        If you access our services from outside the U.S., you consent to the transfer and processing of your data in the United States, which may not have the same data protection laws as your country.
                    </Typography>






                    <Typography
                        variant="h1"
                        className="hover-text"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '20px',
                            fontWeight: 600,
                            letterSpacing: '.1rem',
                            color: '#020402',
                        }}
                    >
                        Changes to This Policy
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '18px',
                            fontWeight: 400,
                            letterSpacing: '.1rem',
                            color: '#595959',
                            textAlign: 'center',
                        }}
                    >
                        We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a notice on our website.
                    </Typography>












                </div>
            </div>
        </section >
    );
}

export default PrivacyPolicyContent;