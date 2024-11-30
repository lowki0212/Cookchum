import React, { useState, useEffect } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FAQs.css';

const FAQs = () => {
  const [isVisible, setIsVisible] = useState(false); // State for visibility

  useEffect(() => {
    // Simulate loading or delay before showing the component
    const timer = setTimeout(() => {
      setIsVisible(true); // Set visible after 0.5 seconds
    }, 500);
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const faqData = [
    {
      question: "How does the ingredient-based recipe search work?",
      answer: "Input your ingredients, and we'll suggest recipes you can make. Our algorithm matches your input with recipes from our extensive database to find the best fit.",
    },
    {
      question: "Can I get recipes for specific dietary restrictions?",
      answer: "Yes! We provide tailored recipe suggestions based on your preferences, such as vegan, gluten-free, or low-carb diets.",
    },
    {
      question: "How accurate are the cost estimates for recipes?",
      answer: "We estimate costs based on market trends and local pricing data to help you budget better. While it's not exact, it gives you a reliable ballpark figure.",
    },
    {
      question: "Can I save my favorite recipes?",
      answer: "Absolutely! Bookmark recipes to access them anytime from your personalized dashboard.",
    },
    {
      question: "Does CookChum offer meal plans?",
      answer: "Yes! You can access weekly or monthly meal plans tailored to your dietary needs, preferences, and available ingredients.",
    },
    {
      question: "Is there a mobile app for CookChum?",
      answer: "Yes! Download our app on iOS and Android for a seamless cooking experience on the go.",
    },
    {
      question: "How do I provide feedback or suggest new features?",
      answer: "We love hearing from our users! Use the feedback form in the 'Contact Us' section or email us directly at feedback@cookchum.com.",
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
      <div className="faq-content">
        {faqData.map((faq, index) => (
          <Accordion key={index} className="faq-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="faq-summary">
              <Typography className="faq-question">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className="faq-answer">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
};

export default FAQs;