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
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>BAŞARI & PROJELERİMİZ</h2>
          <p>
          Galeriye göz atarak ekibimizin başarıyla tamamladığı projelere göz atabilirsiniz.
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {props.data ? (
              <>
                {props.data.map((d, i) => (
                  <div
                    key={`${d.title}-${i}`}
                    className="col-sm-6 col-md-4 col-lg-4"
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
                      className="col-sm-6 col-md-4 col-lg-4"
                    >
                      <div className="placeholder-card">
                        <img 
                          src="/img/portfolio/placeholder.jpg" 
                          alt="Coming soon"
                          className="placeholder-image"
                        />
                        <div className="placeholder-overlay">
                          Çok Yakında...
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};