import React, { useState } from "react";
import { Box, Typography, IconButton, Dialog, Slide, Button } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import "@fontsource/poppins";
import createYourMessageImg from '../../assets/create-your-message.jpeg';
import scheduleYourDeliveryImg from '../../assets/scheduleYourDeliveryImg.jpeg';

const CLMModal = ({ open, onClose, route, currentIndex, setCurrentIndex }) => {

    const images = [
        createYourMessageImg,
        scheduleYourDeliveryImg,
    ];

    const heading = [
        "Create your message",
        "Schedule your delivery",
    ];

    const text = [
        "Craft heartfelt video messages that speak directly from your heart. With LASTING LOVE, you have the creative freedom to express your feelings in a way that resonates with your loved ones. Choose from a variety of personalized backgrounds that set the perfect tone for your message. Whether it's a birthday greeting, an anniversary surprise, or just a simple 'I love you,' your message can be as unique as your relationship. Let your loved ones feel your presence even when you are not physically there, ensuring your love is everlasting and cherished.",
        "Never miss a moment to connect with your loved ones. With LASTING LOVE, you can schedule your personalized video messages for delivery at the perfect time. Whether it's a special holiday, a significant anniversary, or a day when your loved ones need a reminder of your love, you decide when your message is sent. This feature allows you to create a lasting impact, even if you are not there in person. Your thoughtfulness will shine through, making every occasion memorable and meaningful for those you care about the most.",
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: "rgba(22, 36, 21, 0.9)",
                    boxShadow: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "70vh",
                    width: "80%",
                    opacity: "10",
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "#fff",
                }}
            >

                <div className=" flex items-center justify-between flex-col bp900:flex-row  h-[100%]">
                    <div className="border-r-2 border-gray-100 w-[100%] bp900:w-[50%] h-[50%] bp900:h-[100%] aspect-[3/4] mt-10 bp900:mt-0 bg-pink-200m hidden bp900:flex items-center justify-center pr-8 pl-8 ">
                        <img
                            src={images[currentIndex]}
                            alt="Quick View"
                            style={{ width: "100%", borderRadius: 8 }}
                        />
                    </div>

                    <div className=" w-[100%] bp900:w-[50%] h-full flex flex-col items-start justify-between gap-10">

                        <div className="flex justify-end w-[100%]">
                            <IconButton
                                onClick={onClose}
                                sx={{ color: "black" }}
                            >
                                <Close />
                            </IconButton>
                        </div>

                        <div className=" overflow-auto pr-10 pl-10">

                            <Typography
                                variant="h1"
                                sx={{
                                    fontFamily: 'poppins',
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    letterSpacing: '.05rem',
                                    color: '#595959',
                                    marginBottom: "20px"
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
                        </div>

                        <div className="flex items-center justify-end w-[100%] " >
                            <IconButton
                                onClick={handlePrev}
                                sx={{ color: "black" }}
                            >
                                <ArrowBack />
                            </IconButton>

                            <Typography
                                variant="h1"
                                sx={{
                                    fontFamily: 'poppins',
                                    fontSize: '20px',
                                    fontWeight: 600,
                                    letterSpacing: '.05rem',
                                    color: '#595959',
                                }}
                            >
                                {currentIndex + 1}/2
                            </Typography>

                            <IconButton
                                onClick={handleNext}
                                sx={{ color: "black" }}
                            >
                                <ArrowForward />
                            </IconButton>
                        </div>
                    </div>
                </div>

            </Box>
        </Dialog >
    );
};

export default CLMModal;
