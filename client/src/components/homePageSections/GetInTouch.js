import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ContactForm from '../getInTouchComponents/GetInTouchForm';
import ContactDetails from '../getInTouchComponents/GetInTouchContactDetails';

function GetInTouch() {
    return (
        <section className="flex justify-center items-center min-h-[90vh] bg-header-white  pt-12 pb-12">

            <div className="w-[80%] h-[80%] flex items-center justify-between flex-col bp900:flex-row">

                <div className=" w-[100%] bp900:w-[45%] flex flex-col items-start gap-5">
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
                        Get in touch
                    </Typography>

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: 'poppins',
                            fontSize: '32px',
                            fontWeight: 600,
                            letterSpacing: '.05rem',
                            color: '#020402',
                            marginBottom: "20px"
                        }}
                    >
                        We'd love to hear from you!
                    </Typography>

                    <ContactForm />
                </div>

                <div className=" flex items-center justify-center w-[100%] bp900:w-[50%] bp900:aspect-[3/4] mt-10 bp900:mt-0">
                    <ContactDetails />
                </div>

            </div>

        </section>
    );
}

export default GetInTouch;