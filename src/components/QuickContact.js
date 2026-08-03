import React from "react";
import { FaPhoneAlt, FaViber, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import "./QuickContact.css";

// One-tap contact rail, fixed on the right edge (vertically centred so it
// clears both the bottom-right "scroll to top" button and the hero's bottom
// bar). Numbers are the studio's real line: +380 67 639 70 18.
const channels = [
  { href: "tel:+380676397018", Icon: FaPhoneAlt, label: "Подзвонити", cls: "qc-call" },
  {
    href: "viber://chat?number=%2B380676397018",
    Icon: FaViber,
    label: "Viber",
    cls: "qc-viber",
  },
  {
    href: "https://wa.me/380676397018",
    Icon: FaWhatsapp,
    label: "WhatsApp",
    cls: "qc-whatsapp",
    newTab: true,
  },
  {
    href: "https://t.me/+380676397018",
    Icon: FaTelegramPlane,
    label: "Telegram",
    cls: "qc-telegram",
    newTab: true,
  },
];

const QuickContact = () => {
  return (
    <div className="quick-contact" aria-label="Швидкий контакт">
      {channels.map(({ href, Icon, label, cls, newTab }) => (
        <a
          key={label}
          href={href}
          className={`qc-btn ${cls}`}
          aria-label={label}
          title={label}
          {...(newTab
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default QuickContact;
