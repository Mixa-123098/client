import React from "react";
import "./FirstBlock.css";
import { Link } from "react-router-dom";
import ScrollToTop from "../../custom-hooks/ScrollToTop";

const FirstBlok = () => {
  return (
    // Подогнать форму, чвет, шрифт, отступы
    <div className="first-block">
      <div className="first-block-content-container">
        <h1>
          Кожен проект ми розробляємо <br /> як найважливіший
        </h1>
        <div className="row pt-4 pb-2">
          <div className="col">
            <p>
              Кожен проект, який ми розробляємо, є для нас найважливішим
              завданням. Ми підходимо до кожної роботи з великим запалом і
              відповідальністю, незалежно від його обсягу чи складності. Наш
              підхід базується на переконанні, що кожен проект має потенціал
              змінити життя наших клієнтів і сприяти їх успіху.
            </p>
          </div>
          <div className="col">
            <p className="">
              Наша мета - не лише задовольнити очікування клієнтів, а й
              перевершити їх, створюючи рішення, які допоможуть їм досягти нових
              вершин у своїй діяльності. Ми віримо, що тільки такий підхід
              дозволяє створити дійсно значущі та тривалі результати у сфері
              проектної діяльності.
            </p>
          </div>
        </div>
        <button className="first-block-button">
          <Link to="/projects" className="link-style" onClick={<ScrollToTop />}>
            Дізнатися більше
          </Link>
        </button>
      </div>
    </div>
  );
};

export default FirstBlok;
