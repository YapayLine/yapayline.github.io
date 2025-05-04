import { Image } from "./image";
import React from "react";
import "../style/gallery.css"

export const Gallery = (props) => {
  const calculatePlaceholders = (data) => {
    if (!data) return 0;
    const columns = 3;
    return (columns - (data.length % columns)) % columns;
  };

  return (
    <section id="yapayline-gallery" className="yapayline-gallery-section">
      <div className="yapayline-container">
        <div className="yapayline-section-header">
          <h2 className="yapayline-section-title">
            <span className="yapayline-gradient-text">Başarı & PROJELERİMİZ</span>
          </h2>
          <p className="yapayline-section-subtitle">
            Galeriye göz atarak ekibimizin başarıyla tamamladığı projelere göz atabilirsiniz.
          </p>
          <div className="yapayline-title-underline"></div>
        </div>

        <div className="yapayline-gallery-grid">
          {props.data ? (
            <>
              {props.data.map((d, i) => (
                <div
                  key={`${d.title}-${i}`}
                  className="yapayline-gallery-item"
                >
                  <Image
                    title={d.title}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                  />
                </div>
              ))}
              {Array(calculatePlaceholders(props.data))
                .fill()
                .map((_, i) => (
                  <div
                    key={`placeholder-${i}`}
                    className="yapayline-gallery-item"
                  >
                    <div className="yapayline-placeholder-card">
                      <img 
                        src="/img/portfolio/placeholder.jpg" 
                        alt="Coming soon"
                        className="yapayline-placeholder-image"
                      />
                      <div className="yapayline-placeholder-overlay">
                        <span>Yeni Proje</span>
                        <p>Çok Yakında...</p>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="yapayline-loading">Yükleniyor...</div>
          )}
        </div>
      </div>
    </section>
  );
};