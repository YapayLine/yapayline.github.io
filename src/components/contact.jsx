import { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import "../style/contact.css";

const NotificationPopup = ({ status, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${status}`}>
      <div className="notification-content">
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      addNotification("error", "Lütfen tüm alanları doldurun!");
      return;
    }

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          clearState();
          addNotification("success", "Mesajınız başarıyla gönderildi!");
        },
        (error) => {
          addNotification("error", "Gönderim hatası! Lütfen tekrar deneyin.");
        }
      );
  };

  return (
    <div>
      <div className="notification-container">
        {notifications.map((notification) => (
          <NotificationPopup
            key={notification.id}
            status={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>İLETİŞİME GEÇİN</h2>
                <p>
                  Bize ulaşmak için aşağıdaki formu doldurun, en kısa sürede
                  geri dönüş yapacağız.
                </p>
              </div>
              <form
                ref={formRef}
                name="sentMessage"
                onSubmit={handleSubmit}
                className="contact-animate"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="İsim"
                        required
                        value={name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    className="form-control message-textarea"
                    rows="4"
                    placeholder="Mesajınız"
                    required
                    value={message}
                    onChange={handleChange}
                    style={{ resize: "vertical" }}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Gönder
                </button>
              </form>
            </div>
          </div>

          <div
            ref={infoRef}
            className="col-md-3 col-md-offset-1 contact-info contact-animate"
          >
            <div className="contact-item">
              <h3>İletişim Bilgileri</h3>
              <p>
                <span>
                  <i className="fas fa-map-marker-alt"></i> Adres
                </span>
                {props.data?.address || "Yükleniyor..."}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="far fa-envelope"></i> Email
                </span>
                {props.data?.email || "Yükleniyor..."}
              </p>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  {props.data &&
                    [
                      { platform: "linkedin", icon: "linkedin" },
                      { platform: "github", icon: "github" },
                      { platform: "instagram", icon: "instagram" },
                    ].map((social) => (
                      <li key={social.platform}>
                        <a
                          href={props.data[social.platform] || "#"}
                          className={`${social.platform}-btn`}
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
          </div>
        </div>
      </div>

      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2025 YapayLine Tüm Hakları Saklıdır | <a href="/privacy-policy">Gizlilik Politikası</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
