import React from "react";

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Gezintiyi Aç</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            YapayLine 
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                ÖZELLİKLER
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                HAKKIMIZDA
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                HİZMETLER
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                GALERİ
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                EKİBİMİZ
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                İLETİŞİM
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
