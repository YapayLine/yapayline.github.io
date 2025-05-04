import React, { useEffect, useRef } from "react";
import "../style/team.css";

export const Team = ({ data }) => {
  const teamRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("yapayline-team-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    teamRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      teamRefs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [data]);

  return (
    <section
      id="yapayline-team"
      className="yapayline-team-section"
      ref={sectionRef}
    >
      <div className="yapayline-container">
        <div className="yapayline-section-header">
          <h2 className="yapayline-section-title">
            <span className="yapayline-gradient-text">Takımımız</span>
          </h2>
          <p className="yapayline-section-subtitle">
            Başarıya giden yolda, uzman ekibimizle güçlü bir işbirliği
            sunuyoruz.
          </p>
          <div className="yapayline-title-underline"></div>
        </div>

        <div className="yapayline-team-grid">
          {data?.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              className="yapayline-team-member"
              ref={(el) => (teamRefs.current[i] = el)}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="yapayline-member-card">
                <div className="yapayline-member-image-container">
                  <img
                    src={process.env.PUBLIC_URL + member.img}
                    alt={member.name}
                    className="yapayline-member-image"
                    onError={(e) => {
                      e.target.src =
                        process.env.PUBLIC_URL + "/img/placeholder.jpg";
                    }}
                    loading="lazy"
                  />
                  <div className="yapayline-image-overlay"></div>
                  <div className="yapayline-social-links">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="yapayline-social-link linkedin"
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="yapayline-social-link instagram"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="yapayline-social-link github"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="yapayline-member-info">
                  <h3 className="yapayline-member-name">{member.name}</h3>
                  <p className="yapayline-member-position">{member.job}</p>
                  <div className="yapayline-member-divider"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
