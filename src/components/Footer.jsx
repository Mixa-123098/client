import React from "react";
import { useTranslation } from "react-i18next";

const Footer = ({ settings }) => {
  const { color, bgColor } = settings || {};
  const { t } = useTranslation();

  const contactInfo = {
    phone: "+123 456 7890",
    email: "example@gmail.com",
  };

  const socialMediaLinks = [
    {
      name: t("footer.social_media.viber"),
      url: "viber://chat?number=+1234567890",
    },
    {
      name: t("footer.social_media.instagram"),
      url: "https://www.instagram.com/oda_archetecture/?igshid=NzZlODBkYWE4Ng%3D%3D&utm_source=qr",
    },
    { name: t("footer.social_media.telegram"), url: "https://t.me/example" },
  ];

  const businessHours = [
    { day: t("footer.working_hours.Monday-Friday"), hours: "9:00 - 18:00" },
    { day: t("footer.working_hours.Saturday"), hours: "10:00 - 14:00" },
    {
      day: t("footer.working_hours.Sunday"),
      hours: t("footer.working_hours.closed"),
    },
  ];

  return (
    <div
      style={{
        boxShadow: `0 -1px 20px 1px rgba(0, 0, 0, 0.75)`,
        width: "100%",
      }}
    >
      <footer
        style={{
          backgroundColor: bgColor || "#5c5c5c",
          color: color || "white",
          padding: "30px 0",
        }}
      >
        <div className="container">
          <div className="row justify-content-between mb-4">
            <div className="col-md-4">
              <h4>{t("footer.contacts.title")}</h4>
              <p>
                <b>{t("footer.contacts.phone")}:</b> {contactInfo.phone}
              </p>
              <p>
                <b>{t("footer.contacts.email")}:</b> {contactInfo.email}
              </p>
            </div>
            <div className="col-md-4">
              <h4>{t("footer.social_media.title")}</h4>
              <ul className="list-unstyled">
                {socialMediaLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      style={{ color: color || "white" }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <h4>{t("footer.working_hours.title")}</h4>
              <ul className="list-unstyled">
                {businessHours.map((item, index) => (
                  <li key={index}>
                    <span>{item.day}:</span> <b>{item.hours}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="row justify-content-center mb-4">
            <div className="col-md-6">
              <h4>{t("footer.map")}</h4>
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d169324.38910505478!2d34.83554771814176!3d48.46240852856549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe303fd08468f%3A0xa1cf3d5f2c11aba!2sDnipro%2C%20Dnepropetrovsk%C3%A1%2C%20Ukrajina%2C%2049000!5e0!3m2!1ssk!2ssk!4v1732278478275!5m2!1ssk!2ssk"
                width="100%"
                height="200"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <p>
                &copy; {new Date().getFullYear()} {t("footer.copyright")}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
