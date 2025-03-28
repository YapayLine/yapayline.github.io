import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/privacyPolicy.css';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const animateElements = document.querySelectorAll('.pp-animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pp-animate-active');
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(element => observer.observe(element));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pp-container">
      {/* Geri Dön Butonu */}
      <button 
        className="pp-back-button"
        onClick={() => navigate(-1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
        </svg>
      </button>

      {/* Header Section */}
      <header className="pp-header pp-animate">
        <div className="pp-header-content">
          <h1 className="pp-main-title">Gizlilik Politikası</h1>
          <div className="pp-header-line"></div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="pp-content">
        <div className="pp-intro pp-animate">
          <p className="pp-intro-text">
            Öğrenio, özel gereksinimli çocuklar ile ilkokul 1, 2 ve 3. sınıf öğrencilerinin bireysel gelişimini desteklemek amacıyla geliştirilmiş bir dijital eğitim uygulamasıdır. Bu gizlilik politikası, uygulamayı kullanan öğrenci, veli ve öğretmenlerin kişisel verilerinin nasıl toplandığını, kullanıldığını, korunduğunu ve paylaşıldığını açıklamaktadır.
          </p>
        </div>

        {sections.map((section, index) => (
          <section 
            key={index}
            className="pp-section pp-animate"
            data-delay={index}
          >
            <div className="pp-section-header">
              <div className="pp-section-number">{String(index + 1).padStart(2, '0')}</div>
              <h2 className="pp-section-title">{section.title}</h2>
            </div>
            <div className="pp-section-body">
              <p className="pp-section-text">{section.content}</p>
              {section.list && (
                <ul className="pp-list">
                  {section.list.map((item, i) => (
                    <li key={i} className="pp-list-item pp-animate" data-delay={i}>
                      <div className="pp-list-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      {item.split('\n').map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          {idx < item.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
              {section.additionalContent && (
                <p className="pp-additional-content">{section.additionalContent}</p>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

const sections = [
  {
    title: "📌 Topladığımız VERİLER",
    content: "Uygulamamız, kullanıcı deneyimini geliştirmek ve kişiselleştirmek amacıyla aşağıdaki türde verileri toplayabilir:",
    list: [
      "a. Kullanıcı Verileri\nÖğrenci adı (takma ad kullanımı teşvik edilir)\nSınıf seviyesi\nEbeveyn/öğretmen e-posta adresi (isteğe bağlı, doğrulama ve raporlamalar için)",
      "b. Kullanım Verileri\nDoğru/yanlış cevap kayıtları\nUygulama içi etkileşimler (tıklamalar, sürelere dayalı kullanım verileri)\nGelişim grafikleri ve performans istatistikleri",
      "c. Ses Verileri\nKonuşma tanıma ve telaffuz analizleri için öğrencinin uygulama içi ses kayıtları\nNot: Ses kayıtları sadece analiz amacıyla geçici olarak işlenir, cihaz üzerinde tutulur veya anonimleştirilerek işlenir.",
      "d. Cihaz ve Bağlantı Verileri\nCihaz tipi, işletim sistemi, dil tercihi\nİnternet bağlantı durumu (offline desteği için)"
    ]
  },
  {
    title: "🔐 VERİLERİN Kullanımı",
    content: "Toplanan veriler aşağıdaki amaçlarla kullanılır:",
    list: [
      "Öğrenci performansını analiz ederek kişiselleştirilmiş içerik sunmak",
      "Velilere ve öğretmenlere gelişim raporları sağlamak",
      "Eğitim sürecini iyileştirmek amacıyla anonim istatistikler üretmek",
      "Uygulamanın teknik işleyişini sağlamak ve geliştirmek"
    ]
  },
  {
    title: "🧠 Yapay Zeka ve OTOMATİK Karar Verme",
    content: "“Öğrencim”, kullanıcı etkileşimlerini analiz eden makine öğrenmesi algoritmaları kullanır. Bu algoritmalar:",
    list: [
      "Öğrencinin güçlü/zayıf yönlerini belirler",
      "İçerik zorluk seviyesini otomatik ayarlar",
      "Geri bildirimler ve öneriler oluşturur"
    ],
    additionalContent: "Otomatik karar verme sistemleri yalnızca eğitimsel amaçlıdır ve kullanıcıya zarar vermez. Gelişmiş kararlar her zaman öğretmen veya veli onayına bağlıdır."
  },
  {
    title: "🧒 ÇOCUK VERİLERİNİN Korunması",
    content: "Uygulama, 13 yaş altındaki çocuklara yöneliktir. Bu kapsamda:",
    list: [
      "Çocuklardan doğrudan tanımlayıcı kişisel bilgi toplanmaz",
      "Kişisel veriler, veli veya öğretmen onayı olmadan işlenmez",
      "COPPA ve GDPR-Kids ile tam uyumluluk gözetilir",
      "Veli, çocuk verilerinin silinmesini talep edebilir"
    ]
  },
  {
    title: "📤 VERİ Paylaşımı",
    content: "Veriler üçüncü taraflarla paylaşılmaz. Ancak aşağıdaki durumlarda paylaşım olabilir:",
    list: [
      "Yasal zorunluluklar",
      "Anonimleştirilmiş istatistiksel veriler",
      "Eğitim araştırmaları ve uygulama geliştirme çalışmaları"
    ]
  },
  {
    title: "📁 VERİLERİN Saklanması ve GÜVENLİĞİ",
    content: "Verilerimiz için uyguladığımız güvenlik önlemleri:",
    list: [
      "Firebase Firestore altyapısı ile şifrelenmiş depolama",
      "TLS/SSL protokolleri ile veri iletimi",
      "Kullanıcı kontrollü veri silme imkanı"
    ]
  },
  {
    title: "🕒 Ekran Süresi ve DİJİTAL Sağlık",
    content: "Uygulamamızda dijital sağlık önceliklerimiz:",
    list: [
      "Otomatik ekran süresi sınırlamaları",
      "Nazik mola hatırlatıcıları",
      "Veli kontrollü zaman yönetimi"
    ]
  },
  {
    title: "✉️ Haklarınız",
    content: "Kullanıcılarımızın sahip olduğu haklar:",
    list: [
      "Verilere erişim hakkı",
      "Düzeltme ve silme hakkı",
      "İşleme iznini geri çekme hakkı"
    ],
    additionalContent: "Talepler için: [ yapayline@gmail.com ] adresinden bizimle iletişime geçebilirsiniz."
  },
  {
    title: "🔄 POLİTİKA GÜNCELLEMELERİ",
    content: "Gizlilik politikamız zaman zaman güncellenebilir. Değişiklikler uygulama içinden veya e-posta yoluyla bildirilecektir."
  }
];

export default PrivacyPolicy;