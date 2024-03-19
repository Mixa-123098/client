import React from "react";
import "./AboutPage.css";
import Header from "../Header";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";
import CardTamplate from "../tamplates/CardTamplate";
const IdeologyTemplate = ({ header, text1, text2 }) => {
  return (
    <>
      <div className={`first-block`}style={{ minHeight: "75vh", position: "relative" }}>
        <div className="first-block-content-container">
          <h1 className="text-center">{header}</h1>
          <div className="row pt-4 pb-2">
            <div className="col">
              <p>{text1}</p>
            </div>
            <div className="col">
              <p className="">{text2}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Ideology = () => {
  return (
    <>
      <IdeologyTemplate
        header={"Ідеологія команди"}
        text1={`Ми готові надати вам інформацію про вартість наших послуг. Кожен
                проект для нас важливий, і ми готові розглянути ваші потреби та
                запитання.`}
        text2={`Звертайтеся до нас для отримання індивідуальної консультації та
                розрахунку вартості. Ми прагнемо забезпечити вас найкращими
                рішеннями для досягнення ваших цілей.`}
      />
    </>
  );
};
const OurStory = () => {
  return (
    <>
      <IdeologyTemplate
        header={"Наша історія"}
        text1={`
Протягом понад 20 років наш колектив професіоналів працює в галузі дизайну інтер'єрів, завдяки чому залучає клієнтів завдяки відзивам та рекомендаціям. Настало час іти в ногу з науково-технічним прогресом і створити власний інформаційний ресурс.А`}
        text2={`Працюючи окремо та час від часу реалізовуючи успішні спільні проекти, наша команда дизайнерів та архітекторів вирішила об'єднатись і створити спільноту. У сучасних умовах просто необхідно мати платформу для зберігання та перегляду дизайн-проектів`}
      />
    </>
  );
};

const OurTeam = () => {
  const imgesList = [
    {
      name: "Прохорова Марина",
      jobTitle: "Дизайнер інтер'єрів, архітектор",
      img: "imgonline-com-ua-Black-White-xpHvu05NSXR (2).jpg",
    },
    {
      name: "Таран Ольга",
      jobTitle: "Дизайнер інтер'єрів",
      img: "imgonline-com-ua-Black-White-07UyJGUcsTqO7 (1).jpg",
    },
    {
      name: "Ситник Катерина",
      jobTitle: "Архітектор",
      img: "photo_2024-02-01_09-52-39.jpg",
    },
    {
      name: "Старцев Леонід",
      jobTitle: "Дизайнер інтер'єрів, візуалізатор",
      img: "photo_2024-02-02_08-25-37.jpg",
    },
  ];
  return (
    <>
      <div className="row justify-content-center">
        {imgesList.map((person, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <CardTamplate
              img_src={`/img/main_imges_folder/${person.img}`}
              title={person.name}
              // height={"25vw"}
              subtitle={person.jobTitle}
              border={false}
            />
          </div>
        ))}
      </div>
    </>
  );
};

const Cinnosty = () => {
  const titlesList = [
    "ПРОФЕСІЙНІСТЬ",
    "ІННОВАЦІЇ",
    "РЕПУТАЦІЯ",
    "КОМАНДА",
    "БЕЗПЕКА",
    "ЯКІСТЬ",
  ];
  const contentsList = [
    `Ми експерти  своєї справи;Ми будуємо системну роботу;Ми будуємо ефективну комунікацію;Ми застосовуємо індивідуальний підхід до кожного клієнта;Ми безперервно професійно розвиваємося та навчаємося`,
    `Ми відкриті для нових ідей і технологій; Ми проактивні; Ми створюємо атмосферу, яка стимулює творчий пошук, народження креативніх ідей;
    Ми прагнемо запропонувати те, що не можуть запропонувати інші`,
    `Це прозорість, чесність і надійність;
    Це чітке виконання договірних зобовязань;
    Це позитивні відгуки клієнтів;
    Це дотримання законодавства`,
    `Нас всіх об'єднує єдина мета;
    Ми націлені на спільний кінцевий результат;
    Ми згуртовані і підтримуємо один одного в досягненні поставлених завдань`,
    `Це гарантія запобігання загроз та ризиків для працівників, партнерів і навколишнього середовища;
    Це комплексний підхід до питань безпеки;
    Це стовідсоткове резервне забезпечення всіх життедіяльних систем;
    Це високотехнологічна інженерія складського комплексу `,
    `Ми виконуємо роботу згідно існуючої системи якості;
    Ми контролюємо кожен етап процесу і його відповідність існуючим стандартам якості;
    Всі процеси відповідають міжнародним стандартам і регламентовані письмовими інструкціями;
    Впроваджена система аналізу ризиків`,
  ];

  return (
    <>
      <h1 className="text-center">Наші цінності</h1>

      <div className="row pt-4 pb-2  mb-5">
        {titlesList.map((element, index) => (
          <div className="col-lg-4 col-md-4 col-sm-6 mb-4 g-2" key={titlesList[index]}>
            <CardTamplate
              title={element}
              card_content={contentsList[index]}
              isList={true}
              // height={"40vh"}
            />
          </div>
        ))}
      </div>
    </>
  );
};

const AboutPage = () => {
  return (
    <>
      <Header fontColor={`#000000`} invert={`invert(0%)`} rep={true}/>
      <PagesHeader title="Про нас" />

      <div className="container mt-5">
        <OurStory />
        <OurTeam />
        <Ideology />
        <Cinnosty />
      </div>

      <Footer settings={{ color: `black`, bgColor: `white`, shadow: true }} />
    </>
  );
};

export default AboutPage;
