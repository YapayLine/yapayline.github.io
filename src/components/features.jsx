import React, { useEffect, useRef } from "react";
import "../style/feature.css";

export const Features = (props) => {
  const featureItems = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('yapayline-feature-animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    featureItems.current.forEach((item) => item && observer.observe(item));
    return () => featureItems.current.forEach((item) => item && observer.unobserve(item));
  }, [props.data]);

  return (
    <section id="yapayline-features" className="yapayline-features-section" ref={sectionRef}>
      <div className="yapayline-features-container">
        <div className="yapayline-features-header">
          <h2 className="yapayline-features-main-title">
            <span className="yapayline-gradient-text">Öne Çıkan Özellikler</span>
          </h2>
          <div className="yapayline-title-underline"></div>
        </div>

        <div className="yapayline-features-grid-1x4">
          {props.data ? (
            props.data.slice(0, 4).map((feature, index) => (
              <div
                key={`feature-${index}`}
                ref={(el) => (featureItems.current[index] = el)}
                className="yapayline-feature-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="yapayline-feature-icon-wrapper">
                  <div className="yapayline-icon-backdrop"></div>
                  <i className={`${feature.icon} yapayline-feature-icon`}></i>
                </div>
                <h3 className="yapayline-feature-title">{feature.title}</h3>
                <p className="yapayline-feature-description">{feature.text}</p>
                <div className="yapayline-feature-hover-light"></div>
              </div>
            ))
          ) : (
            <div className="yapayline-features-loading">Yükleniyor...</div>
          )}
        </div>
      </div>
    </section>
  );
};