import React, { useEffect, useRef } from "react";
import "../style/team.css";

export const Team = ({ data }) => {
  const teamRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    teamRefs.current.forEach(el => el && observer.observe(el));
    
    return () => {
      teamRefs.current.forEach(el => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, [data]);

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Takımımız</h2>
          <p>
            Başarıya giden yolda, uzman ekibimizle güçlü bir işbirliği sunuyoruz.
          </p>
        </div>
        <div className="row">
          {data?.map((member, i) => (
            <div 
              key={`${member.name}-${i}`} 
              className="col-md-3 col-sm-6 team"
              ref={el => teamRefs.current[i] = el}
            >
              <div className="thumbnail">
                <img 
                  src={process.env.PUBLIC_URL + member.img} 
                  alt={member.name} 
                  className="team-img"
                  onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/img/placeholder.jpg';
                  }}
                />
                <div className="social-links">
                  <a href={member.linkedin} target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={member.instagram} target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href={member.github} target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                </div>
                <div className="caption">
                  <h4>{member.name}</h4>
                  <p>{member.job}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};