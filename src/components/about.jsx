import React, { useEffect, useRef } from "react";
import "../style/about.css";

export const About = (props) => {
  const sectionRef = useRef(null);
  const elements = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('yapayline-about-visible');
            if (entry.target.classList.contains('yapayline-about-image-wrapper')) {
              entry.target.querySelector('.yapayline-about-image').style.opacity = "1";
            }
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    elements.current.forEach(el => el && observer.observe(el));
    
    return () => {
      elements.current.forEach(el => el && observer.unobserve(el));
    };
  }, [props.data]);

  return (
    <section id="yapayline-about" className="yapayline-about-section" ref={sectionRef}>
      <div className="yapayline-container">
        <div className="yapayline-about-grid">
          <div className="yapayline-about-image-wrapper" ref={el => elements.current[0] = el}>
            <img 
              src="/img/about.jpg" 
              className="yapayline-about-image" 
              alt="YapayLine Hakkında"
              loading="lazy"
            />
            <div className="yapayline-image-overlay"></div>
            <div className="yapayline-image-shine"></div>
          </div>
          
          <div className="yapayline-about-content">
            <div className="yapayline-section-header-about">
              <h2 ref={el => elements.current[1] = el} className="yapayline-about-title">
                <span className="yapayline-gradient-text-about">Hakkımızda</span>
              </h2>
              <div className="yapayline-title-underline-about"></div>
            </div>
            
            <p ref={el => elements.current[2] = el} className="yapayline-about-description">
              {props.data?.paragraph || "Yükleniyor..."}
            </p>
            
            <h3 ref={el => elements.current[3] = el} className="yapayline-about-subtitle">
              Neden <span className="yapayline-text-highlight">YapayLine?</span>
            </h3>
            
            <div className="yapayline-about-features">
              <div className="yapayline-features-column">
                <ul className="yapayline-features-list">
                  {props.data?.Why?.map((d, i) => (
                    <li 
                      key={`why-${i}`}
                      ref={el => elements.current[4 + i] = el}
                      className="yapayline-feature-item"
                      style={{ transitionDelay: `${0.5 + i * 0.1}s` }}
                    >
                      <span className="yapayline-feature-marker"></span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="yapayline-features-column">
                <ul className="yapayline-features-list">
                  {props.data?.Why2?.map((d, i) => (
                    <li 
                      key={`why2-${i}`}
                      ref={el => elements.current[4 + (props.data.Why?.length || 0) + i] = el}
                      className="yapayline-feature-item"
                      style={{ transitionDelay: `${0.6 + i * 0.1}s` }}
                    >
                      <span className="yapayline-feature-marker"></span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};