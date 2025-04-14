import React from 'react';
import { FaPaw, FaHeart } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <h3>Consider adopting from your local animal shelter! <FaPaw /></h3>
      <div className="footer-links">
        <a 
          href="https://www.aspca.org/adopt-pet" 
          target="_blank" 
          rel="noopener noreferrer"
          className="adoption-link"
        >
          Find Pets in Need <FaHeart className="heart-icon" />
        </a>
      </div>
      <div className="footer-info">
        <p>Sniff-N-See uses the <a href="https://dog.ceo/dog-api/" target="_blank" rel="noopener noreferrer">Dog CEO API</a></p>
        <p className="copyright">© {new Date().getFullYear()} Sniff-N-See</p>
      </div>
    </div>
  );
};

export default Footer;