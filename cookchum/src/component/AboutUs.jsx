import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, Grid } from '@mui/material';
import { FaLeaf, FaUtensils, FaHandHoldingHeart, FaQuoteLeft } from 'react-icons/fa';
import Header from './Header';
import './AboutUs.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  useEffect(() => {
    // Simulate loading or delay before showing the component
    const timer = setTimeout(() => {
      setIsVisible(true); // Set visible after 0.5 seconds
    }, 500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <>
      <Header />
      <div className="about-bg">
        <Container maxWidth="lg" className={`about-container ${isVisible ? 'fade-in' : ''}`}>
          <Typography variant="h3" align="center" gutterBottom className="about-title">
            About Us
          </Typography>

          {/* Image Section */}
          <Box className="about-image-container">
            <img
              src="https://i.ibb.co/dBY1Rns/4f96fe88d320.png"
              alt="CookChum Team"
              className="about-image"
            />
          </Box>

          <Box className="about-content">
            {/* Description Section */}
            <Card elevation={3} className="about-card">
              <CardContent>
                <Typography variant="body1" gutterBottom className="about-text">
                  Welcome to <b>CookChum</b>, your ultimate companion in the kitchen! We’re here to simplify meal planning,
                  reduce food waste, and make healthy, budget-friendly cooking accessible to everyone.
                </Typography>
                <Typography variant="body1" className="about-text">
                  Whether you’re a health enthusiast, a home cook, or someone trying to make the most of what’s in your pantry,
                  CookChum is here to help. Let’s cook smarter, eat healthier, and waste less—together!
                </Typography>
                <Typography variant="body1" className="about-text" style={{ fontStyle: 'italic', marginTop: '1rem' }}>
                  “Join us in our mission to create a more sustainable and healthier world, one recipe at a time!”
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="learn-more-btn"
                  href="/ContactUs"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box className="about-vision">
            <Typography variant="h4" align="center" className="vision-title">
              Our Vision
            </Typography>
            <Typography align="center" className="vision-text">
              To inspire a global community where everyone can cook confidently, reduce food waste, and embrace sustainable living.
            </Typography>
          </Box>

          {/* Mission Section with Icons */}
          <Box className="about-mission">
            <Typography variant="h4" align="center" className="mission-title">
              Our Mission
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4} className="mission-item">
                <FaLeaf className="mission-icon" />
                <Typography variant="h6" align="center" className="mission-text">
                  Sustainability
                </Typography>
                <Typography align="center" className="mission-description">
                  We strive to reduce food waste and encourage sustainable cooking practices in every household.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="mission-item">
                <FaUtensils className="mission-icon" />
                <Typography variant="h6" align="center" className="mission-text">
                  Healthy Meals
                </Typography>
                <Typography align="center" className="mission-description">
                  Our recipes are designed to promote health and wellness, making it easy to eat well without breaking the bank.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="mission-item">
                <FaHandHoldingHeart className="mission-icon" />
                <Typography variant="h6" align="center" className="mission-text">
                  Community
                </ Typography>
                <Typography align="center" className="mission-description">
                  CookChum is a community-driven platform that helps individuals share their love for food while making cooking easier and fun!
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Testimonials Section */}
          <Box className="about-testimonials">
            <Typography variant="h4" align="center" className="testimonials-title">
              What Our Users Say
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Card elevation={3} className="testimonial-card">
                  <CardContent>
                    <FaQuoteLeft className="quote-icon" />
                    <Typography variant="body1" align="center" className="testimonial-text">
                      “CookChum has completely transformed the way I cook! I no longer waste food, and the recipes are delicious and healthy.”
                    </Typography>
                    <Typography align="center" className="testimonial-name">
                      – Sarah L.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card elevation={3} className="testimonial-card">
                  <CardContent>
                    <FaQuoteLeft className="quote-icon" />
                    <Typography variant="body1" align="center" className="testimonial-text">
                      “I love how CookChum simplifies meal planning. It’s a great resource for quick, easy, and nutritious meals.”
                    </Typography>
                    <Typography align="center" className="testimonial-name">
                      – Emily T.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Team Section */}
          <Box className="about-team">
            <Typography variant="h4" align="center" className="team-title">
              Meet the Team
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={3} className="team-member">
                <img
                  src="https://i.imghippo.com/files/BcV3439dVA.jpg"
                  alt="Team Member"
                  className="team-member-img"
                />
                <Typography variant="h6" align="center">Derick Wayne</Typography>
                <Typography align="center" className="team-role">Co-founder & CEO</Typography>
              </Grid>
              <Grid item xs={12} sm={3} className="team-member">
                <img
                  src="https://i.imghippo.com/files/PDuG1041EM.jpg"
                  alt="Team Member"
                  className="team-member-img"
                />
                <Typography variant="h6" align="center">Angelo Queita</Typography>
                <Typography align="center" className="team-role">Co-founder & COO</Typography>
              </Grid>
              <Grid item xs={12} sm={3} className="team-member">
                <img
                  src="https://i.imghippo.com/files/XSlt2331qJQ.jpg"
                  alt="Team Member"
                  className="team-member-img"
                />
                <Typography variant="h6" align="center">Andre Iguodala</Typography>
                <Typography align="center" className="team-role">Head Chef</Typography>
              </Grid>
              <Grid item xs={12} sm={3} className="team-member">
                <img
                  src="https://i.imghippo.com/files/kMRY8912BP.jpg"
                  alt="Team Member"
                  className="team-member-img"
                />
                <Typography variant="h6" align="center">Mtabs</Typography>
                <Typography align="center" className="team-role">Co-founder & CEO</Typography>
              </Grid>
              <Grid item xs={12} sm={3} className="team-member">
                <img
                  src="https://i.imghippo.com/files/HrY4118IaY.jpg"
                  alt="Team Member"
                  className="team-member-img"
                />
                <Typography variant="h6" align="center">Rudy</Typography>
                <Typography align="center" className="team-role">Co-founder & COO</Typography>
              </Grid>
              <Grid item xs={12} sm={3} className="team-member">
                <img
                  src="https://i.imghippo.com/files/qXSE6595VnA.jpg"
                  alt="Team Member"
                  className="team-member-img"
                />
                <Typography variant="h6" align="center"> Pol</Typography>
                <Typography align="center" className="team-role">Head Chef</Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default AboutUs;