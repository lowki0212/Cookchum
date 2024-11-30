import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Snackbar } from '@mui/material';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Header from './Header';
import './ContactUs.css';

const ContactUs = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);  // Show success message
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" className="contact-container">
        <Typography variant="h3" align="center" gutterBottom className="contact-title">
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Have questions or suggestions? We'd love to hear from you! Fill out the form below or reach out to us directly.
        </Typography>

        <Grid container spacing={4} justifyContent="center" className="contact-form">
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Your Name" variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Your Email" variant="outlined" required />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          message="Thank you for reaching out! We'll get back to you shortly."
        />

        {/* Additional Contact Info */}
        <Box className="contact-info">
          <Typography variant="h5" align="center" className="contact-info-title">
            Or reach us at:
          </Typography>
          <Grid container spacing={3} justifyContent="center" className="contact-info-grid">
            <Grid item xs={12} sm={4} className="contact-info-item">
              <FaPhoneAlt className="contact-icon" />
              <Typography variant="h6">Phone</Typography>
              <Typography variant="body1">+1 234 567 890</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className="contact-info-item">
              <FaEnvelope className="contact-icon" />
              <Typography variant="h6">Email</Typography>
              <Typography variant="body1">contact@cookchum.com</Typography>
            </Grid>
            <Grid item xs={12} sm={4} className="contact-info-item">
              <FaMapMarkerAlt className="contact-icon" />
              <Typography variant="h6">Address</Typography>
              <Typography variant="body1">123 Food St, Lapaloma City, Cookland</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ContactUs;