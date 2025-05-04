import React, { useState } from "react";

export const Image = ({ title, largeImage, smallImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`yapayline-portfolio-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={smallImage} 
        className="yapayline-portfolio-image" 
        alt={title}
        loading="lazy"
      />
      <div className="yapayline-portfolio-overlay">
        <div className="yapayline-overlay-content">
          <h3 className="yapayline-portfolio-title">{title}</h3>
          <div className="yapayline-view-button">Detayları Gör</div>
        </div>
      </div>
      <div className="yapayline-portfolio-shine"></div>
    </div>
  );
};