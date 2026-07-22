import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import languagesStore from "../store/languagesStore";

const LanguageSelector = observer(() => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || i18n.language
  );
  const ref = useRef(null);

  useEffect(() => {
    languagesStore.fetchLanguages();
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage).catch((error) => {
        console.error("Error initializing language:", error);
      });
    }
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang) => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error changing language:", error);
      });
  };

  return (
    <div className="language-selector" ref={ref}>
      <button
        type="button"
        className="language-selector-toggle"
        onClick={() => setIsOpen((v) => !v)}
      >
        {language.toUpperCase()}
        <span className={`language-selector-caret${isOpen ? " open" : ""}`}>
          ▾
        </span>
      </button>
      {isOpen && (
        <ul className="language-selector-menu">
          {languagesStore.languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                className={`language-selector-option${
                  lang.code === language ? " active" : ""
                }`}
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.code.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default LanguageSelector;
