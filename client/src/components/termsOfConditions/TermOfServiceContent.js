import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function TermOfServiceContent() {
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
                        These Terms of Service (“Terms”) govern your access to and use of LastingLoves.com (“we,” “our,” or “us”) including any features, content, functionality, and services offered on or through the website and related applications.
                        <br />
                        By accessing or using LastingLoves.com, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use our services.
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
                        Eligibility
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
                        You must be at least 18 years old to use our services. By using LastingLoves.com, you represent and warrant that you meet this requirement.
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
                        Account Registration
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
                        To use certain features, you must create an account and provide accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials and are fully responsible for all activity under your account.
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
                        User Content
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
                        You retain ownership of the content you create, including videos, messages, and any other media (“User Content”). By uploading content, you grant us a license to store, host, and deliver that content according to your settings (including delivery upon your passing or at a scheduled time).
                        <br />
                        You affirm that you have the right to use, record, and distribute the content you upload and that it does not violate the rights of others.
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
                        Scheduled and Posthumous Delivery
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
                        LastingLoves.com allows users to schedule video releases to loved ones after a specified date or upon verified death. You are responsible for providing accurate verifier information. We cannot guarantee delivery if verifiers do not respond or if contact information becomes invalid.
                        <br />
                        We may request confirmation via email, SMS, or other methods before releasing content.
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
                        Subscriptions and Payments
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
                        Some features may be available through a one-time fee or subscription. All fees are non-refundable except where required by law. We reserve the right to modify pricing or features at any time, with reasonable notice to subscribers.                    </Typography>




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
                        Prohibited Conduct
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
                        You agree not to: <br />
                        • Upload content that is illegal, defamatory, abusive, or violent<br />
                        • Impersonate any person or misrepresent your identity<br />
                        • Attempt to hack, disrupt, or reverse-engineer the platform<br />
                        • Use the platform for spamming or promotional purposes<br /><br />
                        We reserve the right to suspend or terminate accounts that violate these rules.
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
                        Data and Privacy
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
                        We respect your privacy. Please refer to our [Privacy Policy] for details on how we collect, use, and protect your data. We use secure encryption and storage practices but cannot guarantee 100% protection.                    </Typography>

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
                        Termination
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
                        You may cancel your account at any time. We reserve the right to suspend or terminate accounts for any violation of these Terms. Upon termination, your scheduled content may be deleted unless otherwise arranged.                    </Typography>



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
                        Disclaimer of Warranties
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
                        Our services are provided “as is.” We do not guarantee that messages will be delivered under all circumstances, including but not limited to changes in contact data, verification failure, or technical errors.                    </Typography>



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
                        Limitation of Liability
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
                        We are not liable for any indirect, incidental, or consequential damages arising out of your use of the platform, including missed deliveries, data loss, or emotional distress.
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
                        Changes to Terms
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
                        We may update these Terms occasionally. You will be notified of significant changes. Continued use after updates means you accept the new Terms.
                    </Typography>
                </div>
            </div>
        </section >
    );
}

export default TermOfServiceContent;