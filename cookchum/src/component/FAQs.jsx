import React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FAQs.css';

const FAQs = () => {
  const faqData = [
    { question: "How does the ingredient-based recipe search work?", answer: "Input your ingredients, and we'll suggest recipes you can make." },
    { question: "Can I get recipes for specific dietary restrictions?", answer: "Yes! We provide tailored recipe suggestions based on your preferences." },
    { question: "How accurate are the cost estimates for recipes?", answer: "We estimate costs based on market trends to help you budget better." },
    { question: "Can I save my favorite recipes?", answer: "Absolutely! Bookmark recipes to access them anytime." },
  ];

  return (
    <Container maxWidth="lg" className="faq-container">
      <Typography variant="h3" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <div className="faq-content">
        {faqData.map((faq, index) => (
          <Accordion key={index} className="faq-accordion">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
};

export default FAQs;