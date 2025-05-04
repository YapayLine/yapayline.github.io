import React, { useEffect } from "react";
import "../style/header.css";

export const Header = (props) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const header = document.getElementById('header');
      if (header) {
        header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="header" className="yapayline-hero">
      <div className="hero-overlay">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 intro-text">
              <h1 className="hero-title">
                {props.data ? props.data.title : "Loading"}
                <span className="title-gradient"></span>
              </h1>
              <p className="hero-subtitle">
                {props.data ? props.data.paragraph : "Loading"}
                <span className="subtitle-underline"></span>
              </p>
              <a
                href="#features"
                className="btn btn-hero btn-gradient-hover page-scroll"
              >
                <span>Daha Fazla</span>
                <svg width="13px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </a>
              <div className="scroll-indicator">
                <div className="mouse">
                  <div className="wheel"></div>
                </div>
                <div className="arrows">
                  <div className="arrow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};