import React, { useState, useEffect } from "react";
import "./Loader.css"; // Создадим стили отдельно
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();
  const messages = t("loader", { returnObjects: true });

  // const messages = [
  //   "Загрузка...",
  //   "Почти готово...",
  //   "Чай поставил?",
  //   "Терпение — добродетель!",
  // ];
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = messages.indexOf(prev);
        return messages[(currentIndex + 1) % messages.length];
      });
    }, 2000);

    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="spinner" />
      <p className="loader-text">
        {currentMessage}
        {".".repeat(dotCount)}
      </p>
    </div>
  );
};

export default Loader;
