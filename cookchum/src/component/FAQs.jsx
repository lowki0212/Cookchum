import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining'; // Food-related FAQs
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'; // Recipe-related FAQs
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'; // Support-related FAQs
import FeedbackIcon from '@mui/icons-material/Feedback'; // Feedback FAQs
import './FAQs.css';

const FAQs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const questions = [
    {
      question: "How does the ingredient-based recipe search work?",
      answer: "Input your ingredients, and we'll suggest recipes you can make. Our algorithm matches your input with recipes from our extensive database to find the best fit.",
      icon: <RestaurantMenuIcon style={{ fontSize: '2.5rem', color: '#ff5722' }} />,
      image: 'https://i.ibb.co/k9qZ0WX/1170f1494f08.jpg',
    },
    {
      question: "Can I get recipes for specific dietary restrictions?",
      answer: "Yes! We provide tailored recipe suggestions based on your preferences, such as vegan, gluten-free, or low-carb diets.",
      icon: <LocalDiningIcon style={{ fontSize: '2.5rem', color: '#4caf50' }} />,
      image: 'https://i.ibb.co/k9qZ0WX/1170f1494f08.jpg',
    },
    {
      question: "How accurate are the cost estimates for recipes?",
      answer: "We estimate costs based on market trends and local pricing data to help you budget better. While it's not exact, it gives you a reliable ballpark figure.",
      icon: <FeedbackIcon style={{ fontSize: '2.5rem', color: '#03a9f4' }} />,
      image: 'https://i.ibb.co/k9qZ0WX/1170f1494f08.jpg',
    },
    {
      question: "Can I save my favorite recipes?",
      answer: "Absolutely! Bookmark recipes to access them anytime from your personalized dashboard.",
      icon: <RestaurantMenuIcon style={{ fontSize: '2.5rem', color: '#ff9800' }} />,
      image: 'https://i.ibb.co/k9qZ0WX/1170f1494f08.jpg',
    },
    {
      question: "Does CookChum offer meal plans?",
      answer: "Yes! You can access weekly or monthly meal plans tailored to your dietary needs, preferences, and available ingredients.",
      icon: <LocalDiningIcon style={{ fontSize: '2.5rem', color: '#795548' }} />,
      image: 'https://i.ibb.co/k9qZ0WX/1170f1494f08.jpg',
    },
    {
      question: "Is there a mobile app for CookChum?",
      answer: "Yes! Download our app on iOS and Android for a seamless cooking experience on the go.",
      icon: <PhoneInTalkIcon style={{ fontSize: '2.5rem', color: '#673ab7' }} />,
      image: 'https://i.ibb.co/k9qZ0WX/1170f1494f08.jpg',
    },
    {
      question: "How do I provide feedback or suggest new features?",
      answer: "We love hearing from our users! Use the feedback form in the 'Contact Us' section or email us directly at feedback@cookchum.com.",
      icon: <FeedbackIcon style={{ fontSize: '2.5rem', color: '#e91e63' }} />,
      image: 'https://i.ibb.co/k9qZ0WX/1170f1494f08.jpg',
    },
  ];

  return (
    <Container maxWidth="lg" className={`faq-container ${isVisible ? 'fade-in' : ''}`}>
      <Typography variant="h3" align="center" gutterBottom className="faq-title">
        Frequently Asked Questions
      </Typography>
      <Typography variant="body1" align="center" className="faq-subtitle">
        Find answers to common questions about CookChum and its features.
      </Typography>
      <Grid container spacing={4} className="faq-grid">
        {questions.map((faq, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              className="faq-card"
              onMouseEnter={() => setHoveredQuestion(index)}
              onMouseLeave={() => setHoveredQuestion(null)}
            >
             <CardContent>
  <div
    className="faq-card-image"
    style={{
      backgroundImage: `url(${faq.image})`,
      height: '150px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '10px',
      marginBottom: '1rem',
    }}
  ></div>
  <div className="faq-icon">{faq.icon}</div>
  <Typography variant="body1" className="faq-question">
    {faq.question}
  </Typography>
  {hoveredQuestion === index && (
    <Typography variant="body2" className="faq-answer hover-visible">
      {faq.answer}
    </Typography>
  )}
</CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FAQs;
