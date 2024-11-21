import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProjectsPage.css";

import Header from "../Header";
import ProjectsPagesNav from "./ProjectsPagesNav";
import PagesHeader from "./PagesHeader";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";

const ProjectsList = ({ focusedPage, itemsPerPage, filteredData }) => {
  const startIndex = (focusedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  //добавить правильный вывод на других страницах
  const renderedData = filteredData
    .slice(startIndex, endIndex)
    .map((element, index) => (
      <div key={index} id={index}>
        <Link
          to={`/projects/${element.id} `}
          className="text-center link-style"
        >
          <img
            src={`/img/main_imges_folder/${element.project_img_src}`}
            alt=""
            className="project_img "
          />

          <h5 className="project_name">{element.project_name}</h5>
          <h6 className="project_address">{element.project_address}</h6>
        </Link>
      </div>
    ));

  return (
    <div className="projects-container">
      <div className="our-projects">{renderedData}</div>
    </div>
  );
};

const Projects = ({ indexFromSecBlock }) => {
  const [dataList, setDataList] = useState([]);
  const index = indexFromSecBlock || 0;
  useEffect(() => {
    fetch("https://server-2gn8.onrender.com/projects")
      .then((response) => response.json())
      .then((data) => setDataList(data))
      .catch((error) => {
        console.error("Ошибка получения данных:", error);
      });
  }, []);
  const { t } = useTranslation();
  const categoriesList = [
    //можно взять категории из бд, но пока так
    t("projectsPage.categories.all"),
    t("projectsPage.categories.publicInteriors"),
    t("projectsPage.categories.apartments"),
    t("projectsPage.categories.privateHouses"),
  ];

  const [focusedIndex, setFocusedIndex] = useState(index);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const setFocused = (index) => {
    setFocusedIndex(index);
    setCurrentPage(1);
  };

  const filteredData =
    focusedIndex === 0
      ? dataList
      : dataList.filter(
          // eslint-disable-next-line
          (element) => element.project_specialization == focusedIndex
        );
  const categories = categoriesList.map((category, index) => {
    return (
      <button
        key={index}
        id={`projects-nav-button-${index}`}
        className={`projects-nav-button`}
        // autoFocus={index === 0}
        onClick={() => setFocused(index)}
      >
        {category}
      </button>
    );
  });

  return (
    <>
      <div className="d-flex justify-content-center">
        <nav className="projects-nav">{categories}</nav>
      </div>

      <ProjectsList
        focusedIndex={focusedIndex}
        focusedPage={currentPage}
        itemsPerPage={itemsPerPage}
        filteredData={filteredData}
        dataList={dataList}
      />
      <ProjectsPagesNav
        setFocusedPage={setCurrentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        currentPage={currentPage}
      />
      <div className="mb-5"></div>
    </>
  );
};

const ProjectsPage = ({ indexFromSecBlock }) => {
  const { t } = useTranslation();
  return (
    <div className="projects">
      <Header fontColor={`#000000`} invert={`invert(0%)`} rep={true} />
      <PagesHeader title={t("projectsPage.ourProjects")} />
      <Projects indexFromSecBlock={indexFromSecBlock} />
      <Footer settings={{ color: `black`, bgColor: `white`, shadow: true }} />
    </div>
  );
};

// export { ProjectsPage };
export default ProjectsPage;
