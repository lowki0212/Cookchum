import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Snackbar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Header from './Header';
import './ContactUs.css';

const ContactUs = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  useEffect(() => {
    // Simulate loading or delay before showing the component
    const timer = setTimeout(() => {
      setIsVisible(true); // Set visible after 0.5 seconds
    }, 500);
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true); // Show success message
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" className={`contact-container ${isVisible ? 'fade-in' : ''}`}>
        <Typography variant="h3" align="center" gutterBottom className="contact-title">
          Get in Touch
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Whether you have a question, feedback, or just want to say hello, we're here to listen! Fill out the form below or
          contact us through the information provided.
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
              label="Your Message"
              variant="outlined"
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
              className="submit-button"
            >
              Send Message
            </Button>
          </Grid>
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          message="Thank you for reaching out! We'll get back to you shortly."
        />

        {/* Additional Contact Info */}
        <Box className="contact-info">
          <Typography variant="h5" align="center" className="contact-info-title">
            Our Contact Details
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

        {/* Team Section */}
        <Box className="team-section">
          <Typography variant="h4" align="center" className="team-title">
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
 <Grid item xs={12} sm={6} md={4}>
              <Card className="team-card">
                <CardMedia
                  component="img"
                  height="200"
                  image="https://i.ibb.co/XSzGLY3/2ffc83da9054.png"
                  alt="Team Member"
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    Jane Doe
                  </Typography>
                  <Typography variant="body2" align="center">
                    Customer Support Specialist
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="team-card">
                <CardMedia
                  component="img"
                  height="200"
                  image="https://i.ibb.co/XSzGLY3/2ffc83da9054.png"
                  alt="Team Member"
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    John Smith
                  </Typography>
                  <Typography variant="body2" align="center">
                    Technical Support Lead
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ContactUs;