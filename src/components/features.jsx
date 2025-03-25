import React, { useEffect, useRef } from "react";
import "../style/feature.css"
export const Features = (props) => {
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
  }, [props.data]); // props.data değiştiğinde yeniden oluştur

  return (
    <div id="features" className="text-center" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title" style={{ marginTop: '50px' }}>
          <h2>ÖZELLİKLER</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
                <div 
                  key={`${d.title}-${i}`} 
                  className={`col-xs-6 col-md-3 feature-item ${i % 2 === 0 ? 'left' : 'right'}`}
                  ref={(el) => (itemsRef.current[i] = el)}
                >
                  <i className={d.icon}></i>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};