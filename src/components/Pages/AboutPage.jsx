import React from "react";
import "./AboutPage.css";
import Header from "../Header";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";
import CardTamplate from "../tamplates/CardTamplate";
import { useTranslation } from "react-i18next";

const IdeologyTemplate = ({ header, text1, text2 }) => {
  return (
    <>
      <div
        className={`first-block pt-4`}
        style={{ minHeight: "50vh", position: "relative", margin: "7.5vw 0 " }}
      >
        <div className="first-block-content-container align-items-center">
          <h1 className="text-center">{header}</h1>
          <div className="row mt-4 pt-4 pb-2 justify-content-center">
            <div className="col-md-4 col">
              <p>{text1}</p>
            </div>
            <div className="col-md-4 col">
              <p className="">{text2}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Ideology = () => {
  const { t } = useTranslation();

  return (
    <>
      <IdeologyTemplate
        header={t("aboutPage.block3.title")}
        text1={t("aboutPage.block3.mainTextPartOne")}
        text2={t("aboutPage.block3.mainTextPartTwo")}
      />
    </>
  );
};

const OurStory = () => {
  const { t } = useTranslation();

  return (
    <>
      <IdeologyTemplate
        header={t("aboutPage.block1.title")}
        text1={t("aboutPage.block1.mainTextPartOne")}
        text2={t("aboutPage.block1.mainTextPartTwo")}
      />
    </>
  );
};

const OurTeam = () => {
  const { t } = useTranslation();

  const imgesList = [
    {
      name: t("aboutPage.block2.Marina.name"),
      jobTitle: t("aboutPage.block2.Marina.jobTitle"),
      img: "imgonline-com-ua-Black-White-xpHvu05NSXR (2).jpg",
    },
    {
      name: t("aboutPage.block2.Olha.name"),
      jobTitle: t("aboutPage.block2.Olha.jobTitle"),
      img: "imgonline-com-ua-Black-White-07UyJGUcsTqO7 (1).jpg",
    },
    {
      name: t("aboutPage.block2.Kateryna.name"),
      jobTitle: t("aboutPage.block2.Kateryna.jobTitle"),
      img: "photo_2024-02-01_09-52-39.jpg",
    },
    {
      name: t("aboutPage.block2.Leonid.name"),
      jobTitle: t("aboutPage.block2.Leonid.jobTitle"),
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
  const { t } = useTranslation();

  const valuesList = t("aboutPage.block4.valuesList", { returnObjects: true }); //возвращаем обьект так как там должны получить массив, а не строку

  return (
    <section className="values-section">
      <h1 className="text-center values-title">
        {t("aboutPage.block4.ourValues")}
      </h1>

      <div className="row g-4 justify-content-center pt-4 pb-2">
        {valuesList &&
          valuesList.map((item, index) => (
            <div
              className="col-lg-4 col-md-6 col-sm-12"
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardTamplate
                title={item.title}
                card_content={item.content}
                isList={true}
              />
            </div>
          ))}
      </div>

      <style>{`
        .values-section {
          padding: 4rem 2rem;
        }

        .values-title {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 2rem;
          position: relative;
        }

        .values-title::after {
          content: "";
          display: block;
          width: 60px;
          height: 4px;
          background: #5c5c5c;
          margin: 1rem auto 0;
        }

        .row {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .values-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

// const Cinnosty = () => {
//   const titlesList = [
//     "ПРОФЕСІЙНІСТЬ",
//     "ІННОВАЦІЇ",
//     "РЕПУТАЦІЯ",
//     "КОМАНДА",
//     "БЕЗПЕКА",
//     "ЯКІСТЬ",
//   ];
//   const contentsList = [
//     `Ми експерти своєї справи; Ми будуємо системну роботу; Ми будуємо ефективну комунікацію; Ми застосовуємо індивідуальний підхід до кожного клієнта; Ми безперервно професійно розвиваємося та навчаємося`,
//     `Ми відкриті для нових ідей і технологій; Ми проактивні; Ми створюємо атмосферу, яка стимулює творчий пошук, народження креативних ідей; Ми прагнемо запропонувати те, що не можуть запропонувати інші`,
//     `Це прозорість, чесність і надійність; Це чітке виконання договірних зобов'язань; Це позитивні відгуки клієнтів; Це дотримання законодавства`,
//     `Нас всіх об'єднує єдина мета; Ми націлені на спільний кінцевий результат; Ми згуртовані і підтримуємо один одного в досягненні поставлених завдань`,
//     `Це гарантія запобігання загроз та ризиків для працівників, партнерів і навколишнього середовища; Це комплексний підхід до питань безпеки; Це стовідсоткове резервне забезпечення всіх життєдіяльних систем; Це високотехнологічна інженерія складського комплексу`,
//     `Ми виконуємо роботу згідно існуючої системи якості; Ми контролюємо кожен етап процесу і його відповідність існуючим стандартам якості; Всі процеси відповідають міжнародним стандартам і регламентовані письмовими інструкціями; Впроваджена система аналізу ризиків`,
//   ];

//   return (
//     <section className="values-section">
//       <h1 className="text-center values-title">Наші цінності</h1>

//       <div className="row g-4 justify-content-center pt-4 pb-2">
//         {titlesList.map((element, index) => (
//           <div
//             className="col-lg-4 col-md-6 col-sm-12"
//             key={titlesList[index]}
//             data-aos="fade-up"
//             data-aos-delay={index * 100}
//           >
//             <CardTamplate
//               title={element}
//               card_content={contentsList[index]}
//               isList={true}
//             />
//           </div>
//         ))}
//       </div>

//       <style>{`
//         .values-section {
//           padding: 4rem 2rem;
//         }

//         .values-title {
//           font-family: "Montserrat", sans-serif;
//           font-weight: 700;
//           font-size: 2.5rem;
//           color: #333;
//           margin-bottom: 2rem;
//           position: relative;
//         }

//         .values-title::after {
//           content: "";
//           display: block;
//           width: 60px;
//           height: 4px;
//           background: #5c5c5c;
//           margin: 1rem auto 0;
//         }

//         .row {
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         @media (max-width: 768px) {
//           .values-title {
//             font-size: 2rem;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header fontColor={`#000000`} invert={`invert(0%)`} rep={true} />
      <PagesHeader title={t("aboutPage.aboutUs")} />

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
