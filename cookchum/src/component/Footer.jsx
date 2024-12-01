import React from 'react';
import { Box, Typography } from '@mui/material';
import './Footer.css'; // Retain your custom CSS for specific styling

const Footer = () => {
  return (
    <footer className="footer">
      <Box className="footer-content">
        <Typography variant="body2" color="inherit" paragraph>
          &copy; 2024 CookChum. All rights reserved.
        </Typography>
        <Typography variant="body2" color="inherit" paragraph>
          CookChum is your go-to platform for discovering and sharing delicious recipes. Whether you're a seasoned chef or just starting out, we have a recipe for every occasion!
        </Typography>
        <Box className="footer-description">
          <Typography variant="body2" color="inherit">
            For any inquiries, feel free to reach out to us at:
            <br />
            <strong>Email:</strong> support@cookchum.com
          </Typography>
        </Box>
        <Box className="footer-social-media">
          <Typography variant="body2" color="inherit">
            Follow us on social media:
          </Typography>
          <Box>
            <Typography variant="body2" color="inherit">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <strong>Facebook</strong>
              </a> 
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <strong>Instagram</strong>
              </a> 
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <strong>Twitter</strong>
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;