import React from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../../custom-hooks/ScrollToTop";

const SixBlock = () => {
  return (
    <div className="first-block">
      <div className="first-block-content-container">
        <h1>Наша команда - ваш успіх</h1>
        <div className="row pt-4 pb-2">
          <div className="col">
            <p>
              Ми - команда експертів, яка розуміє, що кожен проект - це велике
              завдання. Наш підхід полягає в тому, щоб розробляти кожен проект
              як найважливіше завдання, незалежно від його обсягу чи складності.
              Ми вкладаємо в роботу наш запал і відповідальність, оскільки
              віримо, що кожен проект може змінити життя наших клієнтів і
              сприяти їх успіху.
            </p>
          </div>
          <div className="col">
            <p className="">
              Наша мета - не просто задовольнити очікування клієнтів, а й
              перевершити їх. Ми створюємо рішення, що допомагають клієнтам
              досягти нових вершин у їх діяльності. Віримо, що тільки такий
              підхід дозволяє створити дійсно значущі та тривалі результати у
              сфері проектної діяльності.
            </p>
          </div>
        </div>
        <button className="first-block-button">
          <Link to="/about" className="link-style" onClick={<ScrollToTop />}>
            Дізнатися більше про нас
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SixBlock;
