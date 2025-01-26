import React from 'react';
import {
    Box,
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Link
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const ContactDetails = () => {
    const hours = [
        { day: 'Monday', from: '9:00am', to: '10:00pm' },
        { day: 'Tuesday', from: '9:00am', to: '10:00pm' },
        { day: 'Wednesday', from: '9:00am', to: '10:00pm' },
        { day: 'Thursday', from: '9:00am', to: '10:00pm' },
        { day: 'Friday', from: '9:00am', to: '10:00pm' },
        { day: 'Saturday', from: '9:00am', to: '6:00pm' },
        { day: 'Sunday', from: '9:00am', to: '12:00pm' },
    ];

    return (
        <Grid sx={{ backgroundColor: "#f5f5f5", display: "flex", flexDirection: "column", padding: "30px", width: "100%", height: "fit-content", gap: "30px" }} >

            <Grid sx={{ width: "100%" }} item xs={12} md={6}>
                <Box>
                    <Typography sx={{ fontFamily: "poppins", fontSize: "20px", fontWeight: "700" }} variant="h5" gutterBottom>
                        Get in touch
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <EmailIcon fontSize="small" />
                        <Link sx={{ fontFamily: "poppins", fontSize: "18px", fontWeight: "400", color: "#595959", textDecoration: "underline" }} href="mailto:joeydeals@gmail.com" underline="hover">
                            joeydeals@gmail.com
                        </Link>
                    </Box>
                </Box>
            </Grid>

            <Grid sx={{ width: "100%" }} item xs={12} md={6}>
                <Box>
                    <Typography sx={{ fontFamily: "poppins", fontSize: "20px", fontWeight: "700" }} variant="h5" gutterBottom>
                        Hours
                    </Typography>
                    <List >
                        {hours.map((hour, index) => (
                            <ListItem sx={{ margin: "0", padding: "0" }} key={index} disableGutters>
                                <ListItemText
                                    sx={{ display: "flex", width: "full", margin: "0", padding: "0", gap: "40px" }}
                                    primary={
                                        <Typography
                                            sx={{
                                                marginBottom: "8px",
                                                fontFamily: "poppins",
                                                fontSize: "18px",
                                                fontWeight: "400"
                                            }}
                                            variant="body1"
                                            component="span"
                                        >
                                            {hour.day}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            sx={{
                                                margin: "0",
                                                padding: "0",
                                                fontFamily: "poppins",
                                                fontSize: "18px",
                                                fontWeight: "400"
                                            }}
                                            variant="body2"
                                        >
                                            {`${hour.from} – ${hour.to}`}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ContactDetails;