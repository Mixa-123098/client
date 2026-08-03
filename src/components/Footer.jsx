import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Footer = ({ settings }) => {
  const { color, bgColor } = settings || {};
  const resolvedColor = color || "white";
  const resolvedBgColor = bgColor || "#5c5c5c";
  const { t, i18n } = useTranslation();

  const mapLanguages = { ua: "uk", en: "en", sk: "sk" };
  const mapLang = mapLanguages[i18n.language] || "en";

  const cities = [
    { key: "kyiv", label: t("footer.cities.kyiv"), query: "Kyiv, Ukraine" },
    {
      key: "dnipro",
      label: t("footer.cities.dnipro"),
      query: "Dnipro, Ukraine",
    },
  ];
  const [activeCity, setActiveCity] = useState(cities[0].key);
  const selectedCity =
    cities.find((city) => city.key === activeCity) || cities[0];

  const contactInfo = {
    phone: "+380 67 639 70 18",
    email: "marynaprokhorova@gmail.com",
  };

  const socialMediaLinks = [
    {
      name: t("footer.social_media.viber"),
      url: "viber://chat?number=%2B380676397018",
    },
    {
      name: t("footer.social_media.instagram"),
      url: "https://www.instagram.com/oda_archetecture/?igshid=NzZlODBkYWE4Ng%3D%3D&utm_source=qr",
    },
    {
      name: t("footer.social_media.telegram"),
      url: "https://t.me/marynaprokhorova_design",
    },
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
                      className="text-decoration-none footer-social-link"
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
              <div className="mb-2" role="tablist">
                {cities.map((city) => {
                  const isActive = city.key === activeCity;
                  return (
                    <button
                      key={city.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCity(city.key)}
                      style={{
                        marginRight: "8px",
                        padding: "4px 14px",
                        borderRadius: "999px",
                        border: `1px solid ${resolvedColor}`,
                        backgroundColor: isActive
                          ? resolvedColor
                          : "transparent",
                        color: isActive ? resolvedBgColor : resolvedColor,
                        cursor: "pointer",
                        transition: "background-color 0.15s ease",
                      }}
                    >
                      {city.label}
                    </button>
                  );
                })}
              </div>
              <iframe
                key={selectedCity.key}
                title={`Location Map - ${selectedCity.label}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  selectedCity.query
                )}&output=embed&hl=${mapLang}`}
                width="100%"
                height="200"
                style={{ border: "0", borderRadius: "6px" }}
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
