import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeaderDashboard.css';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scroll down
        setIsVisible(false);
      } else {
        // Scroll up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <header className={`header ${isVisible ? '' : 'hidden-header'}`}>
      <div className="logo"></div>
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
