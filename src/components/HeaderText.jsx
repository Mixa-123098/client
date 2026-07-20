import React from "react";
import { useTranslation } from "react-i18next";

const HeaderText = ({ count }) => {
  const { t } = useTranslation();

  const titlePage = [
    t("mainPage.projects.loft"),
    t("mainPage.projects.chehova"),
    t("mainPage.projects.karaoke"),
  ];

  const subtitlePage = [
    {
      link: "/projects/6",
    },
    {
      link: "/projects/200",
    },
    {
      link: "/projects/8",
    },
  ];

  return (
    <div className="header-text d-flex">
      <div className="countPage">
        0{count}/<span className="bigger-text">03</span>
      </div>

      <div className="textPage">
        <div className="titlePage">{titlePage[count - 1]}</div>
        <div className="subtitlePage">
          <a
            href={subtitlePage[count - 1].link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            {t("mainPage.goToTheProject")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderText;
