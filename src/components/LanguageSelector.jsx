import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || i18n.language
  );

  const changeLanguage = (lang) => {
    i18n
      .changeLanguage(lang)
      .then(() => {
        setLanguage(lang);
        localStorage.setItem("language", lang); // Сохраняем выбор в localStorage
      })
      .catch((error) => {
        console.error("Error changing language:", error);
      });
  };

  useEffect(() => {
    // Устанавливаем язык при загрузке компонента
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage).catch((error) => {
        console.error("Error initializing language:", error);
      });
    }
  }, [i18n]);

  return (
    <div>
      <select
        id="language-select"
        className="change_lang bg-ligth text-dark p-1 m-2 mt-0 rounded"
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">en</option>
        <option value="ua">ua</option>
        {/* <option value="ru">Русский</option> */}
        {/* Добавьте дополнительные языки по мере необходимости */}
      </select>
    </div>
  );
};

export default LanguageSelector;
