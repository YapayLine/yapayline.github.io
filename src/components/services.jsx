import React, { useEffect, useRef } from "react";
import "../style/services.css";

export const Services = (props) => {
  const servicesRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('yapayline-service-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    servicesRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      servicesRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [props.data]);

  return (
    <section id="yapayline-services" className="yapayline-services-section" ref={sectionRef}>
      <div className="yapayline-container">
        <div className="yapayline-section-header">
          <h2 className="yapayline-section-title">
            <span className="yapayline-gradient-text-service">HİZMETLERİMİZ</span>
          </h2>
          <p className="yapayline-section-subtitle">
            Her sektöre uyum sağlayan modern ve etkili çözümler sunarak başarıyı
            birlikte inşa ediyoruz.
          </p>
          <div className="yapayline-title-underline"></div>
        </div>

        <div className="yapayline-services-grid">
          {props.data ? (
            props.data.map((service, index) => (
              <div
                key={`service-${index}`}
                ref={(el) => (servicesRef.current[index] = el)}
                className={`yapayline-service-card yapayline-service-${index % 2 === 0 ? 'left' : 'right'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="yapayline-service-icon-container">
                  <div className="yapayline-icon-backdrop"></div>
                  <i className={`${service.icon} yapayline-service-icon`}></i>
                </div>
                <div className="yapayline-service-content">
                  <h3 className="yapayline-service-title">{service.name}</h3>
                  <p className="yapayline-service-description">{service.text}</p>
                </div>
                <div className="yapayline-service-hover-effect"></div>
              </div>
            ))
          ) : (
            <div className="yapayline-loading">Yükleniyor...</div>
          )}
        </div>
      </div>
    </section>
  );
};