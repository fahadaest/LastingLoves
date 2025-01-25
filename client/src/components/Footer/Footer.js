import * as React from 'react';
import { Grid, Container, Typography, Box, Link } from '@mui/material';

function Footer() {

  return (
    <Box sx={{ backgroundColor: "#162415", height: "27vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }} maxWidth="lg">
        <Grid sx={{ width: "100%" }} item xs={12} md={6}>
          <nav aria-label="Secondary">
            <ul style={{ width: "100%", listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
              <li>
                <Link sx={{
                  fontFamily: "poppins",
                  color: "#fff",
                  textDecoration: "underline",
                }} href="/scheduling" color="inherit" underline="hover">
                  Schedule appointment
                </Link>
              </li>
              <li>
                <Link sx={{
                  fontFamily: "poppins",
                  color: "#fff",
                  textDecoration: "underline",
                }} href="/intake-form" color="inherit" underline="hover">
                  Complete intake
                </Link>
              </li>
              <li>
                <Link sx={{
                  fontFamily: "poppins",
                  color: "#fff",
                  textDecoration: "underline",
                }} href="/privacy-policy" color="inherit" underline="hover">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </Grid>
      </Container>
    </Box>
  );
}
export default Footer;
