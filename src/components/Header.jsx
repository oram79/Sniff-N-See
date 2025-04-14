import React from 'react';
import { FaPaw, FaGithub } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <FaPaw className="logo-icon" />
          <div className="logo-text">
            <h1>Sniff & See</h1>
            <p className="tagline">A Place To Find A New Friend</p>
          </div>
        </div>
        
        <nav className="header-nav">
          <ul>
            <li>
              <a href="https://dog.ceo/dog-api/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="nav-link">
                API
              </a>
            </li>
            <li>
              <a href="https://github.com/oram79/Dog-Finder-App" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="nav-link github-link">
                <FaGithub />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="header-decoration">
        <div className="paw paw-1"><FaPaw /></div>
        <div className="paw paw-2"><FaPaw /></div>
        <div className="paw paw-3"><FaPaw /></div>
        <div className="paw paw-4"><FaPaw /></div>
        <div className="paw paw-5"><FaPaw /></div>
      </div>
    </header>
  );
};

export default Header;