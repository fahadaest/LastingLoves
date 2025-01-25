import React, { useState } from "react";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { styled } from "@mui/system";

const FormWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
    margin: "0 auto",
});

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <FormWrapper
            component="form"
            onSubmit={handleSubmit}
            data-aos="slide-up"
            data-aos-offset="120"
            data-aos-delay="0"
            data-aos-duration="400"
            data-aos-easing="ease-in-out"
            data-aos-once="true"
        >

            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                placeholder="Jane Smith"
            />

            <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                placeholder="email@website.com"
            />

            <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
                placeholder="555-555-5555"
            />

            <TextField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Your message here"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        required
                    />
                }
                label="I allow this website to store my submission so they can respond to my inquiry."
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ width: '100%', height: "50px", backgroundColor: '#32AA27', color: '#FFFFFF', fontFamily: 'poppins', fontWeight: '600', fontSize: "16px", borderRadius: '0px' }}
            >
                Submit
            </Button>
        </FormWrapper>
    );
};

export default ContactForm;