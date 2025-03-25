import React, { useEffect, useRef } from "react";
import "../style/services.css"; // CSS dosyanızın yolu

export const Services = (props) => {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [props.data]);

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>HİZMETLERİMİZ</h2>
          <p>
            Her sektöre uyum sağlayan modern ve etkili çözümler sunarak başarıyı
            birlikte inşa ediyoruz.
          </p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div 
                  key={`${d.name}-${i}`} 
                  className={`col-md-4 service-item ${i % 2 === 0 ? 'left' : 'right'}`}
                  ref={(el) => (itemsRef.current[i] = el)}
                >
                  <i className={d.icon}></i>
                  <div className="service-desc">
                    <h3>{d.name}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};