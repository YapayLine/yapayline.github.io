import React, { useEffect, useRef } from "react";
import "../style/about.css";

export const About = (props) => {
  const elements = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    elements.current.forEach(el => el && observer.observe(el));
    
    return () => observer.disconnect();
  }, [props.data]);

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img 
              ref={el => elements.current[0] = el}
              src="img/about.jpg" 
              className="img-responsive about-image" 
              alt="Hakkımızda"
            />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2 ref={el => elements.current[1] = el}>Hakkımızda</h2>
              <p ref={el => elements.current[2] = el}>
                {props.data?.paragraph || "Yükleniyor..."}
              </p>
              <h3 ref={el => elements.current[3] = el}>Neden Biz?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data?.Why?.map((d, i) => (
                      <li 
                        key={`why-${i}`}
                        ref={el => elements.current[4 + i] = el}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data?.Why2?.map((d, i) => (
                      <li 
                        key={`why2-${i}`}
                        ref={el => elements.current[4 + (props.data.Why?.length || 0) + i] = el}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};