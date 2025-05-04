import React, { useState, useEffect } from "react";
import "../style/navigation.css"; // Özel CSS dosyamız

export const Navigation = (props) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav 
      id="yapayline-navbar" 
      className={`navbar navbar-fixed-top ${scrolled ? "navbar-scrolled" : ""} ${mobileMenuOpen ? "mobile-open" : ""}`}
    >
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Gezintiyi Aç</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            <span className="logo-gradient">Yapay</span>Line
          </a>
        </div>

        <div 
          className={`navbar-collapse ${mobileMenuOpen ? "in" : "collapse"}`}
          id="yapayline-navbar-collapse"
        >
          <ul className="nav navbar-nav navbar-right">
            {[
              { text: "ÖZELLİKLER", href: "#yapayline-features" },
              { text: "HAKKIMIZDA", href: "#yapayline-about" },
              { text: "HİZMETLER", href: "#yapayline-services" },
              { text: "GALERİ", href: "#yapayline-gallery" },
              { text: "EKİBİMİZ", href: "#yapayline-team" },
              { text: "İLETİŞİM", href: "#yapayline-contact" },
            ].map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  className="page-scroll nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.text}
                  <span className="nav-hover-indicator"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};