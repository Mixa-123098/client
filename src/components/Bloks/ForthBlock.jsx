import React from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../custom-hooks/ScrollToTop";

const ForthBlock = () => {
  return (
    <>
      <div className="first-block bg-color">
        <div className="first-block-content-container">
          <h1 className="text-light">Вступити до команди</h1>
          <div className="row pt-4 pb-2">
            <div className="col">
              <p className="text-light">
                Вітаємо тебе у нашій команді! Ми шукаємо талановитих та
                енергійних індивідів, готових зробити важливий внесок у наш
                проєкт. У нас є різноманітні завдання та можливості для
                розвитку.
              </p>
            </div>
            <div className="col">
              <p className="text-light">
                Якщо ти цікавишся нашою місією і готовий працювати в дружньому
                колективі, не соромся приєднатися!
              </p>
            </div>
          </div>
          <button className="first-block-button-invert">
            <Link
              to="/contacts"
              className="link-style text-light"
              onClick={<ScrollToTop />}
            >
              Напишіть нам
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ForthBlock;
