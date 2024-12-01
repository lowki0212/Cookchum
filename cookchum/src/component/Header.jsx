import React from 'react';
import { useNavigate } from 'react-router-dom'; // Change this line
import './HeaderDashboard.css';

function Header() {
  const navigate = useNavigate(); // Change this line

  const handleButtonClick = (path) => {
    navigate(path); // Use navigate for routing
  };

  return (
    <header className="header">
      <div className="logo">
      </div>
      <nav className="header-buttons animated-slide-in-right">
        <button onClick={() => handleButtonClick('/')} aria-label="Dashboard">Dashboard</button>
        <button onClick={() => handleButtonClick('/AboutUs')} aria-label="About Us">About Us</button>
        <button onClick={() => handleButtonClick('/FAQs')} aria-label="Frequently Asked Questions">FAQ's</button>
        <button onClick={() => handleButtonClick('/ContactUs')} aria-label="Contact Us">Contact Us</button>
      </nav>
    </header>
  );
}

export default Header;