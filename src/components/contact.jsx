import { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import "../style/contact.css";
import { Link } from "react-router-dom";

const NotificationPopup = ({ status, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`yapayline-notification ${status}`}>
      <div className="yapayline-notification-content">
        <span>{message}</span>
        <button className="yapayline-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);
  const [notifications, setNotifications] = useState([]);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("yapayline-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);
    if (socialRef.current) observer.observe(socialRef.current);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      addNotification("error", "Lütfen tüm alanları doldurun!");
      return;
    }

    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_USER_ID
      );

      clearState();
      addNotification("success", "Mesajınız başarıyla gönderildi!");
    } catch (error) {
      console.error("[Contact] EmailJS.sendForm Error:", error);
      addNotification("error", "Gönderim hatası! Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="yapayline-contact-page">
      <div className="yapayline-notification-container">
        {notifications.map((notification) => (
          <NotificationPopup
            key={notification.id}
            status={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      <section id="yapayline-contact" className="yapayline-contact-section">
        <div className="yapayline-container-contact">
          <div className="yapayline-contact-grid">
            <div className="yapayline-contact-form-wrapper" ref={formRef}>
              <div className="yapayline-section-header-contact">
                <h2 className="yapayline-section-title-contact">
                  <span className="yapayline-gradient-text-contact">İLETİŞİME GEÇİN</span>
                </h2>
                <p className="yapayline-section-subtitle-contact">
                  Bize ulaşmak için aşağıdaki formu doldurun, en kısa sürede
                  geri dönüş yapacağız.
                </p>
                <div className="yapayline-title-underline-contact"></div>
              </div>
              
              <form onSubmit={handleSubmit} className="yapayline-contact-form">
                <div className="yapayline-form-row-contact">
                  <div className="yapayline-form-group-contact">
                    <input
                      type="text"
                      name="name"
                      placeholder="İsim"
                      required
                      value={name}
                      onChange={handleChange}
                      className="yapayline-form-input-contact"
                    />
                    <span className="yapayline-input-border-contact"></span>
                  </div>
                  <div className="yapayline-form-group-contact">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={handleChange}
                      className="yapayline-form-input-contact"
                    />
                    <span className="yapayline-input-border-contact"></span>
                  </div>
                </div>
                <div className="yapayline-form-group-contact">
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Mesajınız"
                    required
                    value={message}
                    onChange={handleChange}
                    className="yapayline-form-textarea"
                  ></textarea>
                  <span className="yapayline-input-border-contact"></span>
                </div>
                <button type="submit" className="yapayline-submit-btn-contact">
                  <span>Gönder</span>
                  <svg width="13px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </form>
            </div>

            <div className="yapayline-contact-info" ref={infoRef}>
              <div className="yapayline-info-card-contact">
                <h3 className="yapayline-info-title-contact">İletişim Bilgileri</h3>
                <div className="yapayline-info-item-contact">
                  <i className="fas fa-map-marker-alt yapayline-info-icon-contact"></i>
                  <p>{props.data?.address || "Yükleniyor..."}</p>
                </div>
                <div className="yapayline-info-item-contact">
                  <i className="far fa-envelope yapayline-info-icon-contact"></i>
                  <p>{props.data?.email || "Yükleniyor..."}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="yapayline-social-links-contact" ref={socialRef}>
            <ul className="yapayline-social-list-contact">
              {props.data &&
                [
                  { platform: "linkedin", icon: "linkedin" },
                  { platform: "github", icon: "github" },
                  { platform: "instagram", icon: "instagram" },
                ].map((social) => (
                  <li key={social.platform} className="yapayline-social-item-contact">
                    <a
                      href={props.data[social.platform] || "#"}
                      className={`yapayline-social-link yapayline-${social.platform}-btn-contact`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fab fa-${social.icon}`}></i>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="yapayline-footer">
        <div className="yapayline-container-contact">
          <p className="yapayline-footer-text">
            &copy; 2025 YapayLine Tüm Hakları Saklıdır |{" "}
            <Link to="/privacy-policy" className="yapayline-footer-link">
              Gizlilik Politikası
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;